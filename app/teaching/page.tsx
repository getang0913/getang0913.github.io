import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Teaching",
  description: "Teaching Assistant for EDUC-R521: Fall 2026",
};

export default function TeachingPage() {
  return (
    <SiteShell>
      <main className="subpage">
        <PageIntro
          eyebrow="Ge Tang"
          title="Teaching"
          description="Teaching Assistant for EDUC-R521: Fall 2026"
        />
      </main>
    </SiteShell>
  );
}
