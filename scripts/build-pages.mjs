import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const site = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
if (!["http:", "https:"].includes(site.protocol) || site.search || site.hash || site.username || site.password) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) site URL without credentials, query, or fragment.");
}
const basePath = site.pathname.replace(/\/+$/, "");
if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined && process.env.NEXT_PUBLIC_BASE_PATH !== basePath) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must match the path in NEXT_PUBLIC_SITE_URL.");
}
const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  NEXT_TELEMETRY_DISABLED: "1",
  NEXT_PUBLIC_SITE_URL: `${site.origin}${basePath}`,
  NEXT_PUBLIC_BASE_PATH: basePath,
};

console.log(`Building GitHub Pages site for ${env.NEXT_PUBLIC_SITE_URL}/`);
const build = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build", "--webpack"], {
  stdio: "inherit", env,
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);

writeFileSync(new URL("../out/.nojekyll", import.meta.url), "");
const check = spawnSync(process.execPath, [fileURLToPath(new URL("./check-pages.mjs", import.meta.url))], {
  stdio: "inherit", env,
});
if (check.error) throw check.error;
process.exit(check.status === 0 ? 0 : (check.status || 1));
