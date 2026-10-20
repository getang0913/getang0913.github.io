import type { NextConfig } from "next";

const pagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = pagesBuild
  ? {
      output: "export",
      trailingSlash: true,
      basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
      typescript: { tsconfigPath: "tsconfig.pages.json" },
    }
  : {};

export default nextConfig;
