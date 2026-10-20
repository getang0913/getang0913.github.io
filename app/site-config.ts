// GitHub Actions supplies the final URL and optional repository subpath at build time.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// next/link handles basePath automatically; plain images and downloads need it explicitly.
export function publicAsset(path: string): string {
  return `${basePath}${path}`;
}
