import type { Metadata } from "next";
import { siteUrl } from "./site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ge Tang — Academic Portfolio",
    template: "%s — Ge Tang",
  },
  description:
    "Ge Tang is a doctoral student in Instructional Systems Technology at Indiana University Bloomington studying AI-supported learning, self-regulation, and help seeking.",
  metadataBase: new URL(`${siteUrl}/`),
  openGraph: {
    title: "Ge Tang — Academic Portfolio",
    description:
      "AI-supported learning, self-regulated learning, and instructional design at Indiana University Bloomington.",
    type: "website",
    images: [{ url: `${siteUrl}/ge-tang.jpg`, width: 960, height: 1456, alt: "Portrait of Ge Tang" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ge Tang — Academic Portfolio",
    description: "AI-supported learning · Self-regulation · Instructional design",
    images: [`${siteUrl}/ge-tang.jpg`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const saved=localStorage.getItem('theme');const dark=saved?saved==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=dark?'dark':'light'}catch(_){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
