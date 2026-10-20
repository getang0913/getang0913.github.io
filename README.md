# Ge Tang Academic Portfolio

A multi-page academic website for Ge Tang, a doctoral student in Instructional Systems Technology at Indiana University Bloomington.

## Content

- `app/content.ts`: profile, homepage statement summary, research directions, publications, projects, service, and site search.
- `app/statement-content.ts`: the complete candidate statement and references, transcribed from the supplied Word document.
- `app/cv/page.tsx`: education, research experience, publications, fellowships, service, and skills.
- `app/page.tsx`: homepage sections, including teaching and feedback areas retained for future additions.

The website remains in English, matching the supplied materials and existing design. Planned studies and accepted presentations retain their status. Teaching course details, quotations, and social profile URLs can be added when supplied; the current website shows neutral forthcoming notices.

## Public assets

- `public/ge-tang.jpg`: supplied portrait.
- `public/ge-tang-cv.pdf`: two-page CV converted from the supplied resume with the phone number removed. The school email is retained.

The original Word documents remain unchanged in the project root and are not served as public downloads. Regenerate the PDF after future CV revisions.

## GitHub Pages

See [the step-by-step Chinese publishing guide](DEPLOY_GITHUB_PAGES.zh-CN.md). The repository includes `.github/workflows/deploy-pages.yml`, which builds a static export with `pnpm build:pages`, validates it, and deploys `out/` using GitHub Pages. It reads the final website URL and repository subpath automatically from GitHub.

The original Vinext local development and Worker build remain available. The Pages build uses the installed Next.js compiler and `tsconfig.pages.json` to export only the website.

## Local development

Requirements: Node.js 22.13 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification

```bash
pnpm test
```

This builds the Worker version and runs rendered-page checks for all five routes, publication and study statuses, the portrait, and the CV link.

```bash
pnpm build:pages
```

This exports the static Pages version and checks all five routes, local assets, internal page links, the CV download, and sharing metadata. Set `NEXT_PUBLIC_SITE_URL` to the complete public URL when building manually; `NEXT_PUBLIC_BASE_PATH`, if provided, must match its path. The GitHub workflow sets both automatically.

No GitHub repository or live Pages deployment has been created yet.
