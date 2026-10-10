// Resume (one page) and full CV content. Rendered as HTML at /resume and /cv,
// and as PDF at /resume.pdf and /cv.pdf — edit here and both stay in sync.

export type ResumeRole = {
  title: string
  company: string
  companyNote?: string
  /** "YYYY-MM" */
  start: string
  /** "YYYY-MM"; omitted means "Present" */
  end?: string
  employment?: string
  bullets: string[]
  stack?: string[]
}

export type ResumeDocument = {
  kind: "resume" | "cv"
  title: string
  fileName: string
  summary: string
  showDuration: boolean
  experience: ResumeRole[]
  skills: { label: string; items: string }[]
  writing?: string[]
  education: { degree: string; detail: string }[]
  languages?: string
}

export const RESUME_PROFILE = {
  name: "Kazem Mirzaei",
  headline: "Senior Full Stack Developer · SaaS & Multi-tenant Platforms · Laravel, Next.js, .NET",
  location: "Turkey · Open to remote (UTC+3)",
  links: [
    { label: "kazemm.dev", href: "https://kazemm.dev" },
    { label: "kazemmdev@gmail.com", href: "mailto:kazemmdev@gmail.com" },
    { label: "linkedin.com/in/kazem-mirzaei", href: "https://www.linkedin.com/in/kazem-mirzaei" },
    { label: "github.com/kazemmdev", href: "https://github.com/kazemmdev" }
  ]
}

const EDUCATION = [
  { degree: "M.Sc. in Systems Engineering", detail: "University of Tehran · 2015 – 2018" }
]

export const RESUME: ResumeDocument = {
  kind: "resume",
  title: "Resume",
  fileName: "Kazem Mirzaei - Resume.pdf",
  summary:
    "Senior full stack engineer with 8+ years of experience taking SaaS products from requirements to production, covering system design, backend services, frontend, and infrastructure. Co-founder of GradeUp, a multi-tenant education platform, and engineering lead on consumer platforms built to handle traffic spikes from influencer campaigns.",
  showDuration: false,
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "Confidential",
      start: "2026-06",
      bullets: [
        "Building an enterprise workflow automation platform for an automotive manufacturer on .NET, ABP Framework, and Elsa Workflows.",
        "Designed role-based approval flows with escalation timers, a shared task inbox, and append-only audit records."
      ]
    },
    {
      title: "Co-Founder & Lead Full Stack Engineer",
      company: "GradeUp",
      start: "2024-12",
      bullets: [
        "Built a multi-tenant SaaS where each tutor gets a branded site, subdomain, and isolated database, provisioned in under 10 minutes.",
        "Designed the Laravel API as stateless services so pods scale out during tutor launch campaigns and back in afterwards.",
        "Moved FFmpeg transcoding to dedicated nodes and split jobs into priority queues so payments never wait behind video."
      ]
    },
    {
      title: "Frontend Developer",
      company: "TobiBot, Beleb Software",
      start: "2025-11",
      end: "2026-03",
      bullets: [
        "Built a Next.js app with subscriptions and a real-time partner panel at TobiBot; fixed React rendering issues at Beleb."
      ]
    },
    {
      title: "Full Stack Developer, Mobile & AI",
      company: "Tidalflow",
      start: "2025-09",
      end: "2025-12",
      bullets: [
        "Built photo meal logging, AI meal plans, and real-time chat in React Native, with a Node.js, Prisma, and Supabase API."
      ]
    },
    {
      title: "Freelance Full Stack Developer",
      company: "Upwork",
      start: "2023-04",
      end: "2025-06",
      bullets: [
        "Completed 10+ full stack projects for international clients with a 100% Job Success Score.",
        "Rebuilt an influencer's yoga platform, migrating legacy student and course data and adding protected video streaming."
      ]
    },
    {
      title: "Lead Full Stack Developer",
      company: "Hunter",
      start: "2022-12",
      end: "2025-04",
      bullets: [
        "Broke the Laravel monolith into services, starting with the video transcoder, and rewrote mission scheduling as a Go service.",
        "Reduced the Docker image from about 1 GB to under 400 MB with multi-stage builds, speeding up deploys and scale-out.",
        "Made app servers stateless (Redis, S3) so K3s could add pods during influencer campaign bursts.",
        "Tuned background jobs with priority queues, batched notifications, and retries with backoff.",
        "Improved Next.js load time and SEO for blog and course pages with server rendering and image optimization."
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Lazo (via Upwork)",
      start: "2023-04",
      end: "2024-11",
      bullets: [
        "Cut page load time from about 8 seconds to under 1 second by refactoring the Next.js app.",
        "Reworked Stripe payments for subscriptions and B2B payouts, and localized the product into four languages."
      ]
    },
    {
      title: "Full Stack & Frontend Developer",
      company: "Torotazeh, eVergabe.de",
      start: "2022-05",
      end: "2022-10",
      bullets: [
        "Built a location-based produce marketplace in Laravel and Nuxt.js with TDD and CI/CD; fixed a slow React list load in Germany."
      ]
    },
    {
      title: "Co-Founder & Full Stack Developer",
      company: "Percept",
      start: "2019-11",
      end: "2021-03",
      bullets: [
        "Co-founded a creator platform that paid writers by views, with a custom Persian RTL editor and Docker deployments on Hetzner."
      ]
    },
    {
      title: "Backend Developer",
      company: "Faraz Ati Afarin",
      start: "2017-10",
      end: "2018-11",
      bullets: [
        "Developed Laravel backend features and added Redis caching for frequently read data."
      ]
    }
  ],
  skills: [
    { label: "Languages", items: "PHP, TypeScript, JavaScript, Go, C#" },
    {
      label: "Frameworks",
      items:
        "Laravel, Next.js, React, Nuxt.js, Node.js, Express, React Native, Expo, .NET, ABP Framework, Elsa Workflows"
    },
    {
      label: "Architecture",
      items:
        "Multi-tenant SaaS, microservices, stateless services, DDD, queues and background jobs, caching"
    },
    { label: "Data", items: "MySQL, PostgreSQL, SQL Server, Supabase, Redis, S3" },
    { label: "DevOps", items: "Docker, Kubernetes (K3s), GitHub Actions, CI/CD, Grafana" },
    {
      label: "Integrations",
      items:
        "Stripe Connect, WebSockets, PubNub, Customer.io, FFmpeg video streaming, LLM prompt engineering"
    }
  ],
  education: EDUCATION
}

export const CV: ResumeDocument = {
  kind: "cv",
  title: "Curriculum Vitae",
  fileName: "Kazem Mirzaei - Senior Full Stack Engineer - CV.pdf",
  summary:
    "Senior full stack engineer with 8+ years of experience taking products from requirements to production, covering system design, backend services, frontend, infrastructure, and deployment. Co-founder of GradeUp, a multi-tenant education platform for tutors and course creators, and engineering lead on consumer platforms built to handle traffic spikes from influencer campaigns. Works primarily with Laravel, Next.js, TypeScript, and Go, and currently builds enterprise workflow automation on .NET for an automotive manufacturer. Approaches each project from the business problem and its constraints, and favors designs the team can maintain as the product grows.",
  showDuration: true,
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "Confidential",
      companyNote: "Automotive manufacturer · Enterprise workflow automation platform",
      start: "2026-06",
      employment: "Full-time · Remote",
      bullets: [
        "Building an internal business process automation platform on .NET, ABP Framework, and Elsa Workflows.",
        "Designed role-based approval flows with escalation timers, a shared task inbox, and append-only audit records for every decision.",
        "Built the user dashboard in Next.js on a separate read model with Redis caching, so list pages stay fast as approvals pile up.",
        "Wrote the team's engineering guidelines for .NET 10."
      ],
      stack: [
        "C#",
        ".NET",
        "ABP Framework",
        "Elsa Workflows",
        "EF Core",
        "SQL Server",
        "Redis",
        "Hangfire",
        "Next.js",
        "React",
        "K3s"
      ]
    },
    {
      title: "Co-Founder & Lead Full Stack Engineer",
      company: "GradeUp",
      companyNote: "Multi-tenant SaaS for tutors and course creators",
      start: "2024-12",
      employment: "Co-founded · Remote",
      bullets: [
        "Built a multi-tenant SaaS from scratch where each tutor subscribes and gets a branded site, subdomain, and isolated database.",
        "Automated tenant and server provisioning with GitHub Actions and K3s, cutting setup time to under 10 minutes.",
        "Designed the Laravel API as stateless services so pods scale out during a tutor's launch campaign and back in afterwards.",
        "Moved FFmpeg video transcoding to dedicated nodes, keeping encoding load off the servers that handle student traffic.",
        "Split background jobs into priority queues so payments and notifications are never stuck behind long transcoding runs.",
        "Improved page speed and SEO on tenant sites with server-side rendering, image optimization, and per-tenant metadata and sitemaps.",
        "Set up Grafana dashboards and centralized logs to catch slow queries and failing jobs before tutors report them.",
        "Led the development team and worked with DevOps on release planning and the scaling strategy."
      ],
      stack: [
        "PHP",
        "Laravel",
        "Next.js",
        "React",
        "TypeScript",
        "MySQL",
        "Redis",
        "Docker",
        "K3s",
        "GitHub Actions",
        "FFmpeg",
        "Grafana"
      ]
    },
    {
      title: "Frontend Developer",
      company: "TobiBot",
      companyNote: "Bot service platform",
      start: "2026-01",
      end: "2026-03",
      employment: "Contract · Remote (Turkey)",
      bullets: [
        "Built a Next.js web app for a bot service, including subscription flows and account dashboards.",
        "Delivered a partner panel where cooperators create campaigns and watch user activity in real time.",
        "Added admin activity logs, working directly with the product owner and design team."
      ],
      stack: ["Next.js", "React", "TypeScript"]
    },
    {
      title: "Frontend Developer",
      company: "Beleb Software",
      start: "2025-11",
      end: "2025-12",
      employment: "Contract via Upwork · Remote (Philippines)",
      bullets: [
        "Fixed performance and rendering problems in React components of a live production app.",
        "Shipped enhancements requested by the design team and connected them to the existing Laravel API."
      ],
      stack: ["React", "TypeScript", "Laravel"]
    },
    {
      title: "Full Stack Developer, Mobile & AI",
      company: "Tidalflow",
      companyNote: "AI health companion app for nutrition tracking and meal planning",
      start: "2025-07",
      end: "2025-12",
      employment: "Contract · Remote (Amsterdam, Netherlands)",
      bullets: [
        "Worked across the Expo app and the Node.js API of an AI health companion live on the App Store, merging 110+ pull requests in a distributed team.",
        "Rebuilt the in-app chat with the AI coach on Supabase Realtime, with infinite scroll, image and meal-log messages, and markdown replies.",
        "Built photo-based meal logging that turns a meal photo into macros on the daily nutrition tracker, plus weight tracking with charts.",
        "Built AI-generated meal plans and custom meals with LLM prompts and structured output schemas on Orq.ai, a nightly generation job, and debounced Realtime listeners that regenerate plans when users change their answers.",
        "Restructured the Express API into feature modules with file-based routing, Zod-validated endpoints, Swagger docs, and Vitest and Supertest tests.",
        "Added community threads with replies, likes, and filters, an in-app notification system, and daily check-ins with streaks and timezone-aware stats.",
        "Added Google and Apple sign-in through Supabase Auth, linking existing accounts to their new identities, and wrote Supabase migrations and row-level security policies."
      ],
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "Zustand",
        "TanStack Query",
        "Node.js",
        "Express",
        "Prisma",
        "PostgreSQL",
        "Supabase",
        "Zod",
        "Orq.ai",
        "Vitest",
        "Sentry",
        "PostHog"
      ]
    },
    {
      title: "Freelance Full Stack Developer",
      company: "Upwork",
      companyNote: "Short-term projects for international clients",
      start: "2023-04",
      end: "2025-06",
      employment: "Freelance · Remote",
      bullets: [
        "Completed 10+ full stack projects for international clients with a 100% Job Success Score.",
        "Rebuilt a yoga education platform for an influencer, migrating years of legacy student and course data into a new data model.",
        "Delivered its courses, payments, and a transcoding pipeline that prevents direct downloads of paid video.",
        "Added real-time notifications with WebSockets and Laravel Echo, with media uploads stored in S3.",
        "Reused the stateless deployment setup from earlier projects so the platform scaled out during campaign launches."
      ],
      stack: [
        "PHP",
        "Laravel",
        "Node.js",
        "React",
        "Next.js",
        "WebSocket",
        "Laravel Echo",
        "S3",
        "Docker",
        "Kubernetes"
      ]
    },
    {
      title: "Lead Full Stack Developer",
      company: "Hunter",
      companyNote: "Health and fasting education platform with courses, blog, and community",
      start: "2022-12",
      end: "2025-04",
      employment: "Contract · Remote (Iran)",
      bullets: [
        "Led the build of a real-time health platform from scratch with Laravel, Go, and Next.js.",
        "Broke the original Laravel monolith into services, starting with the video transcoder, which was the heaviest workload.",
        "Rewrote the mission-scheduling algorithm as a Go service, with Go workers and queues running each user's mission lifecycle.",
        "Reduced the production Docker image from about 1 GB to under 400 MB with multi-stage builds, which made deploys and pod scale-out faster.",
        "Made the app servers stateless (sessions and cache in Redis, files in S3) so K3s could add pods during influencer campaign bursts.",
        "Tuned background jobs by separating queues by priority, batching notification sends, and adding retries with backoff for failed jobs.",
        "Built secure video streaming with multi-format encoding and blocked direct MP4 downloads to protect paid content.",
        "Improved the Next.js frontend's load time and SEO for the blog and course pages with server rendering, image optimization, and code splitting.",
        "Launched a smoking-cessation app on a trained AI model, with its own subscription plan alongside the core product.",
        "Shipped a community feed for progress photos with real-time notifications over WebSockets and Laravel Echo.",
        "Automated build and deploy to K3s with GitHub Actions."
      ],
      stack: [
        "PHP",
        "Laravel",
        "Go",
        "Next.js",
        "React",
        "Redis",
        "WebSocket",
        "Laravel Echo",
        "S3",
        "Docker",
        "K3s",
        "GitHub Actions"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Lazo",
      companyNote: "Social platform with in-app chat, missions, and payments",
      start: "2023-04",
      end: "2024-11",
      employment: "Contract via Upwork · Remote (France)",
      bullets: [
        "Cut page load time from about 8 seconds to under 1 second by refactoring the Next.js app.",
        "Audited the codebase, removed unused packages, and fixed dependency conflicts, which shortened build times.",
        "Repaired the Customer.io and PubNub chat integrations, then reduced the product's dependence on expensive third-party services.",
        "Reworked Stripe payments to support subscriptions and B2B payouts to service providers, with checks for billing edge cases.",
        "Localized the product into French, English, and Brazilian and European Portuguese, with currency picked by the visitor's location.",
        "Built an admin dashboard for mission states and user activity, with local pricing for each market."
      ],
      stack: ["Next.js", "React", "TypeScript", "next-intl", "Stripe", "Customer.io", "PubNub"]
    },
    {
      title: "Full Stack Developer",
      company: "Torotazeh",
      companyNote: "Location-based fresh produce marketplace",
      start: "2022-05",
      end: "2022-10",
      employment: "Contract · Remote (Iran)",
      bullets: [
        "Built a location-aware marketplace from scratch that connects buyers with nearby producers and books same-day couriers.",
        "Owned the Laravel backend, Nuxt.js frontend, payments, and the separate admin and producer dashboards.",
        "Wrote backend logic test-first and set up CI/CD with Docker Compose deployments.",
        "Added PWA push notifications for order status and built the responsive UI with the design lead."
      ],
      stack: ["PHP", "Laravel", "Nuxt.js", "Vue.js", "Docker Compose", "PWA"]
    },
    {
      title: "Frontend Developer",
      company: "eVergabe.de GmbH",
      companyNote: "Health-focused platform",
      start: "2022-07",
      end: "2022-09",
      employment: "Freelance · Remote (Germany)",
      bullets: [
        "Built reusable React and Material UI components with responsive, accessible layouts.",
        "Fixed a slow initial load by removing unnecessary re-renders in a deeply nested list component."
      ],
      stack: ["React", "Material UI", "JavaScript"]
    },
    {
      title: "Co-Founder & Full Stack Developer",
      company: "Percept",
      companyNote: "Social content platform for Iranian creators and bloggers",
      start: "2019-11",
      end: "2021-03",
      employment: "Co-founded · Tehran",
      bullets: [
        "Co-founded a creator platform that paid writers by views and interactions through a built-in wallet.",
        "Built a Persian WYSIWYG editor on CKEditor with full right-to-left support.",
        "Added analytics dashboards, SEO, and image optimization to the Laravel backend.",
        "Ran the servers and deployments on Hetzner with Docker Compose."
      ],
      stack: ["PHP", "Laravel", "Nuxt.js", "MySQL", "Docker Compose", "CKEditor"]
    },
    {
      title: "Backend Developer",
      company: "Faraz Ati Afarin",
      start: "2017-10",
      end: "2018-11",
      employment: "Full-time · Tehran",
      bullets: [
        "Developed backend features in PHP and Laravel for production web applications.",
        "Added Redis caching for frequently read data to speed up responses."
      ],
      stack: ["PHP", "Laravel", "Redis", "MySQL"]
    },
    {
      title: "Frontend Developer, PHP Developer & UI/UX Designer",
      company: "Hogon Group, Behintek, Martal",
      start: "2014-07",
      end: "2016-04",
      employment: "Part-time and full-time · Tehran",
      bullets: [
        "Designed the UI, logo, and branding for a stock market news app at Martal.",
        "Built PHP features at Behintek and responsive pages in HTML, CSS, and JavaScript at Hogon Group.",
        "Built WordPress sites for clients while at university."
      ]
    }
  ],
  skills: [
    { label: "Languages", items: "PHP, JavaScript, TypeScript, Go, C#" },
    {
      label: "Backend",
      items:
        "Laravel, Laravel Echo, Node.js, Express, Prisma, Zod, .NET, ABP Framework, EF Core, REST APIs, Swagger"
    },
    {
      label: "Frontend",
      items:
        "React, Next.js, Vue.js, Nuxt.js, Material UI, next-intl, responsive design, accessibility, SEO"
    },
    { label: "Mobile", items: "React Native, Expo, Zustand, TanStack Query, App Store release" },
    {
      label: "Architecture",
      items:
        "Multi-tenant SaaS, monolith-to-microservices migration, stateless services, DDD, queues and background jobs, caching, horizontal and vertical scaling"
    },
    {
      label: "Workflow automation",
      items: "Elsa Workflows, Hangfire, approval flows, audit trails"
    },
    {
      label: "Databases & storage",
      items: "MySQL, PostgreSQL, SQL Server, Supabase, Redis, S3 object storage"
    },
    {
      label: "DevOps",
      items:
        "Docker (multi-stage builds), Docker Compose, Kubernetes (K3s), GitHub Actions, CI/CD, Grafana, Sentry, Hetzner"
    },
    {
      label: "Payments & integrations",
      items: "Stripe Connect, subscriptions, B2B payouts, Customer.io, PubNub, WebSockets"
    },
    {
      label: "Media & performance",
      items: "FFmpeg, secure video streaming, PWAs, Lighthouse optimization"
    },
    { label: "AI", items: "LLM integration, prompt engineering, structured outputs, Orq.ai, RAG" },
    { label: "Practices", items: "TDD, SOLID, Vitest, code audits, technical documentation" },
    {
      label: "Collaboration",
      items: "Team leadership, Agile, cross-functional collaboration, UI/UX design"
    }
  ],
  writing: [
    "Published a LinkedIn article explaining Retrieval-Augmented Generation (RAG) in plain language.",
    "Wrote a Farsi technical series comparing the .NET and Go runtimes for fellow developers."
  ],
  education: EDUCATION,
  languages: "Persian (native) · English (professional working proficiency)"
}

export const RESUME_DOCUMENTS = { resume: RESUME, cv: CV } as const
