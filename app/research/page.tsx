import Link from "next/link";
import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";
import { publications, researchAreas } from "../content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Ge Tang’s research on monitoring and help seeking, control over AI assistance, and independent learning outcomes.",
};

export default function ResearchPage() {
  return (
    <SiteShell>
      <main className="subpage">
        <PageIntro
          eyebrow="An evolving research agenda"
          title="Research"
          description="Designing and studying AI-supported learning environments that help learners understand, monitor, and regulate their learning."
        />
        <section className="detail-section">
          <div className="section-heading-row">
            <h2>Three connected lines of inquiry</h2>
            <Link className="text-link" href="/publications">All publications <span>↗</span></Link>
          </div>
          <div className="research-grid">
            {researchAreas.map((area) => (
              <article className="research-card" key={area.number}>
                <span className="research-number">{area.number}</span>
                <div className="research-orbit" aria-hidden="true"><i /></div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <small>{area.methods}</small>
              </article>
            ))}
          </div>
          <div className="featured-work">
            <p className="eyebrow">Selected publications</p>
            {publications.filter((item) => item.featured).map((item) => (
              <article key={item.title}>
                <span>{item.year}</span>
                <div>
                  <h3><Link href="/publications">{item.title}</Link></h3>
                  <p>{item.authors} · <em>{item.venue}</em></p>
                </div>
                <Link className="work-arrow" href="/publications" aria-label={`View publication details for ${item.title}`}>↗</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
