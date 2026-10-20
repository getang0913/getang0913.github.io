import Link from "next/link";
import type { Metadata } from "next";
import { SiteShell } from "./components/SiteShell";
import { Typewriter } from "./components/Typewriter";
import { candidateSummary, profile, projects, publications, researchAreas, service } from "./content";

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
            <Link className="button button-secondary" href="/cv">View CV</Link>
          </aside>

          <div className="hero-content">
            <p className="eyebrow">Learning sciences · Educational technology</p>
            <h1>Researching <Typewriter words={profile.keywords} /></h1>
            <p className="hero-statement">{profile.statement}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#statement">Read candidate statement</a>
              <Link className="text-link" href="/publications">Browse publications <span>↗</span></Link>
            </div>
            <div className="hero-notes" aria-label="Research interests">
              <span>AI support</span>
              <span>Self-regulation</span>
              <span>Instructional design</span>
            </div>
          </div>
        </section>

        <section className="statement section-shell" id="statement">
          <div className="section-label"><span>01</span><p>Candidate statement</p></div>
          <div className="statement-content">
            <p className="eyebrow">Research, preparation, and purpose</p>
            <h2>{candidateSummary.title}</h2>
            <div className="statement-columns">
              {candidateSummary.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="statement-pullquote">
              <span>Commitment</span>
              <p>{candidateSummary.commitment}</p>
            </div>
            <Link className="text-link statement-link" href="/statement">Read the full candidate statement <span>↗</span></Link>
          </div>
        </section>

        <section className="research section-shell" id="research">
          <div className="section-label"><span>02</span><p>Research</p></div>
          <div>
            <div className="section-heading-row">
              <div><p className="eyebrow">An evolving research agenda</p><h2>Three connected lines of inquiry</h2></div>
              <Link className="text-link" href="/publications">All publications <span>↗</span></Link>
            </div>
            <div className="research-grid">
              {researchAreas.map((area) => (
                <article className="research-card" key={area.number}>
                  <span className="research-number">{area.number}</span>
                  <div className="research-orbit" aria-hidden="true"><i /></div>
                  <h3>{area.title}</h3><p>{area.description}</p><small>{area.methods}</small>
                </article>
              ))}
            </div>
            <div className="featured-work">
              <p className="eyebrow">Selected publications</p>
              {publications.filter((item) => item.featured).map((item) => (
                <article key={item.title}>
                  <span>{item.year}</span>
                  <div><h3><Link href="/publications">{item.title}</Link></h3><p>{item.authors} · <em>{item.venue}</em></p></div>
                  <Link className="work-arrow" href="/publications" aria-label={`View publication details for ${item.title}`}>↗</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="teaching section-shell" id="teaching">
          <div className="section-label"><span>03</span><p>Teaching</p></div>
          <div>
            <div className="section-heading-row">
              <div><p className="eyebrow">Instructional design and learning</p><h2>Guidance that responds to learners’ needs</h2></div>
            </div>
            <p className="section-lede">Developing and revising activities for Project Bio+CS in response to teacher feedback has shaped my approach to teaching. I hope to design activities that consider differences in students’ prior knowledge and provide appropriate guidance.</p>
            <div className="pending-content"><p className="eyebrow">Teaching experience</p><p>Course and teaching experience details will be added here.</p></div>
          </div>
        </section>

        <section className="service section-shell" id="service">
          <div className="section-label"><span>04</span><p>Service</p></div>
          <div>
            <div className="section-heading-row">
              <div><p className="eyebrow">Scholarly exchange</p><h2>Contributing to the IST community</h2></div>
            </div>
            <div className="service-grid">
              {service.map((group) => (
                <article key={group.category}><h3>{group.category}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>
              ))}
              <article className="service-note"><span>Community</span><p>My service helps create opportunities for members of the IST community to engage with perspectives beyond their own work.</p><a href={`mailto:${profile.email}`}>Get in touch ↗</a></article>
            </div>
          </div>
        </section>

        <section className="projects-preview section-shell" id="projects">
          <div className="section-label"><span>05</span><p>Projects</p></div>
          <div>
            <div className="section-heading-row">
              <div><p className="eyebrow">Research in practice</p><h2>Selected projects</h2></div>
              <Link className="text-link" href="/projects">Project archive <span>↗</span></Link>
            </div>
            <div className="project-strip">
              {projects.filter((project) => project.featured).map((project) => (
                <Link href="/projects" key={project.title}><span>{project.status}</span><h3>{project.title}</h3><p>{project.description}</p><small>{project.tags.join(" · ")}</small></Link>
              ))}
            </div>
          </div>
        </section>

        <section className="feedback section-shell" id="feedback">
          <div className="section-label"><span>06</span><p>Feedback</p></div>
          <div>
            <div className="section-heading-row"><div><p className="eyebrow">In others’ words</p><h2>Feedback</h2></div></div>
            <div className="pending-content"><p>Selected feedback from students, collaborators, and colleagues will be shared here when available.</p></div>
          </div>
        </section>

        <section className="closing-cta">
          <p className="eyebrow">The complete record</p>
          <h2>Education, research, publications, and contributions.</h2>
          <div><Link className="button button-primary" href="/cv">Explore the CV</Link><a className="text-link" href={`mailto:${profile.email}`}>Contact me <span>↗</span></a></div>
        </section>
      </main>
    </SiteShell>
  );
}
