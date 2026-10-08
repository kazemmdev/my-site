## 1. Mandatory startup protocol

Before changing code for a new task:

1. Read `.claude/INDEX.md`.
2. Read `.claude/archive/overview.md`.
3. Read `.claude/current/state.md`.
4. Classify the task: small change, feature, or architectural change.
5. Identify the owning subsystem and read only the relevant archive documents and ADRs.
6. Verify the documented model against the relevant code. Do not blindly trust stale documentation.
7. Only then inspect deeper source files and plan the change.

Do not reconstruct the whole repository when the knowledge layer already answers the question.
Do not preload unrelated documentation or source code.
Use progressive disclosure: start broad, then retrieve only what is relevant.

## 2. External project memory rules

### Archive

`.claude/archive/` contains stable, verified project knowledge:

- architecture
- major domains
- important data flows
- stable conventions
- security boundaries
- integrations
- reusable patterns

Archive content should be compact and high-signal. It is not a source dump, file inventory, or changelog.

### Current

`.claude/current/` contains the latest operational state:

- active work
- current implementation status
- known issues
- temporary constraints
- recently verified state

Current state is disposable. It must be refreshed as work changes.

### Promotion rule

Do not copy every change into the archive.

Promote information from `current` to `archive` only when it is:

- stable
- reusable
- architecturally meaningful
- a constraint future work must follow

Architectural decisions belong in `docs/adr/` when the project already uses ADRs.

## 3. Code is authoritative

Treat documentation as a compact model, not as unquestionable truth.

If documentation conflicts with code:

1. Notice the discrepancy.
2. Verify the relevant behavior.
3. Resolve the discrepancy before making a dependent change when practical.
4. Update the appropriate `current` document.
5. Update `archive` only if the stable project model changed.

Never silently build on a known stale architectural assumption.

## 4. Think before coding

Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

- State important assumptions explicitly.
- If multiple interpretations exist, present them instead of silently picking one.
- If a simpler approach exists, say so.
- Push back when the requested approach is unnecessarily complex or risky.
- If something materially affects architecture, security, data ownership, or public contracts and remains unclear, stop and ask.

For straightforward tasks, keep this reasoning brief. Do not generate ceremony for its own sake.

## 5. Simplicity first

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was requested.
- No abstractions for single-use code.
- No speculative flexibility or configurability.
- No unnecessary error handling for impossible scenarios.
- No framework or dependency changes without a reason.
- Prefer an existing project pattern over introducing another pattern.

Ask:

> Would a senior engineer say this is overcomplicated?

If yes, simplify it.

## 6. Surgical changes

Touch only what you must. Clean up only your own mess.

When editing existing code:

- Do not improve adjacent code just because it could be better.
- Do not refactor unrelated code.
- Do not rename unrelated symbols.
- Do not reformat unrelated files.
- Match the existing style.
- If you notice unrelated dead code, mention it; do not delete it unless asked.

If your change creates an orphan, remove only the import, variable, function, or code that your own change made unused.

Test:

> Every changed line should trace directly to the user's request or to a necessary consequence of that request.

## 7. Goal-driven execution

Turn the request into verifiable success criteria.

Examples:

- "Add validation" → write tests for invalid inputs, then make them pass.
- "Fix the bug" → reproduce the bug with a test, then make it pass.
- "Refactor X" → verify the existing tests pass before and after the refactor.

For multi-step tasks, use a brief plan:

```text
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria allow the agent to iterate independently.

## 8. Existing pattern first

Before creating a new implementation, find the closest existing example.

Look for:

- similar endpoint or command
- similar service/use case
- similar repository/data access
- similar UI component
- similar migration
- similar test
- similar integration

Reuse the project's established structure unless there is a documented reason not to.

## 9. Architectural boundaries

Preserve existing:

- module boundaries
- dependency direction
- data ownership boundaries
- security boundaries
- API contracts
- infrastructure boundaries

Do not silently create a new architectural pattern.

If the task requires crossing a boundary, determine whether the project already has an established pattern. If not, treat it as an architectural decision and use the ADR process.

## 10. Security and data ownership

Security boundaries take priority over convenience.

Explicitly check, when relevant:

- authentication
- authorization
- tenant/resource ownership
- input validation
- secrets
- sensitive data exposure
- logging
- file access
- database access

For tenant-aware systems, tenant scope must be enforced at the data boundary, not only at the HTTP edge.

A valid resource ID does not imply that the caller is authorized to access the resource.

## 11. API and database changes

Before changing an API or database contract, inspect consumers and existing conventions.

For APIs, check:

- request and response shape
- error contract
- authentication
- authorization
- validation
- backward compatibility

For databases, check:

- current schema
- migration conventions
- data ownership
- compatibility
- rollback expectations
- affected queries and consumers

Do not bypass the repository's established migration or contract process.

## 12. Testing

Tests should verify behavior and important boundaries.

For feature work, consider:

- happy path
- validation failure
- authorization failure
- not found
- security/boundary cases
- important error conditions

For tenant-scoped functionality, explicitly test cross-tenant isolation where applicable.

## 13. Verification

Code is not done when it compiles.

Run the project's relevant verification commands:

- tests
- static analysis
- lint
- type checking
- build
- migration checks
- architecture/dependency checks

Always answer both:

1. Does the change work?
2. Does the change still belong in this architecture?

## 14. Stop conditions

Stop and ask for direction when:

- the architectural owner of the change is unclear
- two incompatible patterns are equally valid
- a breaking change appears necessary
- a security boundary is ambiguous
- data ownership is ambiguous
- a new cross-system dependency is required
- an existing ADR conflicts with the requested implementation
- a shared abstraction requires a major redesign

When asking, provide the smallest useful decision summary: options, trade-offs, and a recommendation.

## 15. Documentation update protocol

After implementation and verification:

1. Update `.claude/current/state.md` if the active project state changed.
2. Update `.claude/current/active-work.md` if active work changed.
3. Record known issues when they remain relevant.
4. Promote stable knowledge to `.claude/archive/` only when it is durable and future-facing.
5. Create or update an ADR when a significant architectural decision was made.

Never claim a task is complete while leaving the current-state documentation knowingly misleading.

## 16. Final definition of done

Before finishing:

- Requirement implemented.
- Existing architecture respected.
- Existing patterns reused where appropriate.
- Tests added or updated when behavior changed.
- Relevant verification passed.
- Security and data boundaries checked.
- API/database contracts checked when relevant.
- Current project state updated.
- Stable knowledge promoted when appropriate.
- ADR updated or created when required.
- No unrelated refactoring introduced.

## 17. Final rule

Prefer:

- existing pattern over new pattern
- explicit constraint over hidden assumption
- small consistent change over clever refactor
- verified behavior over confidence
- documented decision over silent architectural change

The goal is not merely to produce code quickly. The goal is to produce code that still looks like it belongs in the same system months from now.
