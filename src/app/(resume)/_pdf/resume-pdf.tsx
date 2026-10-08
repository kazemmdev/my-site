import React from "react"
import {
  Document,
  Font,
  Link,
  Page,
  renderToBuffer,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer"

import { RESUME_PROFILE, type ResumeDocument } from "@/config/resume"
import { formatDuration, formatPeriod, isCompact } from "@/lib/resume"

// Mirrors resume-sheet.tsx on paper; colors are the `.paper` (light) design tokens.
// react-pdf hyphenates by default; keep words whole.
Font.registerHyphenationCallback(word => [word])

const COLOR = { text: "#1d1d1f", muted: "#6e6e73", link: "#0066cc", border: "#d2d2d7" }

const s = StyleSheet.create({
  page: {
    paddingVertical: 32,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.35,
    color: COLOR.text
  },
  name: { fontSize: 20, lineHeight: 1.2, fontFamily: "Helvetica-Bold", textAlign: "center" },
  centered: { textAlign: "center", color: COLOR.muted, marginTop: 3 },
  links: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 3 },
  link: { color: COLOR.link, textDecoration: "none", marginHorizontal: 5 },
  summary: { marginTop: 10 },
  section: { marginTop: 10 },
  sectionTitle: {
    fontSize: 11.5,
    fontFamily: "Helvetica-Bold",
    paddingBottom: 3,
    marginBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: COLOR.border
  },
  role: { marginBottom: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  roleTitle: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  muted: { color: COLOR.muted },
  bold: { fontFamily: "Helvetica-Bold", color: COLOR.text },
  bullet: { flexDirection: "row", marginTop: 1.5 },
  bulletMark: { width: 10, color: COLOR.muted },
  bulletText: { flex: 1 },
  stack: { marginTop: 3 }
})

const Section = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <View style={s.section}>
    <Text style={s.sectionTitle} minPresenceAhead={40}>
      {title}
    </Text>
    {children}
  </View>
)

const Bullets = ({ items }: { items: string[] }) =>
  items.map(item => (
    <View key={item} style={s.bullet} wrap={false}>
      <Text style={s.bulletMark}>•</Text>
      <Text style={s.bulletText}>{item}</Text>
    </View>
  ))

const ResumePdf = ({ doc }: { doc: ResumeDocument }) => (
  <Document
    title={`${RESUME_PROFILE.name} - ${doc.title}`}
    author={RESUME_PROFILE.name}
    subject={RESUME_PROFILE.headline}
  >
    <Page size="A4" style={s.page}>
      <Text style={s.name}>{RESUME_PROFILE.name}</Text>
      <Text style={s.centered}>{RESUME_PROFILE.headline}</Text>
      <Text style={s.centered}>{RESUME_PROFILE.location}</Text>
      <View style={s.links}>
        {RESUME_PROFILE.links.map(({ label, href }) => (
          <Link key={href} src={href} style={s.link}>
            {label}
          </Link>
        ))}
      </View>

      <Text style={s.summary}>{doc.summary}</Text>

      <Section title="Experience">
        {doc.experience.map(role => (
          <View key={`${role.company}-${role.start}`} style={s.role}>
            <View wrap={false} minPresenceAhead={30}>
              <View style={s.row}>
                <Text style={s.roleTitle}>
                  {role.title}
                  {isCompact(role) && ` · ${role.company}`}
                </Text>
                <Text style={s.muted}>
                  {doc.showDuration && `(${formatDuration(role)}) `}
                  <Text style={s.bold}>{formatPeriod(role)}</Text>
                </Text>
              </View>
              {!isCompact(role) && (
                <View style={s.row}>
                  <Text style={s.muted}>
                    <Text style={s.bold}>{role.company}</Text>
                    {role.companyNote && ` · ${role.companyNote}`}
                  </Text>
                  {role.employment && <Text style={s.muted}>{role.employment}</Text>}
                </View>
              )}
            </View>
            <Bullets items={role.bullets} />
            {role.stack && (
              <Text style={s.stack}>
                <Text style={s.bold}>Tech stack: </Text>
                <Text style={s.muted}>{role.stack.join(", ")}</Text>
              </Text>
            )}
          </View>
        ))}
      </Section>

      <Section title="Skills">
        {doc.skills.map(({ label, items }) => (
          <Text key={label} style={{ marginTop: 2 }}>
            <Text style={s.bold}>{label}: </Text>
            <Text style={s.muted}>{items}</Text>
          </Text>
        ))}
      </Section>

      {doc.writing && (
        <Section title="Writing & Knowledge Sharing">
          <Bullets items={doc.writing} />
        </Section>
      )}

      <Section title="Education">
        {doc.education.map(({ degree, detail }) => (
          <View key={degree} style={s.row}>
            <Text style={s.roleTitle}>{degree}</Text>
            <Text style={s.muted}>{detail}</Text>
          </View>
        ))}
      </Section>

      {doc.languages && (
        <Section title="Languages">
          <Text>{doc.languages}</Text>
        </Section>
      )}
    </Page>
  </Document>
)

/** PDF response; the toolbar's `download` attribute saves it, direct links open it inline. */
export async function renderResumePdf(doc: ResumeDocument) {
  const pdf = await renderToBuffer(<ResumePdf doc={doc} />)

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${doc.fileName}"`
    }
  })
}
