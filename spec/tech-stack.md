# Tech Stack — Money Management App

Companion to the project document. This covers *what we build with and why*, plus the decisions that are expensive to reverse.

---

## 0. Architectural premise

Two planes, and the boundary between them is the product:

| Plane | Lives where | Contents |
|---|---|---|
| **Identity** | Always on the server | user, credentials, sessions, devices, subscription |
| **Data** | Local by default; server only if the user enables sync | accounts, transactions, categories, budgets, bills, loans, assets, goals, app settings |

The server never sees plaintext financial data. When sync is on, it stores ciphertext it cannot decrypt. Every stack choice below follows from this.

---

## 1. Frontend

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 16.3, App Router** | Known stack. Server components for the marketing/auth shell, client components for the app. |
| Language | **TypeScript, `strict: true`** | Money app. Non-negotiable. |
| Runtime | React 19.2 | Ships with Next 16. |
| Styling | **Tailwind CSS v4** | Logical properties are first-class (`ms-*`, `me-*`, `ps-*`, `pe-*`), which is the whole RTL story. |
| Components | **shadcn/ui (Radix primitives)** | Copy-in, not a dependency. Radix handles `dir` correctly and is accessible by default. |
| Icons | lucide-react | Consistent, tree-shakeable. |
| Charts | **Recharts** | Adequate for donut/bar/line. Revisit only if reports get exotic. |
| Forms | react-hook-form + zod | One zod schema per entity, reused for local validation and API validation. |
| Client state | **Zustand** | Small. No server-cache library needed — the local DB *is* the source of truth. |
| Reactivity | **`dexie-react-hooks` (`useLiveQuery`)** | Components subscribe to IndexedDB queries directly; writes re-render automatically. This replaces React Query entirely for the data plane. |

### Rule: no physical direction properties, ever

`margin-left`, `padding-right`, `left:`, `text-align: left` are banned in app code. Use `ms/me/ps/pe`, `start/end`, `text-start/text-end`. Enforce with an ESLint rule so it fails CI rather than relying on discipline.

---

## 2. Local data layer

| Concern | Choice | Why |
|---|---|---|
| Engine | **IndexedDB via Dexie 4** | Right risk level for v0.1. Handles tens of thousands of transactions fine. Well-documented, stable, good TS types. |
| Not chosen | SQLite-WASM + OPFS | ~1.5MB WASM payload, worse Safari story, and you'd be hand-rolling migrations. Only worth it if reporting queries actually become a bottleneck — measure first. |
| Access pattern | Repository modules per entity | `lib/repo/transactions.ts` etc. **No component touches Dexie directly.** This is what makes a future engine swap survivable. |
| Migrations | Dexie versioned schema + explicit upgrade functions | Client-side migrations are irreversible in the wild. Every one gets a test. |
| Persistence | `navigator.storage.persist()` on first meaningful write | Reduces Safari eviction risk. Not a guarantee. |

### Mandatory record shape

Every data-plane record, from v0.1, regardless of when sync ships:

```ts
type SyncableRecord = {
  id: string;           // UUID v7, generated client-side
  createdAt: number;    // epoch ms, UTC
  updatedAt: number;    // epoch ms, UTC
  deleted: boolean;     // tombstone — never hard-delete
  deviceId: string;     // origin device
  schemaVersion: number;
};
```

Retrofitting this later means migrating databases sitting inside browsers you don't control. Do it now.

### Money representation

**Integer minor units + explicit currency code. Never floats.**

```ts
type Money = { amount: number; currency: string }; // 1234 = 12.34 USD
```

Non-decimal and 3-decimal currencies exist (IRR/JPY have 0, BHD/KWD have 3), so store the exponent per currency rather than assuming 2. A transaction stores `amount` + `currency` (its currency may differ from its account's) and **no exchange rate** — conversion to the account or primary currency is read-time from the rate config. See `docs/adr/0001-read-time-currency-conversion.md`.

---

## 3. Backend (sync server)

| Concern | Choice | Why |
|---|---|---|
| API | **Next.js Route Handlers** | One deployable. No separate service until there's a reason. |
| Validation | zod at every route boundary | Shared schemas with the client. |
| ORM | **Drizzle** | Lighter than Prisma, better SQL transparency, no engine binary. Migrations are plain SQL you can read. |
| Database | **PostgreSQL 17** | Identity + subscription + encrypted blobs. |
| Blob storage | Postgres `bytea` for v0.1–v1.0 | Snapshots are small (a few MB). Move to S3-compatible object storage only when attachments arrive. |
| Cache/rate limit | Redis | Login throttling, session revocation. |
| Email | Resend or Postmark | Reminders and, later, password reset. |

### Why not .NET/ABP here

Your enterprise stack is the right tool for enterprise workflow domains. This server does four things: authenticate, store blobs, serve subscriptions, send email. A second runtime and deployment target buys nothing for that surface. If the team/business tier in v3 ever materializes, that's the moment to reconsider — and by then it'd be a separate service anyway.

---

## 4. Auth

| Concern | Choice |
|---|---|
| Library | **Auth.js v5 (NextAuth)** |
| v0.1 provider | Credentials (email + password, no verification) |
| v1.5 provider | Google OAuth |
| Password hashing | **argon2id** (not bcrypt) |
| Sessions | httpOnly + Secure + SameSite=Lax cookies, database-backed |
| Throttling | Redis-backed, per-IP and per-account |

### Critical: two secrets, not one

| Secret | Purpose | Resettable | Server sees it |
|---|---|---|---|
| Account password | Authenticate to the server | Yes | Hash only |
| Data passphrase | Derives the data encryption key | **No** | Never |

If the account password derived the encryption key, a password reset would silently destroy the user's synced data. Keep them separate. The data passphrase is set only when the user first enables sync, and a recovery key is generated and downloaded at that moment.

Local-only users never encounter any of this.

**Google sign-in unresolved:** OAuth gives no password to anchor a key to. The user will still need to set a data passphrase explicitly when enabling sync. Decide the UX before shipping v1.5, not during.

---

## 5. Encryption

| Concern | Choice |
|---|---|
| API | **WebCrypto** (`crypto.subtle`) — no crypto libraries |
| KDF | Argon2id via WASM, or PBKDF2-SHA256 ≥600k iterations as fallback |
| Cipher | AES-256-GCM |
| Nonce | 96-bit, fresh per encryption, never reused |
| Key handling | Derived in-memory only. Never in IndexedDB, localStorage, or a cookie. |

### Local storage is NOT encrypted — and we must not claim it is

There is no honest way to encrypt browser storage at rest. A key stored alongside the data is decoration; a passphrase prompt on every app open is unusable for a ten-second expense entry.

**Approved copy:** *"Your financial data stays in your browser. We never receive it unless you turn on sync — and when you do, it's encrypted on your device before it leaves."*

**Banned copy:** "encrypted at rest," "zero-knowledge local storage," "military-grade encryption." Overclaiming is the single fastest way to discredit a privacy product.

---

## 6. Sync

**v0.5 ships snapshot sync, not incremental sync.**

1. Serialize the full local data plane to JSON
2. Compress (gzip)
3. Encrypt with the data key
4. `PUT` the blob with a monotonic version number
5. On pull: fetch, decrypt, decompress, replace local

Conflicts are handled by comparing device + version and warning the user, not by merging.

**Why not CRDTs:** per-record merge is the part that took Actual Budget years. For one user on two devices it's enormous cost for marginal benefit. Ship snapshot, learn where it actually hurts, and only then build incremental sync in v2 — with the record shape from §2 already in place to support it.

**Server contract:** the server stores `{ userId, version, deviceId, updatedAt, blob }`. It can never inspect `blob`. It enforces a size cap and a rate limit. That's all.

---

## 7. Internationalization

| Concern | Choice | Why |
|---|---|---|
| Framework | **next-intl** | Best App Router integration. |
| Routing | `/[locale]/...` | `en`, `fa`, `ar` |
| Direction | `dir` on `<html>`, driven by locale | Everything else is CSS logical properties. |
| Calendar | **`@internationalized/date`** (Adobe) | Real Jalali/Hijri calendar support with arithmetic, not just formatting. `date-fns-jalali` handles display but not month-boundary math correctly. |
| Numerals | `Intl.NumberFormat` with `numberingSystem` | User setting (`latn` / `arab` / `arabext`), **independent of language** — many Farsi speakers prefer Western digits. |

### Three independent axes

Language, calendar, and numeral system are **separate user settings**. Do not derive any from the other two. `fa` + Gregorian + Western digits is a real and common configuration.

### Jalali is a data concern, not a formatting concern

Store all dates as UTC epoch ms. But month boundaries drive report periods, budget resets, and bill recurrence — and Jalali months don't align with Gregorian. Period boundary calculation must go through the calendar layer. This is the single most likely source of subtle bugs in the project.

---

## 8. PWA

| Concern | Choice |
|---|---|
| Service worker | **Serwist** (maintained successor to next-pwa) |
| Strategy | App shell precached; no data caching — the local DB already is the offline story |
| Manifest | Standalone display, maskable icons, localized `name`/`short_name` |
| Install prompt | Custom, after first real use — not on landing |
| Push | Web Push (VAPID). Android + installed iOS PWAs only. |

**Notification reality:** iOS Safari only delivers push to home-screen-installed PWAs, unreliably. Email reminders (server-side, requires account) are the dependable path, and the in-app due list is the baseline that always works. Design the reminder feature assuming push is a bonus.

---

## 9. Tooling

| Concern | Choice |
|---|---|
| Package manager | pnpm |
| Lint/format | ESLint 9 flat config + Prettier |
| Unit tests | Vitest |
| Git hooks | husky + lint-staged |
| CI | GitHub Actions |

### Non-negotiable test coverage

Broad coverage isn't the goal. These four areas are, because failures are silent and expensive:

1. **Money arithmetic** — rounding, currency conversion, multi-currency aggregation
2. **Dexie migrations** — every version upgrade, with fixture data
3. **Calendar boundaries** — Jalali/Gregorian/Hijri period math across year boundaries and leap years
4. **Encrypt → sync → decrypt round-trip** — including wrong-passphrase failure


---

## 10. Deployment

| Concern | Choice |
|---|---|
| Target | Self-hosted, subdomain of existing domain |
| Packaging | Docker, multi-stage, Next standalone output |
| Orchestration | K3s (existing cluster) |
| TLS | cert-manager + Let's Encrypt |
| Postgres | Managed by operator or plain StatefulSet with a PVC |
| Backups | Nightly `pg_dump`, encrypted, off-site (Backblaze B2 or Hetzner Storage Box) |
| Monitoring | Uptime check + error tracking (self-hosted GlitchTip, or Sentry free tier) |
| Migrations | Drizzle migrations as a Kubernetes Job, pre-deploy |

**Restores must be tested, not assumed.** A backup you've never restored is a backup you don't have. Schedule one restore drill per quarter.

**Running cost:** €10–35/month (VPS, off-site backup, transactional email), plus your ops time.

---

## 11. Decision log

Choices that are expensive to reverse, recorded so future-you knows they were deliberate:

| # | Decision | Reversible? | Note |
|---|---|---|---|
| 1 | Two-plane split (identity server / data local) | No | This is the product |
| 2 | Sync-ready record shape from v0.1 | No | Retrofit = migrating browsers you don't control |
| 3 | Integer minor units for money | Painful | Float would be a rewrite |
| 4 | Dexie over SQLite-WASM | Yes | Repository layer makes the swap survivable |
| 5 | Snapshot sync before incremental | Yes | Record shape supports the upgrade |
| 6 | Account password ≠ data passphrase | No | Conflating them destroys user data on reset |
| 7 | Local storage not claimed as encrypted | n/a | Honesty constraint |
| 8 | Language / calendar / numerals independent | Painful | Coupling them is a wrong assumption about the market |
| 9 | Next.js API over separate .NET service | Yes | Revisit only for a team tier |

---

## 12. Open items

1. **Argon2id in the browser** — pick and benchmark a WASM build, or accept PBKDF2 with high iterations for v0.5.
2. **Google sign-in ↔ data passphrase** — UX undecided. Blocks v1.5, not v1.0.
3. **Attachment storage** — receipts in IndexedDB will hit size limits. S3-compatible + client-side encryption, decided at v1.5.
4. **Exchange rate source** — which API, what caching, what happens offline. v1.5. Interim: a static table in `src/lib/money/rates.ts` (ADR 0001); a periodic job replaces its contents later.
5. **Subscription provider** — depends on the target market decision, which is still open in the project doc. This is the one that should worry you most, since it determines whether any of this monetizes.