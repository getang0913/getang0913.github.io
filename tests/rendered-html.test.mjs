import assert from "node:assert/strict";
import test from "node:test";

const navigationItems = [
  ["Candidate statement", "/statement"],
  ["Research", "/research"],
  ["Teaching", "/teaching"],
  ["Service", "/service"],
  ["Feedback", "/feedback"],
  ["Publications", "/publications"],
  ["Projects", "/projects"],
  ["CV", "/cv"],
];

function renderedMarkup(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|template)\b([^>]*)>[\s\S]*?<\/\1\s*>/gi, "<$1$2></$1>");
}

function visibleText(markup) {
  return markup.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function assertNavigation(markup, pathname) {
  const header = markup.match(/<header\b[^>]*>[\s\S]*?<\/header>/i)?.[0];
  const navigation = header?.match(/<nav\b[^>]*\bid="primary-navigation"[^>]*>([\s\S]*?)<\/nav>/i)?.[1];
  assert.ok(navigation, `${pathname} must render the primary header navigation.`);
  const links = [...navigation.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
    label: visibleText(match[2]),
    href: match[1].match(/\bhref="([^"]*)"/i)?.[1]?.replace(/\/+$/, ""),
  }));
  assert.equal(links.length, navigationItems.length, `${pathname} must provide all eight navigation links.`);
  for (const [label, href] of navigationItems) {
    assert.equal(links.find((link) => link.label === label)?.href, href, `${pathname}: ${label} must link to its independent page.`);
  }
  assert.doesNotMatch(markup, /\bhref="\/?#(?:research|teaching|service|feedback|statement)"/i, `${pathname} must not link to the removed homepage sections.`);
}

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders only the profile hero on the academic portfolio home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = renderedMarkup(await response.text());
  assert.match(html, /Ge Tang — Academic Portfolio/);
  assertNavigation(html, "/");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert.ok(main);
  assert.match(visibleText(main), /Ph\.D\. Student/);
  assert.match(visibleText(main), /I design and study AI-supported learning environments/);
  const sections = [...main.matchAll(/<section\b([^>]*)>/gi)];
  assert.equal(sections.length, 1, "The homepage must contain only the profile hero section.");
  assert.match(sections[0][1], /\bclass="[^"]*\bhero\b/);
  assert.match(sections[0][1], /\bid="home"/);
  assert.doesNotMatch(main, /research-card|featured-work|statement-columns|service-grid|project-strip|closing-cta/);
  assert.doesNotMatch(visibleText(main), /Three connected lines of inquiry|Monitoring and help seeking|A systematic review of language educators|Helpful or Harmful\?|Course and teaching experience details will be added here|Selected feedback from students|Contributing to the IST community|Designing AI support for understanding and independent learning/);
  assert.match(html, /ge-tang.jpg/);
  assert.match(html, /href="mailto:getang@iu\.edu"/);
  assert.doesNotMatch(html, /Your Name|Your University|First draft|Draft placeholder/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
  assert.doesNotMatch(html, /\b(?:\d{3}[-.\s]){2}\d{4}\b/);
});

test("renders all standalone academic pages", async () => {
  for (const [pathname, markers] of [
    ["/research", [/Three connected lines of inquiry/, /Monitoring and help seeking/, /Control over AI assistance/, /Independent learning outcomes/, /A systematic review of language educators/]],
    ["/teaching", [/Teaching Assistant for EDUC-R521: Fall 2026/]],
    ["/service", [/Contributing to the IST community/, /GIST professional development/, /IST conference planning/]],
    ["/feedback", [/Perspectives on working and learning together/, /Selected feedback from students, collaborators, and colleagues will be shared here when available/]],
    ["/publications", [/Publications/, /A systematic review of language educators/, /Helpful or Harmful\?/]],
    ["/projects", [/Research in practice/, /Embodied Learning of the Human Circulatory System/, /Learner Control over AI Hints in Mathematics/]],
    ["/cv", [/Education and scholarly work/, /Download CV \(PDF\)/, /Indiana University Bloomington/]],
    ["/statement", [/Professional Goals/, /Commitment to Equity and Diversity/, /References/]],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = renderedMarkup(await response.text());
    assertNavigation(html, pathname);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert.ok(main, `${pathname} must render its page content.`);
    for (const marker of markers) assert.match(visibleText(main), marker, `${pathname} is missing expected visible content: ${marker}`);
    if (pathname === "/teaching") {
      assert.doesNotMatch(visibleText(main), /Guidance that responds to learners|Project Bio\+CS|Course and teaching experience details will be added here/, "The teaching page must omit its old philosophy and forthcoming-course text.");
    }
  }
});

// Preserve distinctions between completed work and planned research when content changes.
test("retains publication and study status and offers the public CV", async () => {
  const publicationHtml = renderedMarkup(await (await render("/publications")).text());
  assert.match(publicationHtml, /Accepted/);
  assert.match(publicationHtml, /November 3–7, 2026/);
  const projectHtml = renderedMarkup(await (await render("/projects")).text());
  assert.match(projectHtml, /Data collection planned for Spring 2027/);
  const cvHtml = renderedMarkup(await (await render("/cv")).text());
  assert.match(cvHtml, /href="\/ge-tang-cv.pdf"/);
  assert.doesNotMatch(cvHtml, /PDF coming soon|20XX/);
  const statementHtml = renderedMarkup(await (await render("/statement")).text());
  assert.match(statementHtml, /Commitment to Equity and Diversity/);
  assert.match(statementHtml, /10.1007\/s10648-010-9127-6/);
});
