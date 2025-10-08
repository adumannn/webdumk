# Portfolio Starter

A production-ready personal portfolio built with Next.js 14 App Router, TypeScript, Tailwind CSS, MDX, and next-themes. It includes MDX-powered blogging, project case studies, SEO fundamentals, RSS/sitemap/robots routes, and lightweight theming.

## Getting Started

```bash
npm install
npm run dev
```

Visit <http://localhost:3000> to explore the site locally.

### Available Scripts

- `npm run dev` – start the Next.js dev server
- `npm run build` – create a production build
- `npm run start` – serve the production build
- `npm run lint` – run ESLint using the Next.js config
- `npm run typecheck` – run TypeScript in strict, no-emit mode
- `npm run format` – format files with Prettier

Husky installs automatically through the `prepare` script. Pre-commit hooks run `lint-staged` to format and lint changed files.

## Project Structure

```
app/            # App Router pages and route handlers
components/     # Reusable UI primitives
content/        # MDX blog posts and optional project long-form content
data/           # Site metadata and project definitions
lib/            # MDX helpers, SEO, and utilities
public/         # SVG placeholders and resume instructions
styles/         # Tailwind prose overrides
```

## Customization

1. Update `/data/site.ts` with your name, role, location, email, socials, and résumé URL.
2. Edit `/data/projects.ts` to curate the projects shown on `/projects` and the homepage grid. Add or remove entries freely.
3. For long-form case studies, add MDX files to `content/projects/` matching the project slug (e.g., `project-one.mdx`).
4. Blog posts live in `content/blog/`. Each file must include frontmatter (`title`, `summary`, `date`, `tags`, `cover`, `draft`).
5. Replace the SVG placeholders in `/public/images/` or add new ones—stick to SVG/text assets only to avoid binary files.
6. Swap `/public/resume.pdf.txt` with deployment instructions for your actual résumé PDF; keep binaries out of version control.
7. Configure the canonical domain via `NEXT_PUBLIC_SITE_URL` in `.env.local` (see `env.example`).

### Styling & Theming

- Tailwind CSS powers the design system. Global tokens live in `app/globals.css` and can be adjusted for light/dark palettes.
- next-themes persists the chosen mode in `localStorage` and respects system preferences.
- Typography overrides live in `styles/prose.css`.

### SEO & Metadata

- `lib/seo.ts` centralizes default metadata and JSON-LD helpers.
- Route handlers generate `rss.xml`, `sitemap.xml`, and `robots.txt` with canonical URLs derived from `NEXT_PUBLIC_SITE_URL`.
- Blog posts and projects embed JSON-LD payloads for richer search snippets.

### MDX Enhancements

- `lib/mdx.ts` compiles MDX using `next-mdx-remote`, remark GFM, rehype slug/autolink, and syntax highlighting via `rehype-pretty-code`.
- A table of contents renders on larger screens for blog posts based on detected headings.

## Deployment

The project deploys seamlessly to [Vercel](https://vercel.com/):

1. Create a new Vercel project from this repository.
2. Set `NEXT_PUBLIC_SITE_URL` in Vercel Project Settings → Environment Variables.
3. Trigger a deployment; Vercel installs dependencies, runs the build, and hosts the app globally.

Alternatively, use `npm run build` and `npm run start` on your own infrastructure.

## Acceptance Checklist

- [ ] TypeScript strict passes with no errors (`npm run typecheck`)
- [ ] ESLint + Prettier clean; Husky + lint-staged active
- [ ] App routes render without runtime warnings
- [ ] Accessibility: focus rings, skip link, labels, and contrast verified in light/dark
- [ ] MDX supports code highlighting, tables, blockquotes, and images
- [ ] SEO metadata + OG/Twitter tags configured via Metadata API
- [ ] JSON-LD present on `/`, `/projects/[slug]`, and `/blog/[slug]`
- [ ] `/rss.xml`, `/sitemap.xml`, `/robots.txt` return valid responses
- [ ] `next/image` uses `sizes` + blur placeholders (SVG-based)
- [ ] Lighthouse mobile ≥ 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Theme persists via `next-themes`
- [ ] No `favicon.ico` or other binary assets committed
