import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";
import { profile, service } from "../content";

export const metadata: Metadata = {
  title: "Service",
  description:
    "Ge Tang’s contributions to GIST professional development sessions, IST conference planning, and scholarly exchange.",
};

export default function ServicePage() {
  return (
    <SiteShell>
      <main className="subpage">
        <PageIntro
          eyebrow="Scholarly exchange"
          title="Service"
          description="Professional development sessions and conference planning within the IST community."
        />
        <section className="detail-section">
          <div className="section-heading-row">
            <h2>Contributing to the IST community</h2>
          </div>
          <div className="service-grid">
            {service.map((group) => (
              <article key={group.category}>
                <h3>{group.category}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
            <article className="service-note">
              <span>Community</span>
              <p>My service helps create opportunities for members of the IST community to engage with perspectives beyond their own work.</p>
              <a href={`mailto:${profile.email}`}>Get in touch ↗</a>
            </article>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
