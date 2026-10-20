import { publicAsset } from "./site-config";

export type Publication = {
  year: string;
  title: string;
  authors: string;
  venue: string;
  type: "Journal article" | "Poster presentation" | "Book review";
  date?: string;
  status?: string;
  tags: string[];
  featured?: boolean;
};

export type Project = {
  title: string;
  period: string;
  description: string;
  role: string;
  status: string;
  tags: string[];
  details?: string[];
  featured?: boolean;
};

export const profile = {
  name: "Ge Tang",
  initials: "GT",
  role: "Ph.D. Student · Instructional Systems Technology",
  institution: "Indiana University Bloomington",
  location: "Bloomington, Indiana",
  email: "getang@iu.edu",
  portrait: publicAsset("/ge-tang.jpg"),
  statement:
    "I design and study AI-supported learning environments that respond to learners’ needs while strengthening their capacity to understand, monitor, and regulate their learning.",
  keywords: ["AI support", "self-regulation", "help seeking"],
};

export const candidateSummary = {
  title: "Designing AI support for understanding and independent learning.",
  paragraphs: [
    "I am a second-year doctoral student in Instructional Systems Technology at Indiana University Bloomington, with a minor in Computer Science. My goal is to become a faculty member at a research-intensive university and build a research program connecting learning processes with educational technology design.",
    "My work on Project Bio+CS with Dr. Kyungbin Kwon has shaped my interest in how learners recognize difficulties and use guidance. My planned first-authored study will examine learner, shared, and system control over LLM-based hints in high school mathematics, with attention to monitoring accuracy and performance after AI support is removed.",
  ],
  commitment:
    "I am committed to advancing equitable access to effective instructional support across differences in educational resources, language backgrounds, and prior preparation.",
};

export const researchAreas = [
  {
    number: "01",
    title: "Monitoring and help seeking",
    description:
      "How learners judge their understanding, recognize a need for help, and decide whether to request or accept AI assistance.",
    methods: "Self-regulated learning · Metacognition",
  },
  {
    number: "02",
    title: "Control over AI assistance",
    description:
      "How responsibility for initiating support can be shared between learners and AI, and how monitoring accuracy shapes the value of that control.",
    methods: "Scaffolding · Human–AI regulation",
  },
  {
    number: "03",
    title: "Independent learning outcomes",
    description:
      "Whether the benefits of AI assistance extend to conceptual understanding and immediate and delayed performance without AI support.",
    methods: "Conceptual understanding · Transfer",
  },
];

export const publications: Publication[] = [
  {
    year: "2026",
    title: "Developing sixth-grade students’ understanding of the human circulatory system through embodied learning",
    authors: "Kwon, K., Tang, G., Park, D., Nadir, H., & Peng, H.",
    venue: "Association for Educational Communications and Technology (AECT) International Convention, Chicago, IL, United States",
    type: "Poster presentation",
    date: "November 3–7, 2026",
    status: "Accepted",
    tags: ["Embodied learning", "Science education"],
  },
  {
    year: "2026",
    title: "A systematic review of language educators’ practices and development with GenAI",
    authors: "Li, B., Exter, M., Feng, W., Tang, G., & Xu, K.",
    venue: "International Journal of Artificial Intelligence in Education, 100010",
    type: "Journal article",
    tags: ["Generative AI", "Language education", "Systematic review"],
    featured: true,
  },
  {
    year: "2025",
    title: "Helpful or Harmful? Comparative Study of Perceived and Actual Effectiveness of LLM-Driven Tutors in Game-Based CFL Learning",
    authors: "Fang, L., Tang, G., & Zhang, L.",
    venue: "Education Sciences, 15(11), 1502",
    type: "Journal article",
    tags: ["LLM tutors", "Game-based learning", "Language learning"],
    featured: true,
  },
  {
    year: "2024",
    title: "Explaining child maltreatment and aggression among Chinese drug users: The mediating and moderating roles of drug craving and impulsivity",
    authors: "Lu, Z., Tang, G., & Fortin, S.",
    venue: "Child Abuse & Neglect, 154, 106954",
    type: "Journal article",
    tags: ["Child maltreatment", "Aggression", "Impulsivity"],
  },
  {
    year: "2022",
    title: "A review of ‘A gender flexible pedagogy in early childhood education’",
    authors: "Tang, G., & Xu, K.",
    venue: "Journal of Higher Education Research, 3(4), 377–379",
    type: "Book review",
    tags: ["Early childhood education", "Pedagogy"],
  },
];

export const projects: Project[] = [
  {
    title: "Embodied Learning of the Human Circulatory System",
    period: "September 2025 — Present",
    description:
      "As part of Project Bio+CS, I designed and implemented a four-lesson intervention for 56 sixth-grade students, using movement, physical modeling, and systems-based activities to explore circulation.",
    role: "Research assistant · Indiana University Bloomington; working with Dr. Kyungbin Kwon",
    status: "Instruction and analysis conducted",
    tags: ["Embodied learning", "Conceptual understanding", "Science education"],
    details: [
      "Developed lesson plans and worksheets, revised activities with teacher feedback, implemented lessons, and interviewed students and teachers.",
      "Developed and applied coding frameworks for written responses and drawings, examining students’ mental models of heart structure, circulation, and oxygenation and supporting inter-rater reliability analysis.",
      "Students earned 80–91% of available points on key post-instruction circulatory-process items. Difficulties with heart-chamber identification and sequencing informed recommendations for instructional refinement.",
      "A poster on this work has been accepted for the November 2026 AECT International Convention.",
    ],
    featured: true,
  },
  {
    title: "Embodied Computer Science Curriculum",
    period: "September 2026 — Present",
    description:
      "A four-lesson middle-school curriculum introducing transistors, binary representation, binary addition, and logic gates through hands-on activities and embodied learning.",
    role: "Research assistant · Indiana University Bloomington",
    status: "Curriculum developed · Pilot planned",
    tags: ["Computer science education", "Curriculum design", "Embodied learning"],
    details: [
      "Designed a scaffolded sequence connecting binary addition to logic-gate circuits through physical role-play and visual models, linking sum-and-carry reasoning to XOR and AND operations.",
      "A planned pilot will examine students’ engagement and interpretations of the concepts to guide iterative refinement.",
    ],
  },
  {
    title: "Learner Control over AI Hints in Mathematics",
    period: "September 2026 — Present",
    description:
      "A planned first-authored study of learner-controlled requests, shared-control recommendations, and system-controlled delivery of LLM-based hints in high school mathematics.",
    role: "Research assistant · Indiana University Bloomington; planned first-authored study",
    status: "Study design · Data collection planned for Spring 2027",
    tags: ["AI hints", "Monitoring accuracy", "Self-regulated learning"],
    details: [
      "The proposed learning-platform workflow includes metacognitive reflection prompts, confidence and help-need judgments, and AI-generated hints.",
      "The study will examine unassisted performance and whether the relative effects of shared and system control vary with baseline monitoring accuracy. Planned records include initial answers, hint interactions, revisions, and interviews.",
      "Before the main study, the design will be refined, necessary approvals obtained, and tasks, hints, monitoring measures, and platform usability piloted.",
      "Immediate and delayed assessments without AI will examine independent performance after support is removed.",
    ],
    featured: true,
  },
];

export const service = [
  {
    category: "GIST professional development",
    items: [
      "VP of GIST professional development sessions",
      "Invite speakers from research and industry and coordinate schedules, promotional materials, and session logistics.",
    ],
  },
  {
    category: "IST conference planning",
    items: [
      "Contribute to conference theme development and event preparation.",
      "Help create opportunities for scholarly exchange within the IST community.",
    ],
  },
];

export const searchIndex = [
  {
    title: "Candidate statement",
    description: profile.statement,
    href: "/statement",
    category: "Home",
    keywords: "candidate statement biography research identity equity diversity professional goals",
  },
  ...researchAreas.map((area) => ({
    title: area.title,
    description: area.description,
    href: "/#research",
    category: "Research",
    keywords: `${area.title} ${area.methods}`,
  })),
  ...publications.map((publication) => ({
    title: publication.title,
    description: `${publication.authors} ${publication.venue}, ${publication.year}.${publication.status ? ` ${publication.status}.` : ""}`,
    href: "/publications",
    category: "Publication",
    keywords: `${publication.tags.join(" ")} ${publication.type} ${publication.status ?? ""}`,
  })),
  ...projects.map((project) => ({
    title: project.title,
    description: project.description,
    href: "/projects",
    category: "Project",
    keywords: `${project.tags.join(" ")} ${project.status}`,
  })),
  {
    title: "Scholarly service",
    description: "GIST professional development sessions and IST conference planning.",
    href: "/#service",
    category: "Home",
    keywords: "service speakers conference community GIST IST",
  },
  {
    title: "Teaching",
    description: "An approach to teaching shaped by instructional design in Project Bio+CS; course details forthcoming.",
    href: "/#teaching",
    category: "Home",
    keywords: "teaching instruction prior knowledge guidance course",
  },
  {
    title: "Feedback",
    description: "Selected feedback will be shared when available.",
    href: "/#feedback",
    category: "Home",
    keywords: "feedback students collaborators colleagues",
  },
  {
    title: "Curriculum vitae",
    description: "Education, research experience, publications, fellowships, service, and skills.",
    href: "/cv",
    category: "CV",
    keywords: "cv resume education Columbia UCL experience awards fellowship skills languages",
  },
];
