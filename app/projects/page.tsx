import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";
import { projects } from "../content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ge Tang’s research and design projects in embodied learning, computer science education, and AI-supported mathematics learning.",
};

export default function ProjectsPage() {
  return (
    <SiteShell>
      <main className="subpage">
        <PageIntro
          eyebrow="Research in practice"
          title="Projects"
          description="Research and design projects exploring embodied learning, computer science education, and AI-supported mathematics learning."
        />
        <section className="project-archive">
          {projects.map((project, index) => (
            <article key={project.title}>
              <div className="project-index">0{index + 1}</div>
              <div className="project-main">
                <div className="project-meta">
                  <span>{project.period}</span>
                  <span>{project.status}</span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {project.details && project.details.length > 0 && (
                  <ul className="project-details">
                    {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                )}
                <dl>
                  <div>
                    <dt>Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>{project.tags.join(" · ")}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
