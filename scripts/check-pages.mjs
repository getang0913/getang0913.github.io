import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outputDirectory = path.resolve(fileURLToPath(new URL("../out/", import.meta.url)));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

assert.ok(
  basePath === "" || (/^\/(?:[A-Za-z0-9._-]+\/)*[A-Za-z0-9._-]+$/.test(basePath) && !basePath.split("/").some((part) => part === "." || part === "..")),
  "NEXT_PUBLIC_BASE_PATH must be empty or a path such as /portfolio, without a trailing slash.",
);

const siteUrl = new URL(configuredSiteUrl ?? `https://pages.example${basePath}`);
assert.ok(["http:", "https:"].includes(siteUrl.protocol), "NEXT_PUBLIC_SITE_URL must be an HTTP(S) URL.");
assert.equal(siteUrl.pathname.replace(/\/+$/, ""), basePath, "The path in NEXT_PUBLIC_SITE_URL must match NEXT_PUBLIC_BASE_PATH.");
assert.ok(!siteUrl.search && !siteUrl.hash, "NEXT_PUBLIC_SITE_URL must not contain a query or fragment.");

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, name) => {
    if (name.startsWith("#")) {
      const codePoint = name[1]?.toLowerCase() === "x" ? Number.parseInt(name.slice(2), 16) : Number.parseInt(name.slice(1), 10);
      return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : entity;
    }
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[name.toLowerCase()] ?? entity;
  });
}

// Exclude Next's serialized component data so checks inspect rendered markup.
function renderedMarkup(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|template)\b([^>]*)>[\s\S]*?<\/\1\s*>/gi, "<$1$2></$1>");
}

function visibleText(markup) {
  return decodeEntities(markup.replace(/<head\b[^>]*>[\s\S]*?<\/head\s*>/gi, "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function elements(markup, wantedTag) {
  const found = [];
  for (const match of markup.matchAll(/<([A-Za-z][\w:-]*)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/g)) {
    const tag = match[1].toLowerCase();
    if (wantedTag && tag !== wantedTag) continue;
    const attributes = {};
    for (const attribute of match[2].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
      attributes[attribute[1].toLowerCase()] = decodeEntities(attribute[2] ?? attribute[3] ?? attribute[4] ?? "");
    }
    found.push({ tag, attributes });
  }
  return found;
}

function localUrl(value, route) {
  if (!value || value.startsWith("#")) return null;
  const url = new URL(value, `${siteUrl.origin}${basePath}${route}`);
  return url.origin === siteUrl.origin && ["http:", "https:"].includes(url.protocol) ? url : null;
}

async function outputFile(url, context) {
  const pathname = decodeURIComponent(url.pathname);
  assert.ok(pathname.startsWith(`${basePath}/`), `${context}: ${url.pathname} is missing the ${basePath || "/"} site prefix.`);
  const relative = pathname.slice(basePath.length + 1);
  const target = path.resolve(outputDirectory, relative);
  assert.ok(target.startsWith(`${outputDirectory}${path.sep}`), `${context}: resource escapes the export directory.`);
  let info;
  try {
    info = await stat(target);
  } catch {
    assert.fail(`${context}: exported resource is missing: ${relative}`);
  }
  assert.ok(info.isFile() && info.size > 0, `${context}: exported resource is empty or is not a file: ${relative}`);
}

const pages = [
  { route: "/", file: "index.html", markers: [/Ge Tang/, /Three connected lines of inquiry/, /Candidate statement/] },
  { route: "/cv/", file: "cv/index.html", markers: [/Education and scholarly work/, /Download CV \(PDF\)/, /Indiana University Bloomington/] },
  { route: "/publications/", file: "publications/index.html", markers: [/Publications/, /A systematic review of language educators/, /Helpful or Harmful\?/] },
  { route: "/projects/", file: "projects/index.html", markers: [/Research in practice/, /Embodied Learning of the Human Circulatory System/, /Learner Control over AI Hints in Mathematics/] },
  { route: "/statement/", file: "statement/index.html", markers: [/Candidate statement/i, /Professional Goals/, /Commitment to Equity and Diversity/, /References/] },
];

const renderedPages = new Map();
let checkedResources = 0;
for (const page of pages) {
  let html;
  try {
    html = await readFile(path.join(outputDirectory, page.file), "utf8");
  } catch {
    assert.fail(`Missing ${page.file}. Run the GitHub Pages export before this check.`);
  }
  const markup = renderedMarkup(html);
  const text = visibleText(markup);
  assert.match(markup, /<main\b/i, `${page.file} must contain rendered page content.`);
  for (const marker of page.markers) assert.match(text, marker, `${page.file} is missing expected visible content: ${marker}`);
  assert.doesNotMatch(text, /Your Name|Your University|First draft|Draft placeholder|PDF coming soon|20XX/, `${page.file} contains private information or old placeholders.`);
  assert.doesNotMatch(text, /\b(?:\d{3}[-.\s]){2}\d{4}\b/, `${page.file} contains a phone number.`);
  renderedPages.set(page.route, markup);

  for (const { tag, attributes } of elements(markup)) {
    for (const attribute of ["src", "href"]) {
      const value = attributes[attribute];
      const url = localUrl(value, page.route);
      if (!url) continue;
      if (/(?:^|\/)\_next\//.test(url.pathname) || /\/(?:ge-tang\.jpg|[^/]+\.pdf)$/i.test(url.pathname)) {
        await outputFile(url, `${page.file} <${tag} ${attribute}>`);
        checkedResources += 1;
      }
      if (tag === "a" && attribute === "href" && !path.posix.extname(url.pathname)) {
        const pathname = url.pathname.replace(/\/+$/, "");
        const expectedRoutes = pages.map(({ route }) => `${basePath}${route}`.replace(/\/+$/, ""));
        assert.ok(expectedRoutes.includes(pathname), `${page.file} has an unexported or incorrectly prefixed page link: ${value}`);
      }
    }
  }

  const metadata = elements(markup, "meta");
  for (const key of ["og:image", "twitter:image"]) {
    const value = metadata.find(({ attributes }) => (attributes.property ?? attributes.name) === key)?.attributes.content;
    assert.ok(value, `${page.file} is missing ${key}.`);
    assert.match(value, /^https?:\/\//, `${page.file} ${key} must be an absolute URL.`);
    const image = new URL(value);
    assert.equal(image.pathname, `${basePath}/ge-tang.jpg`, `${page.file} ${key} must include the configured site path.`);
    if (configuredSiteUrl) assert.equal(value, `${configuredSiteUrl}/ge-tang.jpg`, `${page.file} ${key} does not use NEXT_PUBLIC_SITE_URL.`);
    await outputFile(image, `${page.file} ${key}`);
  }
}

const portrait = elements(renderedPages.get("/"), "img").find(({ attributes }) => attributes.alt === "Portrait of Ge Tang");
assert.equal(portrait?.attributes.src, `${basePath}/ge-tang.jpg`, "The home portrait must use the configured site prefix.");
assert.ok(elements(renderedPages.get("/"), "a").some(({ attributes }) => attributes.href === "mailto:getang@iu.edu"), "The home page must provide the university email as a mailto link.");
const cvDownload = elements(renderedPages.get("/cv/"), "a").find(({ attributes }) => "download" in attributes);
assert.equal(cvDownload?.attributes.href, `${basePath}/ge-tang-cv.pdf`, "The CV download must use the configured site prefix.");

const publicationArticles = [...renderedPages.get("/publications/").matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi)].map((match) => visibleText(match[1]));
assert.ok(publicationArticles.some((text) => /AECT/.test(text) && /Accepted/.test(text) && /November 3–7, 2026/.test(text)), "The AECT poster must visibly remain accepted for November 2026.");
assert.match(visibleText(renderedPages.get("/projects/")), /Data collection planned for Spring 2027/, "The mathematics study must visibly retain its planned data collection status.");

async function scanExport(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    const relative = path.relative(outputDirectory, target);
    assert.ok(!entry.isSymbolicLink(), `The export contains a symbolic link: ${relative}`);
    assert.ok(!/\.(?:docx?|odt)$/i.test(entry.name) && !/^(?:tmp|temp|\.git|\.env(?:\..*)?)$/i.test(entry.name), `Private or temporary material appears in the export: ${relative}`);
    if (entry.isDirectory()) await scanExport(target);
  }
}

await scanExport(outputDirectory);
console.log(`GitHub Pages export passed: ${pages.length} rendered pages, ${checkedResources} local resource references, portrait, public CV, sharing metadata, and publication/study status.`);
