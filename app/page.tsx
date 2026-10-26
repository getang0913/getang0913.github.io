import type { Metadata } from "next";
import { SiteShell } from "./components/SiteShell";
import { Typewriter } from "./components/Typewriter";
import { profile } from "./content";

export const metadata: Metadata = {
  title: { absolute: "Ge Tang — Academic Portfolio" },
  description: "Ge Tang studies AI-supported learning, self-regulation, and help seeking as a doctoral student in Instructional Systems Technology at Indiana University Bloomington.",
};

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="hero section-shell" id="home">
          <aside className="profile-card">
            {/* A static public asset keeps the original portrait available without a remote image service. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="profile-portrait" src={profile.portrait} width="960" height="1456" alt="Portrait of Ge Tang" />
            <p className="profile-name">{profile.name}</p>
            <p className="profile-role">{profile.role}</p>
            <p>{profile.institution}</p>
            <p>{profile.location}</p>
            <div className="profile-links">
              <a href={`mailto:${profile.email}`}>Email <span>↗</span></a>
              <span className="pending-social" aria-disabled="true">Google Scholar <small>Forthcoming</small></span>
              <span className="pending-social" aria-disabled="true">GitHub <small>Forthcoming</small></span>
              <span className="pending-social" aria-disabled="true">LinkedIn <small>Forthcoming</small></span>
            </div>
          </aside>

          <div className="hero-content">
            <p className="eyebrow">Learning sciences · Educational technology</p>
            <h1>Researching <Typewriter words={profile.keywords} /></h1>
            <p className="hero-statement">{profile.statement}</p>
            <div className="hero-notes" aria-label="Research interests">
              <span>AI support</span>
              <span>Self-regulation</span>
              <span>Instructional design</span>
            </div>
          </div>
        </section>

      </main>
    </SiteShell>
  );
}
