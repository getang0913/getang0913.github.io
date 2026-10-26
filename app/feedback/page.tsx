import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Selected feedback from Ge Tang’s students, collaborators, and colleagues will be shared when available.",
};

export default function FeedbackPage() {
  return (
    <SiteShell>
      <main className="subpage">
        <PageIntro
          eyebrow="In others’ words"
          title="Feedback"
          description="Perspectives on working and learning together."
        />
        <section className="detail-section" aria-label="Feedback availability">
          <div className="pending-content">
            <p>Selected feedback from students, collaborators, and colleagues will be shared here when available.</p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
