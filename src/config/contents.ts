export const INTRO = {
  role: "Full-Stack Developer",
  title: "Hey, I’m Kazem 👋",
  body: "Full-stack developer with 8+ years of experience building SaaS platforms, internal tools, and customer-facing applications from concept to production. Strong with Laravel, Next.js, React, Docker, Kubernetes, payment systems, multi-tenant architectures, and video processing pipelines."
}

export const SKILLS = [
  {
    title: "Programming & Core Technologies",
    items: ["PHP (Laravel)", "JavaScript", "TypeScript", "Node.js", "React", "Next.js", "Go"],
    body: "I specialize in building scalable, modern web applications with a strong foundation in backend (Laravel, Node.js, Go) and frontend (React, Next.js). My code is clean, maintainable, and optimized for real-world production environments."
  },
  {
    title: "Architecture & DevOps",
    items: [
      "Microservices",
      "Multi-Tenant SaaS",
      "REST APIs",
      "DDD",
      "TDD",
      "Docker",
      "Kubernetes (K3s)",
      "Grafana",
      "GitHub Actions",
      "CI/CD"
    ],
    body: "I design and deploy scalable architectures, from containerized microservices to production-ready Kubernetes clusters with Grafana monitoring and log aggregation. My DevOps workflow automates deployments, testing, and provisioning—bringing full server setup down to minutes."
  },
  {
    title: "Databases & Storage",
    items: ["MySQL", "Redis"],
    body: "I use relational and in-memory databases to design efficient data flows. Whether it’s optimizing queries for speed, caching for performance, or provisioning fully isolated per-tenant databases, I ensure data handling is secure and scalable."
  },
  {
    title: "Payments & Integrations",
    items: ["Stripe Connect", "Subscriptions", "B2B Payouts", "Customer.io", "PubNub", "WebSockets"],
    body: "I build payment systems that handle subscriptions, payouts, verification, and dispute resolution, with safeguards against edge-case billing errors. I also integrate and tame third-party services—messaging, chat, and real-time notification pipelines."
  },
  {
    title: "Frontend Engineering",
    items: ["React", "Next.js", "Material UI", "Responsive Design", "Accessibility", "SEO"],
    body: "I craft fast, user-friendly interfaces with a focus on accessibility and SEO. My approach blends clean design systems with performance optimization—eliminating unnecessary re-renders and keeping initial loads fast."
  },
  {
    title: "Media & Performance",
    items: ["FFmpeg", "Video Streaming", "PWAs", "Lighthouse Optimization"],
    body: "I’ve implemented adaptive video streaming with smart resolution switching and transcoding pipelines offloaded to dedicated nodes. I also enhance app performance through caching strategies, SEO improvements, and PWA optimization."
  },
  {
    title: "Collaboration & Leadership",
    items: ["Team Leadership", "Agile", "Cross-Functional Collaboration"],
    body: "I’ve guided teams through building modular systems, mentoring developers, and ensuring smooth collaboration between engineering, design, and product teams across the full lifecycle of features."
  }
]

export const EXPERIENCES = [
  {
    title: "Full Stack Developer — GradeUp",
    timeframe: "Remote · Dec 2024 – Present",
    details: [
      "Founded and built a multi-tenant SaaS platform from scratch where tutors subscribe and get their own branded site, subdomain, and fully isolated database — all provisioned automatically",
      "Designed stateless Laravel APIs and a Next.js frontend, covering both the tenant-facing site and the admin panel",
      "Set up horizontal and vertical scaling strategies and deployed Grafana for monitoring and log aggregation to handle traffic spikes across simultaneous tutor campaigns",
      "Offloaded video transcoding to dedicated nodes using FFmpeg so encoding jobs never impact the main application servers",
      "Automated deployments with GitHub Actions and K3s, bringing full server provisioning down to under 10 minutes"
    ]
  },
  {
    title: "Frontend Developer — TobiBot",
    timeframe: "Turkey · Jan 2026 – Mar 2026",
    details: [
      "Built a Next.js web app for a Telegram bot service, covering subscription flows, account dashboards, and a cooperator panel that lets partners define campaigns and monitor user activity in real time"
    ]
  },
  {
    title: "Frontend Developer — Beleb Software",
    timeframe: "Remote (Philippines) · Nov 2025 – Dec 2025",
    details: [
      "Maintained and improved React components for an existing app, resolving performance and rendering issues and shipping enhancements requested by the design team",
      "Integrated frontend changes with the Laravel backend API and coordinated directly with the designer to align on UI behavior"
    ]
  },
  {
    title: "Senior Full Stack Developer — Hunter",
    timeframe: "Turkey · Dec 2022 – Apr 2025",
    details: [
      "Built a healthcare platform (Laravel + Next.js) with a video transcoding pipeline supporting multiple formats and blocking direct MP4 downloads to protect raw content",
      "Extended the platform to include a smoking cessation app backed by a trained AI model, with its own subscription plan and separate business logic running alongside the core product",
      "Added a community feature for fasting users to share progress photos and updates, with real-time notifications via WebSockets and Laravel Echo",
      "Tuned the K3s cluster and optimized the Laravel Docker image for horizontal scaling to absorb heavy traffic spikes during campaign periods"
    ]
  },
  {
    title: "Full Stack Developer — Lazo",
    timeframe: "Remote (France) · Apr 2023 – Nov 2024",
    details: [
      "Audited the codebase early and addressed structural problems: removed dead packages, resolved dependency conflicts, and meaningfully reduced build times",
      "Fixed broken integrations with Customer.io and PubNub (used for in-app chat), then redesigned parts of the architecture to reduce over-reliance on expensive third-party services",
      "Reworked the payment system to support subscriptions and B2B payout logic for service providers, including validation fixes and safeguards against edge-case billing errors",
      "Built an admin dashboard for tracking mission states and user activity, and added localized pricing logic adapted for international markets",
      "Worked closely with other developers and product owners across the full lifecycle of features"
    ]
  },
  {
    title: "Full Stack Developer — Torotazeh",
    timeframe: "Remote (Iran) · Jul 2022 – Sep 2022",
    details: [
      "Built a location-aware fresh fruit marketplace from scratch, connecting buyers to nearby producers and shops with third-party courier integration for same-day delivery",
      "Set up the full deployment stack via Docker Compose, built separate dashboards for admins and producers, and added PWA push notifications to keep users updated on order status"
    ]
  },
  {
    title: "Frontend Developer — Evergape",
    timeframe: "Remote (Germany) · Jul 2022 – Sep 2022",
    details: [
      "Developed modular UI components using React and Material UI",
      "Diagnosed and resolved a significant performance problem in a deeply nested list component, eliminating unnecessary re-renders and fixing a slow initial load on a health-related platform"
    ]
  },
  {
    title: "Full Stack Developer — Percept",
    timeframe: "Freelance · Nov 2018 – Mar 2021",
    details: [
      "Built a content platform with a revenue-sharing model where writers earn based on views and interactions, tracked through a built-in wallet and analytics dashboard",
      "Developed a custom WYSIWYG editor on top of CKEditor, adapted it for RTL text, and styled it to match the platform's design system",
      "Handled SEO and image optimization on the Laravel backend; managed full server setup and deployment on Hetzner using Docker Compose"
    ]
  }
]

export const EDUCATION = [
  {
    title: "M.Sc., Systems Engineering",
    timeframe: "University of Tehran · Graduated 2017",
    details: []
  }
]
