import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { SiteShell } from "../components/SiteShell";
import { profile } from "../content";
import { publicAsset } from "../site-config";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "Ge Tang’s education, research experience, publications, fellowships, service, and skills.",
};

const cvSections = [
  {
    title: "Education",
    items: [
      {
        date: "Sep 2025 — Present",
        title: "Ph.D. student, Instructional Systems Technology",
        details: [
          "Indiana University Bloomington · Minor in Computer Science · GPA: 4.0/4.0",
          "Selected coursework: Application of Research Methods to IST Issues; Intermediate Statistics Applied to Education; Applied Machine Learning; Usable Artificial Intelligence; Elements of Artificial Intelligence.",
        ],
      },
      {
        date: "Sep 2023 — Jun 2025",
        title: "M.A., Instructional Technology and Media",
        details: [
          "Columbia University · GPA: 3.95/4.0",
          "Selected coursework: Instructional Design of Ed Technology; Theory and Programming of Interactive Media; Cognition and Computers.",
        ],
      },
      {
        date: "Sep 2020 — Jun 2023",
        title: "B.A., Education Studies",
        details: [
          "University College London, Institute of Education · First Class Honors",
          "Selected coursework: An Introduction to Applied Quantitative Analysis in the Social Sciences; Researching Education and Society: Qualitative Methods; The Learning Sciences.",
        ],
      },
    ],
  },
  {
    title: "Research experience",
    items: [
      {
        date: "Sep 2025 — Present",
        title: "Research Assistant · Embodied learning and the circulatory system",
        details: [
          "Indiana University Bloomington · Project Bio+CS · Under the guidance of Dr. Kyungbin Kwon",
          "Led the design and implementation of a four-lesson embodied-learning intervention for 56 sixth-grade students, using movement, physical models, and systems-based activities to teach circulatory-system concepts.",
          "Developed coding frameworks for students’ written responses and drawings, analyzed mental models of heart structure, circulation, and oxygenation, and supported inter-rater reliability analysis. Responsibilities also included revising lessons in response to teacher feedback, interviewing students and teachers, and contributing to manuscript preparation.",
          "Documented post-instruction performance of 80–91% of available points on key circulatory-process items. Identified persistent difficulties with heart-chamber identification and sequencing to inform instructional refinement.",
        ],
      },
      {
        date: "Sep 2026 — Present",
        title: "Research Assistant · Embodied computer science curriculum",
        details: [
          "Indiana University Bloomington",
          "Designed a four-lesson middle-school curriculum introducing transistors, binary representation, binary addition, and logic gates through hands-on activities and embodied learning.",
          "Developed a scaffolded sequence connecting sum-and-carry reasoning with XOR and AND operations through physical role-play and visual models.",
          "Planned pilot: observe how middle-school students engage with the activities and interpret key concepts, then use the observations to refine the curriculum.",
        ],
      },
      {
        date: "Sep 2026 — Present",
        title: "Research Assistant · AI-generated hints and metacognitive monitoring",
        details: [
          "Indiana University Bloomington · Planned first-authored study",
          "Proposed a high-school mathematics study examining how metacognitive reflection, monitoring accuracy, and control over AI-generated hints relate to learning and independent performance.",
          "Designed a platform workflow combining reflection prompts, confidence ratings, and learner-controlled, shared-control, or system-controlled hint delivery. The planned study includes interaction records, interviews, and immediate and delayed assessments without AI assistance.",
          "Preparation and pilot planned before Spring 2027 data collection: refine the design, obtain required approvals, and evaluate task difficulty, hint quality, prompt clarity, monitoring measures, and platform usability.",
        ],
      },
    ],
  },
  {
    title: "Publications and conferences",
    items: [
      {
        date: "Nov 3–7, 2026",
        title:
          "Developing sixth-grade students’ understanding of the human circulatory system through embodied learning",
        details: [
          "Kwon, K., Tang, G., Park, D., Nadir, H., & Peng, H.",
          "Poster presentation accepted · Association for Educational Communications and Technology (AECT) International Convention · Chicago, IL, United States.",
        ],
      },
      {
        date: "2026",
        title:
          "A systematic review of language educators’ practices and development with GenAI",
        details: [
          "Li, B., Exter, M., Feng, W., Tang, G., & Xu, K.",
          "International Journal of Artificial Intelligence in Education, 100010.",
        ],
      },
      {
        date: "2025",
        title:
          "Helpful or Harmful? Comparative Study of Perceived and Actual Effectiveness of LLM-Driven Tutors in Game-Based CFL Learning",
        details: [
          "Fang, L., Tang, G., & Zhang, L.",
          "Education Sciences, 15(11), 1502.",
        ],
      },
      {
        date: "2024",
        title:
          "Explaining child maltreatment and aggression among Chinese drug users: The mediating and moderating roles of drug craving and impulsivity",
        details: [
          "Lu, Z., Tang, G., & Fortin, S.",
          "Child Abuse & Neglect, 154, 106954.",
        ],
      },
      {
        date: "2022",
        title:
          "A review of ‘A gender flexible pedagogy in early childhood education’",
        details: [
          "Tang, G., & Xu, K.",
          "Journal of Higher Education Research, 3(4), 377–379.",
        ],
      },
    ],
  },
  {
    title: "Fellowships and awards",
    items: [
      {
        date: "2026–2027",
        title: "Mary Margaret and Denzil Webb Fellowship",
        details: ["Indiana University Bloomington · $2,000"],
      },
      {
        date: "2026–2027",
        title: "Jerrold E. Kemp Instructional Systems Technology Fellowship",
        details: ["Indiana University Bloomington · $750"],
      },
    ],
  },
  {
    title: "Scholarly service",
    items: [
      {
        date: "Current",
        title: "Vice President for GIST professional development sessions",
        details: [
          "Invite speakers from research and industry, coordinate schedules, prepare promotional materials, and organize session logistics to support scholarly exchange in the IST community.",
        ],
      },
      {
        date: "Current",
        title: "IST conference planning",
        details: [
          "Contribute to developing the conference theme and preparing for the event.",
        ],
      },
    ],
  },
  {
    title: "Languages and skills",
    items: [
      {
        date: "Languages",
        title: "Mandarin · English · French",
        details: ["Mandarin: native · English: proficient · French: intermediate"],
      },
      {
        date: "Programming",
        title: "HTML · CSS · JavaScript · Python",
        details: [],
      },
      {
        date: "Quantitative",
        title: "SPSS · Stata · R",
        details: [],
      },
      {
        date: "Qualitative",
        title: "NVivo",
        details: [
          "Experience developing coding frameworks and analyzing student worksheets, drawings, and interviews.",
        ],
      },
      {
        date: "UI/UX design",
        title: "Figma · Adobe XD · Sketch",
        details: [],
      },
    ],
  },
];

export default function CvPage() {
  return (
    <SiteShell>
      <main className="subpage cv-page">
        <PageIntro
          eyebrow="Curriculum vitae"
          title="Education and scholarly work"
          description="My academic background, research experience, publications, fellowships, service, and skills."
        />
        <div className="cv-toolbar">
          <div>
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
          </div>
          <a className="button button-primary" href={publicAsset("/ge-tang-cv.pdf")} download="Ge-Tang-CV.pdf">Download CV (PDF)</a>
        </div>
        <section className="cv-sections">
          {cvSections.map((section) => (
            <div className="cv-section" key={section.title}>
              <h2>{section.title}</h2>
              <div>
                {section.items.map((item) => (
                  <article key={item.title}>
                    <span>{item.date}</span>
                    <div>
                      <h3>{item.title}</h3>
                      {item.details.map((detail) => <p key={detail}>{detail}</p>)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
