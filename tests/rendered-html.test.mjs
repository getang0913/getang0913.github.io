import assert from "node:assert/strict";
import test from "node:test";

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

test("renders the academic portfolio home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Ge Tang — Academic Portfolio/);
  assert.match(html, /Candidate statement/);
  assert.match(html, /Three connected lines of inquiry/);
  assert.match(html, /Guidance that responds to learners/);
  assert.match(html, /Course and teaching experience details will be added here/);
  assert.match(html, /Selected feedback from students/);
  assert.match(html, /ge-tang.jpg/);
  assert.match(html, /getang@iu.edu/);
  assert.doesNotMatch(html, /Your Name|Your University|First draft|Draft placeholder/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
  assert.doesNotMatch(html, /\b(?:\d{3}[-.\s]){2}\d{4}\b/);
});

test("renders all standalone academic pages", async () => {
  for (const [pathname, marker] of [
    ["/publications", "Publications"],
    ["/projects", "Research in practice"],
    ["/cv", "Education and scholarly work"],
    ["/statement", "Professional Goals"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(marker));
  }
});

// Preserve distinctions between completed work and planned research when content changes.
test("retains publication and study status and offers the public CV", async () => {
  const publicationHtml = await (await render("/publications")).text();
  assert.match(publicationHtml, /Accepted/);
  assert.match(publicationHtml, /November 3–7, 2026/);
  const projectHtml = await (await render("/projects")).text();
  assert.match(projectHtml, /Data collection planned for Spring 2027/);
  const cvHtml = await (await render("/cv")).text();
  assert.match(cvHtml, /href="\/ge-tang-cv.pdf"/);
  assert.doesNotMatch(cvHtml, /PDF coming soon|20XX/);
  const statementHtml = await (await render("/statement")).text();
  assert.match(statementHtml, /Commitment to Equity and Diversity/);
  assert.match(statementHtml, /10.1007\/s10648-010-9127-6/);
});
