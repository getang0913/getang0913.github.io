import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";
import { statementReferences, statementSections } from "../statement-content";

export const metadata: Metadata = {
  title: "Candidate statement",
  description:
    "Ge Tang’s candidate statement on research goals, AI-supported learning, doctoral preparation, scholarly service, and equity.",
};

export default function StatementPage() {
  return (
    <SiteShell>
      <main className="subpage">
        <PageIntro
          eyebrow="Ge Tang"
          title="Candidate statement"
          description="My research goals, doctoral development, scholarly service, and commitment to equity and diversity."
        />
        <div className="archive-layout statement-layout">
          <aside aria-label="Statement contents">
            <p className="eyebrow">In this statement</p>
            {statementSections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.title}</a>
            ))}
            <a href="#references">References</a>
          </aside>
          <article className="statement-document">
            {statementSections.map((section) => (
              <section className="statement-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <section className="statement-section statement-references" id="references">
              <h2>References</h2>
              {statementReferences.map((reference) => <p key={reference}>{reference}</p>)}
            </section>
          </article>
        </div>
      </main>
    </SiteShell>
  );
}
