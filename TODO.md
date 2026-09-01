# TODO

Backlog for the daily Claude Code routine. Work top to bottom, phase by phase. One item per run.
Check an item off (`[x]`) in the same PR that completes it. If an item needs a follow-up,
add it as a new unchecked line directly beneath it.

## Rules for the routine (do not delete)

- One item per run. Finish it completely; no half-built features.
- Never push to `main`. GitHub Pages deploys from `main`, so every change goes through a PR.
- Plain HTML/CSS/JS only. No npm, frameworks, bundlers, or build steps. Vanilla ES modules and modern CSS are fine.
- Match the existing design language (the white and green theme). Items in Phase 3 and later
  may add new sections and components, but should look like they belong on the same site.
- Every PR must keep the site working with JavaScript disabled for core content.
- Mobile first: check every change at 375px, 768px, and 1280px widths.
- If an item is unclear, make a sensible decision, do it, and explain the decision in the PR body.
  Only skip an item if it truly cannot be done from the repo alone; leave a one-line note under it.

## Phase 0: Audit (first run only)

- [ ] Read every file in the repo. Write `AUDIT.md` with: what the site currently contains
  (sections, links, images), a list of every concrete problem found (broken markup, accessibility,
  performance, SEO, mobile layout), and a recommended order for Phases 1 and 2 based on what is
  actually wrong. Add any new problems found as unchecked items in the right phase below. Do not
  change any site files in this run.

## Phase 1: Fix what is broken

- [ ] HTML validity: correct `<!DOCTYPE>`, `<html lang>`, exactly one `<h1>`, logical heading order,
  no unclosed or misnested tags, no duplicate `id`s
- [ ] Every `<img>` has meaningful `alt`, explicit `width` and `height`, and `loading="lazy"` if below the fold
- [ ] No broken internal or external links; `resume.pdf` opens in a new tab with `rel="noopener noreferrer"`
- [ ] Head is complete: `viewport`, `description`, `theme-color`, canonical URL pointing to the CNAME domain,
  `favicon.svg` via `<link rel="icon" type="image/svg+xml">`, plus a PNG fallback favicon and
  `apple-touch-icon` generated from the SVG
- [ ] Open Graph and Twitter Card tags all present and correct (`og:title`, `og:description`, `og:image`
  pointing to the absolute URL of `og-image.png`, `og:url`, `og:type`, `twitter:card=summary_large_image`)
- [ ] Fix any layout breakage at 375px width: overflow, text clipping, images escaping containers,
  tap targets under 44px
- [ ] Fix all typos, grammar slips, and inconsistent capitalization in visible text
- [ ] Remove dead CSS selectors and unused JS (verify each is unused before deleting)

## Phase 2: Performance, accessibility, SEO

- [ ] Compress and correctly size `photo.jpeg` (serve a WebP with JPEG fallback via `<picture>`);
  target under 150 KB
- [ ] Compress `og-image.png` to 1200x630 and under 300 KB
- [ ] Inline critical CSS for above-the-fold content, defer the rest; ensure fonts use `font-display: swap`
  and preconnect to any font host
- [ ] Full keyboard pass: everything reachable, visible focus styles, a "skip to content" link,
  correct landmark elements (`header`, `nav`, `main`, `footer`)
- [ ] WCAG AA contrast on all text and interactive elements against the green/white palette;
  adjust shades if needed while keeping the theme recognizable
- [ ] `aria-label` on every icon-only link; `prefers-reduced-motion` respected for all animations
- [ ] Add JSON-LD `Person` structured data (name, url, jobTitle, sameAs for every social link on the page)
- [ ] Add `robots.txt`, `sitemap.xml`, and a `humans.txt`
- [ ] Add a `404.html` styled to match the site
- [ ] Lighthouse-style self-check: document the before/after in the PR (page weight, request count,
  any remaining issues)

## Phase 3: Structure and content (major improvements)

- [ ] Restructure `index.html` into clear sections with anchor IDs: Hero, About, Experience, Projects,
  Skills, Contact. Keep all existing content; move it into the right section. Add a sticky top nav
  that links to each section and highlights the active one on scroll (JS optional, must degrade)
- [ ] Hero: strong one-line headline, one-sentence subhead, two CTAs (Resume, Contact). Use the
  existing photo. Make it look intentional at every breakpoint
- [ ] Experience section: a vertical timeline component built from a small JSON array in `script.js`
  (role, company, dates, 2-3 bullets). Populate from `resume.pdf` content if readable; otherwise
  leave clearly marked placeholder entries for me to fill in
- [ ] Projects section: a responsive card grid driven by a `projects.json` file (title, description,
  tech tags, links). Seed it with placeholder cards so I can fill in real ones
- [ ] Skills section: grouped tags (Languages, Frameworks, Tools) driven by data in `script.js`
- [ ] Contact section: email link, social icons (inline SVG, no icon fonts), and a copy-to-clipboard
  button for the email address
- [ ] Footer: last-updated date (single constant in `script.js`), copyright, link to the source repo

## Phase 4: Polish and features

- [ ] Dark/light mode toggle: respects `prefers-color-scheme`, remembers choice in `localStorage`,
  no flash of wrong theme on load. Design a dark variant of the green palette
- [ ] Subtle scroll-reveal animations for sections using `IntersectionObserver`, disabled under
  `prefers-reduced-motion`
- [ ] Print stylesheet so the page prints as a clean one-page bio
- [ ] Add a `/blog/` directory with an `index.html` listing and one sample post template, all static.
  Match the site design. Add the listing to the nav
- [ ] Add an RSS feed (`feed.xml`) for the blog, hand-maintained
- [ ] Add privacy-friendly analytics placeholder: a commented block in `index.html` explaining how to
  add Plausible or GoatCounter, without adding any tracking
- [ ] PWA basics: `manifest.webmanifest`, correct icons, `theme-color`. No service worker
- [ ] Add a `README.md` explaining the site structure, how to add a project, a job, or a blog post,
  and how the daily routine works

## Phase 5: Maintenance loop (only when everything above is checked)

Every run, pick whichever of these adds the most value today and describe why in the PR:

- [ ] Re-run the full Phase 1 and Phase 2 checklist against the current site and fix any regressions
- [ ] Review copy for clarity and tighten any section that reads as filler
- [ ] Check every external link still resolves
- [ ] Look for one small visual refinement (spacing, alignment, hierarchy) and propose it

## Parking lot (needs my decision first; do not start)

- Contact form (needs a form backend such as Formspree; I will decide)
- Custom domain email or newsletter signup
- Migrating to a static site generator (probably never; the point is simplicity)