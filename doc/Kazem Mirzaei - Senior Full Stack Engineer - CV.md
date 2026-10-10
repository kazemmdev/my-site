# Kazem Mirzaei

Senior Full Stack Developer · SaaS & Multi-tenant Platforms · Laravel, Next.js, .NET

Turkey · Open to remote (UTC+3)

[kazemm.dev](https://kazemm.dev) · [kazemmdev@gmail.com](mailto:kazemmdev@gmail.com) · [linkedin.com/in/kazem-mirzaei](https://www.linkedin.com/in/kazem-mirzaei) · [github.com/kazemmdev](https://github.com/kazemmdev)

Senior full stack engineer with 8+ years of experience taking products from requirements to production, covering system design, backend services, frontend, infrastructure, and deployment. Co-founder of GradeUp, a multi-tenant education platform for tutors and course creators, and engineering lead on consumer platforms built to handle traffic spikes from influencer campaigns. Works primarily with Laravel, Next.js, TypeScript, and Go, and currently builds enterprise workflow automation on .NET for an automotive manufacturer. Approaches each project from the business problem and its constraints, and favors designs the team can maintain as the product grows.

## Experience

### Senior Full Stack Developer

(5 months)Jun 2026 - Present

Confidential · Automotive manufacturer · Enterprise workflow automation platform

Full-time · Remote

- Building an internal business process automation platform on .NET, ABP Framework, and Elsa Workflows.
- Designed role-based approval flows with escalation timers, a shared task inbox, and append-only audit records for every decision.
- Built the user dashboard in Next.js on a separate read model with Redis caching, so list pages stay fast as approvals pile up.
- Wrote the team's engineering guidelines for .NET 10.

**Tech stack:** C#, .NET, ABP Framework, Elsa Workflows, EF Core, SQL Server, Redis, Hangfire, Next.js, React, K3s

### Co-Founder & Lead Full Stack Engineer

(1 year 11 months)Dec 2024 - Present

GradeUp · Multi-tenant SaaS for tutors and course creators

Co-founded · Remote

- Built a multi-tenant SaaS from scratch where each tutor subscribes and gets a branded site, subdomain, and isolated database.
- Automated tenant and server provisioning with GitHub Actions and K3s, cutting setup time to under 10 minutes.
- Designed the Laravel API as stateless services so pods scale out during a tutor's launch campaign and back in afterwards.
- Moved FFmpeg video transcoding to dedicated nodes, keeping encoding load off the servers that handle student traffic.
- Split background jobs into priority queues so payments and notifications are never stuck behind long transcoding runs.
- Improved page speed and SEO on tenant sites with server-side rendering, image optimization, and per-tenant metadata and sitemaps.
- Set up Grafana dashboards and centralized logs to catch slow queries and failing jobs before tutors report them.
- Led the development team and worked with DevOps on release planning and the scaling strategy.

**Tech stack:** PHP, Laravel, Next.js, React, TypeScript, MySQL, Redis, Docker, K3s, GitHub Actions, FFmpeg, Grafana

### Frontend Developer

(3 months)Jan 2026 - Mar 2026

TobiBot · Bot service platform

Contract · Remote (Turkey)

- Built a Next.js web app for a bot service, including subscription flows and account dashboards.
- Delivered a partner panel where cooperators create campaigns and watch user activity in real time.
- Added admin activity logs, working directly with the product owner and design team.

**Tech stack:** Next.js, React, TypeScript

### Frontend Developer

(2 months)Nov 2025 - Dec 2025

Beleb Software

Contract via Upwork · Remote (Philippines)

- Fixed performance and rendering problems in React components of a live production app.
- Shipped enhancements requested by the design team and connected them to the existing Laravel API.

**Tech stack:** React, TypeScript, Laravel

### Full Stack Developer, Mobile & AI

(4 months)Sep 2025 - Dec 2025

Tidalflow · AI health companion app for nutrition tracking and meal planning

Contract · Remote (Amsterdam, Netherlands)

- Worked across the Expo app and the Node.js API of an AI health companion live on the App Store, merging 110+ pull requests in a distributed team.
- Rebuilt the in-app chat with the AI coach on Supabase Realtime, with infinite scroll, image and meal-log messages, and markdown replies.
- Built photo-based meal logging that turns a meal photo into macros on the daily nutrition tracker, plus weight tracking with charts.
- Built AI-generated meal plans and custom meals with LLM prompts and structured output schemas on Orq.ai, a nightly generation job, and debounced Realtime listeners that regenerate plans when users change their answers.
- Restructured the Express API into feature modules with file-based routing, Zod-validated endpoints, Swagger docs, and Vitest and Supertest tests.
- Added community threads with replies, likes, and filters, an in-app notification system, and daily check-ins with streaks and timezone-aware stats.
- Added Google and Apple sign-in through Supabase Auth, linking existing accounts to their new identities, and wrote Supabase migrations and row-level security policies.

**Tech stack:** React Native, Expo, TypeScript, Zustand, TanStack Query, Node.js, Express, Prisma, PostgreSQL, Supabase, Zod, Orq.ai, Vitest, Sentry, PostHog

### Freelance Full Stack Developer

(2 years 3 months)Apr 2023 - Jun 2025

Upwork · Short-term projects for international clients

Freelance · Remote

- Completed 10+ full stack projects for international clients with a 100% Job Success Score.
- Rebuilt a yoga education platform for an influencer, migrating years of legacy student and course data into a new data model.
- Delivered its courses, payments, and a transcoding pipeline that prevents direct downloads of paid video.
- Added real-time notifications with WebSockets and Laravel Echo, with media uploads stored in S3.
- Reused the stateless deployment setup from earlier projects so the platform scaled out during campaign launches.

**Tech stack:** PHP, Laravel, Node.js, React, Next.js, WebSocket, Laravel Echo, S3, Docker, Kubernetes

### Lead Full Stack Developer

(2 years 5 months)Dec 2022 - Apr 2025

Hunter · Health and fasting education platform with courses, blog, and community

Contract · Remote (Iran)

- Led the build of a real-time health platform from scratch with Laravel, Go, and Next.js.
- Broke the original Laravel monolith into services, starting with the video transcoder, which was the heaviest workload.
- Rewrote the mission-scheduling algorithm as a Go service, with Go workers and queues running each user's mission lifecycle.
- Reduced the production Docker image from about 1 GB to under 400 MB with multi-stage builds, which made deploys and pod scale-out faster.
- Made the app servers stateless (sessions and cache in Redis, files in S3) so K3s could add pods during influencer campaign bursts.
- Tuned background jobs by separating queues by priority, batching notification sends, and adding retries with backoff for failed jobs.
- Built secure video streaming with multi-format encoding and blocked direct MP4 downloads to protect paid content.
- Improved the Next.js frontend's load time and SEO for the blog and course pages with server rendering, image optimization, and code splitting.
- Launched a smoking-cessation app on a trained AI model, with its own subscription plan alongside the core product.
- Shipped a community feed for progress photos with real-time notifications over WebSockets and Laravel Echo.
- Automated build and deploy to K3s with GitHub Actions.

**Tech stack:** PHP, Laravel, Go, Next.js, React, Redis, WebSocket, Laravel Echo, S3, Docker, K3s, GitHub Actions

### Full Stack Developer

(1 year 8 months)Apr 2023 - Nov 2024

Lazo · Social platform with in-app chat, missions, and payments

Contract via Upwork · Remote (France)

- Cut page load time from about 8 seconds to under 1 second by refactoring the Next.js app.
- Audited the codebase, removed unused packages, and fixed dependency conflicts, which shortened build times.
- Repaired the Customer.io and PubNub chat integrations, then reduced the product's dependence on expensive third-party services.
- Reworked Stripe payments to support subscriptions and B2B payouts to service providers, with checks for billing edge cases.
- Localized the product into French, English, and Brazilian and European Portuguese, with currency picked by the visitor's location.
- Built an admin dashboard for mission states and user activity, with local pricing for each market.

**Tech stack:** Next.js, React, TypeScript, next-intl, Stripe, Customer.io, PubNub

### Full Stack Developer

(6 months)May 2022 - Oct 2022

Torotazeh · Location-based fresh produce marketplace

Contract · Remote (Iran)

- Built a location-aware marketplace from scratch that connects buyers with nearby producers and books same-day couriers.
- Owned the Laravel backend, Nuxt.js frontend, payments, and the separate admin and producer dashboards.
- Wrote backend logic test-first and set up CI/CD with Docker Compose deployments.
- Added PWA push notifications for order status and built the responsive UI with the design lead.

**Tech stack:** PHP, Laravel, Nuxt.js, Vue.js, Docker Compose, PWA

### Frontend Developer

(3 months)Jul 2022 - Sep 2022

eVergabe.de GmbH · Health-focused platform

Freelance · Remote (Germany)

- Built reusable React and Material UI components with responsive, accessible layouts.
- Fixed a slow initial load by removing unnecessary re-renders in a deeply nested list component.

**Tech stack:** React, Material UI, JavaScript

### Co-Founder & Full Stack Developer

(1 year 5 months)Nov 2019 - Mar 2021

Percept · Social content platform for Iranian creators and bloggers

Co-founded · Tehran

- Co-founded a creator platform that paid writers by views and interactions through a built-in wallet.
- Built a Persian WYSIWYG editor on CKEditor with full right-to-left support.
- Added analytics dashboards, SEO, and image optimization to the Laravel backend.
- Ran the servers and deployments on Hetzner with Docker Compose.

**Tech stack:** PHP, Laravel, Nuxt.js, MySQL, Docker Compose, CKEditor

### Backend Developer

(1 year 2 months)Oct 2017 - Nov 2018

Faraz Ati Afarin

Full-time · Tehran

- Developed backend features in PHP and Laravel for production web applications.
- Added Redis caching for frequently read data to speed up responses.

**Tech stack:** PHP, Laravel, Redis, MySQL

### Frontend Developer, PHP Developer & UI/UX Designer

(1 year 10 months)Jul 2014 - Apr 2016

Hogon Group, Behintek, Martal

Part-time and full-time · Tehran

- Designed the UI, logo, and branding for a stock market news app at Martal.
- Built PHP features at Behintek and responsive pages in HTML, CSS, and JavaScript at Hogon Group.
- Built WordPress sites for clients while at university.

## Skills

Languages: PHP, JavaScript, TypeScript, Go, C#

Backend: Laravel, Laravel Echo, Node.js, Express, Prisma, Zod, .NET, ABP Framework, EF Core, REST APIs, Swagger

Frontend: React, Next.js, Vue.js, Nuxt.js, Material UI, next-intl, responsive design, accessibility, SEO

Mobile: React Native, Expo, Zustand, TanStack Query, App Store release

Architecture: Multi-tenant SaaS, monolith-to-microservices migration, stateless services, DDD, queues and background jobs, caching, horizontal and vertical scaling

Workflow automation: Elsa Workflows, Hangfire, approval flows, audit trails

Databases & storage: MySQL, PostgreSQL, SQL Server, Supabase, Redis, S3 object storage

DevOps: Docker (multi-stage builds), Docker Compose, Kubernetes (K3s), GitHub Actions, CI/CD, Grafana, Sentry, Hetzner

Payments & integrations: Stripe Connect, subscriptions, B2B payouts, Customer.io, PubNub, WebSockets

Media & performance: FFmpeg, secure video streaming, PWAs, Lighthouse optimization

AI: LLM integration, prompt engineering, structured outputs, Orq.ai, RAG

Practices: TDD, SOLID, Vitest, code audits, technical documentation

Collaboration: Team leadership, Agile, cross-functional collaboration, UI/UX design

## Writing & Knowledge Sharing

- Published a LinkedIn article explaining Retrieval-Augmented Generation (RAG) in plain language.
- Wrote a Farsi technical series comparing the .NET and Go runtimes for fellow developers.

## Education

### M.Sc. in Systems Engineering

2015 – 2018 - University of Tehran

## Languages

Persian (native) · English (professional working proficiency)