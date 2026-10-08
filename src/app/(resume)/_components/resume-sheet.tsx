import React from "react"

import { RESUME_PROFILE, type ResumeDocument } from "@/config/resume"
import { formatDuration, formatPeriod, isCompact } from "@/lib/resume"

const Section = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <section className="mt-8">
    <h2 className="border-b border-border pb-2 text-product-label font-semibold">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
)

const ResumeSheet = ({ doc }: { doc: ResumeDocument }) => (
  <article className="paper mx-auto w-full max-w-[210mm] rounded-card border border-border bg-card px-6 py-10 text-card-foreground md:px-14 md:py-14 print:max-w-none print:rounded-none print:border-0 print:p-0">
    <header className="text-center">
      <h1 className="text-hero-product-name font-semibold">{RESUME_PROFILE.name}</h1>
      <p className="mt-2 text-body text-muted-foreground">{RESUME_PROFILE.headline}</p>
      <p className="mt-1 text-body text-muted-foreground">{RESUME_PROFILE.location}</p>
      <p className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 text-body">
        {RESUME_PROFILE.links.map(({ label, href }) => (
          <a key={href} href={href} className="text-link hover:underline">
            {label}
          </a>
        ))}
      </p>
    </header>

    <p className="mt-8 text-body leading-relaxed">{doc.summary}</p>

    <Section title="Experience">
      <div className="space-y-6">
        {doc.experience.map(role => (
          <div key={`${role.company}-${role.start}`} className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-section-nav font-semibold">
                {role.title}
                {isCompact(role) && ` · ${role.company}`}
              </h3>
              <p className="text-body text-muted-foreground">
                {doc.showDuration && `(${formatDuration(role)}) `}
                <span className="font-semibold text-foreground">{formatPeriod(role)}</span>
              </p>
            </div>
            {!isCompact(role) && (
              <div className="flex flex-wrap justify-between gap-x-4 text-body text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">{role.company}</span>
                  {role.companyNote && ` · ${role.companyNote}`}
                </p>
                {role.employment && <p>{role.employment}</p>}
              </div>
            )}
            <ul className="mt-2 list-disc space-y-1 ps-5 text-body leading-relaxed marker:text-muted-foreground">
              {role.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {role.stack && (
              <p className="mt-2 text-body leading-relaxed">
                <span className="font-semibold">Tech stack:</span>{" "}
                <span className="text-muted-foreground">{role.stack.join(", ")}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>

    <Section title="Skills">
      <dl className="space-y-1.5 text-body leading-relaxed">
        {doc.skills.map(({ label, items }) => (
          <div key={label}>
            <dt className="inline font-semibold">{label}: </dt>
            <dd className="inline text-muted-foreground">{items}</dd>
          </div>
        ))}
      </dl>
    </Section>

    {doc.writing && (
      <Section title="Writing & Knowledge Sharing">
        <ul className="list-disc space-y-1 ps-5 text-body leading-relaxed marker:text-muted-foreground">
          {doc.writing.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
    )}

    <Section title="Education">
      {doc.education.map(({ degree, detail }) => (
        <div key={degree} className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-section-nav font-semibold">{degree}</h3>
          <p className="text-body text-muted-foreground">{detail}</p>
        </div>
      ))}
    </Section>

    {doc.languages && (
      <Section title="Languages">
        <p className="text-body">{doc.languages}</p>
      </Section>
    )}
  </article>
)

export default ResumeSheet
