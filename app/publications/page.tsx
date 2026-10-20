import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";
import { publications } from "../content";

export const metadata: Metadata = {
  title: "Publications",
  description: "Journal articles, conference presentations, and book reviews by Ge Tang.",
};

export default function PublicationsPage() {
  const years = [...new Set(publications.map((publication) => publication.year))];

  return (
    <SiteShell>
      <main className="subpage">
        <PageIntro
          eyebrow="Scholarship"
          title="Publications"
          description="Journal articles, conference presentations, and book reviews in learning design and educational technology."
        />
        <section className="archive-layout">
          <aside>
            <p className="eyebrow">Browse by year</p>
            {years.map((year) => <a key={year} href={`#year-${year}`}>{year}</a>)}
          </aside>
          <div className="publication-archive">
            {years.map((year) => (
              <section id={`year-${year}`} key={year}>
                <h2>{year}</h2>
                {publications.filter((publication) => publication.year === year).map((publication) => (
                  <article key={publication.title}>
                    <span className="publication-type">{publication.type}</span>
                    <h3>{publication.title}</h3>
                    <p>{publication.authors}</p>
                    <p><em>{publication.venue}</em></p>
                    {(publication.status || publication.date) && (
                      <p>{[publication.status, publication.date].filter(Boolean).join(" · ")}</p>
                    )}
                    <div className="tag-row">
                      {publication.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </article>
                ))}
              </section>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
