import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Teaching",
  description:
    "Ge Tang’s approach to teaching, shaped by instructional design and teacher feedback in Project Bio+CS. Course details are forthcoming.",
};

export default function TeachingPage() {
  return (
    <SiteShell>
      <main className="subpage">
        <PageIntro
          eyebrow="Instructional design and learning"
          title="Teaching"
          description="An approach to teaching shaped by developing and revising learning activities for Project Bio+CS."
        />
        <section className="detail-section">
          <div className="section-heading-row">
            <h2>Guidance that responds to learners’ needs</h2>
          </div>
          <p className="section-lede">
            Developing and revising activities for Project Bio+CS in response to teacher feedback has shaped my approach to teaching. I hope to design activities that consider differences in students’ prior knowledge and provide appropriate guidance.
          </p>
          <div className="pending-content">
            <p className="eyebrow">Teaching experience</p>
            <p>Course and teaching experience details will be added here.</p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
