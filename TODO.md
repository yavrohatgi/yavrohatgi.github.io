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

- [x] Read every file in the repo. Write `AUDIT.md` with: what the site currently contains
  (sections, links, images), a list of every concrete problem found (broken markup, accessibility,
  performance, SEO, mobile layout), and a recommended order for Phases 1 and 2 based on what is
  actually wrong. Add any new problems found as unchecked items in the right phase below. Do not
  change any site files in this run.
  — Done. See `AUDIT.md`. Phases 1 and 2 below have been **reordered** to match its recommendation,
  so "first unchecked item" now follows it. Newly found problems were added as items below and are
  cross-referenced to the numbered problems in `AUDIT.md`.

## Phase 1: Fix what is broken

- [x] Give `#typing-text` a static fallback so the hero sentence is complete before (and without)
  typed.js. Today it reads "…with a strong interest in |" whenever cdnjs is blocked or slow
  (AUDIT problem 1)
- [x] Add `rel="noopener noreferrer"` to the 8 `target="_blank"` links that lack it — both social
  groups, both Sonet.io links, both UMass directory links, UMass Engineering, Samsung
  (AUDIT problem 4)
- [x] ~~Put the experience timeline back in reverse-chronological order~~ — **withdrawn.**
  The audit was wrong: end dates run Current > Dec 2024 > Aug 2024 > Aug 2023, so the timeline is
  already sorted by end date, a normal convention for overlapping roles. Only the stale HTML
  comments ("Item 1 / Item 3 / Item 2") are out of order. No change made
- [x] Make each project card's title match its modal title — cards 1 and 2 disagree with
  `projectData`, so the heading changes when the card is opened (AUDIT problem 3)
- [x] Every `<img>` has meaningful `alt`, explicit `width` and `height`, and `loading="lazy"` if below the fold
  (AUDIT problems 21, 24)
- [x] Fix all typos, grammar slips, and inconsistent capitalization in visible text
  (AUDIT problems 5–10: "Samsung Data Systems" vs the résumé's "Samsung SDS"; "June 2025 – Current"
  vs the "Sept 2023 – Dec 2024" format used elsewhere; "Cloud development"; "Hugging Face Transformer";
  stray whitespace in list items; the undefined "PMS" acronym)
- [ ] Head is complete: `viewport`, `description`, `theme-color`, canonical URL pointing to the CNAME domain,
  `favicon.svg` via `<link rel="icon" type="image/svg+xml">`, plus a PNG fallback favicon and
  `apple-touch-icon` generated from the SVG
  — only the PNG fallback and `apple-touch-icon` are missing; everything else verified correct (AUDIT problem 29)
- [ ] HTML validity: correct `<!DOCTYPE>`, `<html lang>`, exactly one `<h1>`, logical heading order,
  no unclosed or misnested tags, no duplicate `id`s
  — verified clean in the audit; confirm and tick
- [ ] No broken internal or external links; `resume.pdf` opens in a new tab with `rel="noopener noreferrer"`
  — internal links and the résumé links verified correct. External links could **not** be checked:
  this session's egress policy returns 403 for every outbound host. Needs a run with network access
- [ ] Open Graph and Twitter Card tags all present and correct (`og:title`, `og:description`, `og:image`
  pointing to the absolute URL of `og-image.png`, `og:url`, `og:type`, `twitter:card=summary_large_image`)
  — verified complete and correct in the audit; confirm and tick
- [ ] Fix any layout breakage at 375px width: overflow, text clipping, images escaping containers,
  tap targets under 44px
  — no overflow at 375/768/1280 (measured). Only the tap targets are outstanding (AUDIT problem 19)
- [ ] Remove dead CSS selectors and unused JS (verify each is unused before deleting)
  — the audit found only two safe deletions: the overridden first `.loading-progress-bar` block and
  the unused getter branch of `store()`. The `is-*` and `modal-repo` classes are built by string
  concatenation in `script.js` and must **not** be removed (AUDIT problems 25, 26)

## Phase 2: Performance, accessibility, SEO

- [x] Add visible `:focus-visible` styles across the site. Right now the only `:focus` rule in
  `styles.css` is an `outline: none` on the form inputs and palette input, with no replacement —
  a WCAG 2.4.7 failure (AUDIT problem 12)
- [x] Make project cards and the back-to-top control keyboard-operable (they are `div`s with click
  handlers and `tabIndex -1`, so the eight project modals cannot be opened by keyboard at all);
  give the project modal `role="dialog"`, `aria-modal` and a focus trap; set the initial
  `aria-pressed` on the filter buttons (AUDIT problems 13, 14, 17, 18)
- [x] Full keyboard pass: everything reachable, visible focus styles, a "skip to content" link,
  correct landmark elements (`header`, `nav`, `main`, `footer`)
  — skip link added (verified as the first tab stop) and `<main>` wraps the content sections.
  `<nav>` and `<footer>` were already present; no separate `<header>` since the nav bar is the
  only masthead. Verified: focus trap holds, Escape restores focus to the opening card
- [x] WCAG AA contrast on all text and interactive elements against the green/white palette;
  adjust shades if needed while keeping the theme recognizable
  — light-theme `--primary` `#008d63` measures 4.03:1 on the page ground, 3.80:1 on cards and
  3.38:1 for `.tag`; all fail. About `#006e4c` passes everywhere at 6.03 / 5.69 / 4.94.
  Dark theme already passes (AUDIT problem 15)
- [ ] Fix tap targets under 44px at 375px: the menu button is 22×28, mobile nav links are 26px tall,
  the project "Code" link is 23px tall (AUDIT problem 19)
- [ ] Add JSON-LD `Person` structured data (name, url, jobTitle, sameAs for every social link on the page)
- [ ] Add `robots.txt`, `sitemap.xml`, and a `humans.txt`
- [ ] Add a `404.html` styled to match the site
- [ ] Replace the cdnjs typed.js dependency with a small hand-rolled loop in `script.js`, removing a
  third-party origin and the broken-sentence failure mode along with it (AUDIT problem 23)
- [ ] Inline critical CSS for above-the-fold content, defer the rest; ensure fonts use `font-display: swap`
  and preconnect to any font host
  — `preconnect` and `display=swap` are already in place; the render-blocking Google Fonts
  stylesheet is what remains (AUDIT problem 22)
- [ ] Compress and correctly size `photo.jpeg` (serve a WebP with JPEG fallback via `<picture>`);
  target under 150 KB
  — already 63 KB at 800×800, so the size target is met; only the `<picture>`/WebP part is outstanding
- [ ] Compress `og-image.png` to 1200x630 and under 300 KB
  — already 1200×630 and 46 KB; verify and tick
- [ ] `aria-label` on every icon-only link; `prefers-reduced-motion` respected for all animations
  — both verified correct in the audit; confirm and tick
- [ ] Lighthouse-style self-check: document the before/after in the PR (page weight, request count,
  any remaining issues)
  — baseline measured in `AUDIT.md`: 147.3 KB across 5 own requests, plus 2 third-party origins

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
  — **note from the Phase 0 audit:** a working Formspree form is already live in the Contact
  section (`https://formspree.io/f/xdkewlyw`, with a honeypot and JS status messages). This
  looks decided. Either drop this line or confirm the form is intended, so a later run doesn't
  treat it as unsanctioned. Left untouched for now.
- Custom domain email or newsletter signup
- Migrating to a static site generator (probably never; the point is simplicity)