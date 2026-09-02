# Site audit

Written for Phase 0 of `TODO.md`. Records what the site is today, every concrete problem
found, and a recommended order for Phases 1 and 2. No site files were changed in this run.

- **Audited commit:** `c622044`
- **Date:** 2026-09-02
- **Method:** read every file in the repo; static analysis of markup/CSS/JS; rendered
  `index.html` in headless Chromium at 375, 768 and 1280 px; measured layout overflow,
  tap-target sizes, focus rules, landmarks and WCAG contrast ratios from computed styles.

---

## 1. What the site currently contains

A single-page portfolio, no build step, deployed by GitHub Pages from `main` to the custom
domain in `CNAME` (`yavrohatgi.me`).

### Files

| File | Size | Notes |
| --- | ---: | --- |
| `index.html` | 32.6 KB | The whole page. Includes an inline SVG icon sprite (9 symbols) |
| `styles.css` | 31.4 KB | Design system, both themes, all components |
| `script.js` | 19.5 KB | `projectData` array (8 projects) + one `DOMContentLoaded` block |
| `photo.jpeg` | 63.4 KB | 800×800 portrait |
| `og-image.png` | 46.0 KB | 1200×630 social card |
| `resume.pdf` | 110.4 KB | Linked from nav, hero and command palette |
| `favicon.svg` | 0.5 KB | Pine tile, lime "YR" |
| `CNAME` | — | `yavrohatgi.me` |
| `LICENSE`, `.gitignore`, `TODO.md` | — | |

### Sections, in DOM order

1. Loading overlay (`#loadingScreen`), scroll-progress bar, fixed navbar
2. **Hero** — `<section class="hero" id="about">`: eyebrow, `<h1>`, typed line, two CTAs,
   three social links, portrait
3. **Experience** — `#experience`, four timeline cards
4. **Projects** — `#projects`, five filter buttons, eight cards
5. **Project modal** — `#projectModal`, filled from `projectData`
6. **Skills** — `#skills`, six categories of static tags
7. **Contact** — `#contact`, social links plus a Formspree form
8. **Footer** — one hardcoded copyright line
9. Back-to-top control, command palette (`⌘K`)

### Links

- **Internal:** `#about`, `#experience`, `#projects`, `#skills`, `#contact`, `/resume.pdf`
  (3 places), `href="#"` on the logo. All anchor targets exist; no broken internal links.
- **External:** `sonet.io` (×2), `umass.edu/engineering` (×3), `samsungsds.com`,
  `github.com/yavrohatgi`, `github.com/yavrohatgi/SignSpeak`,
  `linkedin.com/in/yav-rohatgi`, `mailto:yavrohatgi03@gmail.com`, plus `formspree.io`
  as the form action.
- **Third-party runtime deps:** Google Fonts (Poppins, Space Grotesk) and typed.js 2.0.12
  from cdnjs.

### Images

One `<img>` on the page (`photo.jpeg`). Everything else is inline SVG.

---

## 2. Problems found

Severity: **A** = breaks or blocks something for real users · **B** = clear defect, low risk
· **C** = polish.

### Correctness and content

| # | Sev | Problem | Evidence |
| --- | --- | --- | --- |
| 1 | A | **The hero sentence dangles if typed.js fails.** `#typing-text` is empty in the HTML and only ever filled by the cdnjs script. When cdnjs is blocked or slow, the hero reads "…with a strong interest in \|" — a broken sentence in the most prominent copy on the site. Reproduced: typed.js failed to load in the audit render and the headline was left mid-sentence at all three widths. | `index.html:162`, `script.js:184`; screenshot at 375/1280 |
| 2 | B | **The experience timeline is not in chronological order.** DOM order is Software Engineer (Jun 2025–), UTA (Sept 2023–Dec 2024), SWE Intern (May 2024–Aug 2024), Samsung (May 2023–Aug 2023). The UTA card sits above an internship that started eight months later. The HTML comments even read "Item 1 / Item 3 / Item 2 / Item 4", so this looks like an accidental reorder. | `index.html:197-296` |
| 3 | B | **Project card titles disagree with their own modal titles.** Card 1 reads "Sign Language Detection Gloves", its modal reads "Sign Detection Gloves". Card 2 reads "LLM-Based Math Tutoring System", its modal reads "AI Assisted Approach to Math Tutoring". Clicking a card changes the title. | `index.html:321,346` vs `script.js:5,25` |
| 4 | B | **8 `target="_blank"` links have no `rel="noopener noreferrer"`.** Both social-link groups, both Sonet.io links, both UMass directory links, the UMass Engineering link, and the Samsung link. (The three `resume.pdf` links are already correct.) | `index.html:172,175,204,229,255,280,324,348,581,584` |
| 5 | C | Employer name disagrees with the résumé: site says "Samsung Data Systems", `resume.pdf` says "Samsung SDS". | `index.html:280` |
| 6 | C | Date-format drift: "June 2025 – Current" against "Sept 2023 – Dec 2024" / "May 2024 – Aug 2024" elsewhere. The résumé uses "Jun 2025 – Present". | `index.html:207` |
| 7 | C | Inconsistent capitalisation in skills headings: "Cloud development" among "Languages", "Frameworks & Libraries", "Technologies & Tools", "Hardware", "Certifications". | `index.html:532` |
| 8 | C | "Hugging Face Transformer" should be "Hugging Face Transformers". | `index.html:516` |
| 9 | C | Stray leading/trailing whitespace inside several `<li>` and `<div class="card-date">` values. | `index.html:207,215-217,266-268` |
| 10 | C | "80% accuracy on PMS workflows" uses an undefined acronym in visitor-facing copy. | `index.html:215` |
| 11 | C | Footer copyright year is hardcoded to 2025. | `index.html:619` |

### Accessibility

| # | Sev | Problem | Evidence |
| --- | --- | --- | --- |
| 12 | A | **The only `:focus` rule in the entire stylesheet removes the focus outline.** `.form-input:focus, .form-textarea:focus { outline: none }` and `.palette-field input { outline: none }`. There is no `:focus-visible` style anywhere, so the three form fields and the palette input have no visible focus indicator at all. A stylesheet scan at runtime found exactly **1** rule matching `:focus`. WCAG 2.4.7 failure. | `styles.css:1270-1274,1639-1647` |
| 13 | A | **Project details are unreachable by keyboard.** `.project-card` is a `<div>` with a click handler: measured `tabIndex = -1`, no `role`, no key handling. "View details" is a `<span>`, not a button. A keyboard or screen-reader user cannot open any of the eight project modals. | `index.html:319`, `script.js:284-290` |
| 14 | A | **Back-to-top is unreachable by keyboard.** `#backToTop` is a `<div>`: measured `tabIndex = -1`, no `aria-label`, no `role`. | `index.html:625`, `script.js:474` |
| 15 | A | **Light-theme `--primary` fails WCAG AA.** Measured from computed styles: `#008d63` on the `#fafafa` page ground = **4.03:1**; on the `#f2f4f0` card surface = **3.80:1**; `.tag` text on its own tinted pill = **3.38:1**. All below the 4.5:1 needed for normal text. This colour carries `.eyebrow`, `.card-subtitle` links, `.tag`, `.project-details-btn`, `.modal-section h4` and `.skill-item:hover`. Dropping the light-theme `--primary` to about `#006e4c` gives 6.03 / 5.69 / 4.94 — all pass, and the hue barely moves. Dark theme is fine (`#00b47f` = 6.66:1 / 5.96:1; accent lime = 13.71:1). | computed-style measurement |
| 16 | B | **No `<main>` and no `<header>` landmark**, and no skip link. Measured landmark counts: `header 0, nav 1, main 0, footer 1`. | `index.html` |
| 17 | B | **The project modal is not announced as a dialog.** `#projectModal` has no `role="dialog"`, no `aria-modal`, and focus is not trapped — Tab walks straight out into the page behind it. (The command palette does this correctly.) | `index.html:473`, `script.js:235-282` |
| 18 | B | Filter buttons ship with no initial `aria-pressed`; the attribute is only added on first click, so "All" starts visually active but semantically unset. Measured initial state: `[null, null, null, null, null]`. | `index.html:310-314`, `script.js:211-226` |
| 19 | B | Tap targets under 44 px at 375 px: the open-menu button is 22×28, and the six links inside the mobile nav dropdown are 26 px tall. The "Code" link on project cards is 23 px tall. | measured at 375 px |
| 20 | C | `.card-date` is a bare `<div>`; dates would be better as `<time datetime>`. | `index.html:207` |

### Performance

| # | Sev | Problem | Evidence |
| --- | --- | --- | --- |
| 21 | B | **The one `<img>` has no `width`/`height`**, so the portrait contributes layout shift before CSS applies its aspect ratio. It also has no `loading`/`decoding` hints, and no WebP alternative. | `index.html:183` |
| 22 | B | **A render-blocking third-party stylesheet.** The Google Fonts `<link>` is in the critical path; the site cannot paint text until it resolves. `preconnect` is already present, and the URL already carries `display=swap`. | `index.html:40-45` |
| 23 | B | **typed.js (cdnjs) is a whole network dependency for one decorative effect** — and, per problem 1, a broken sentence when it fails. It is ~10 KB over an extra DNS+TLS handshake to a third origin. Hand-rolling the loop in `script.js` removes the request and the failure mode together. | `index.html:51` |
| 24 | C | `alt="Yav Rohatgi"` on the portrait duplicates the adjacent `<h1>`. | `index.html:183` |
| 25 | C | Dead CSS: the first `.loading-progress-bar` block (`width: 0%; transition: width .3s`) is fully overridden 7 lines later by the indeterminate-sweep block. | `styles.css:387-402` |
| 26 | C | `store()` in `script.js` has a getter branch (`value === undefined`) that is never called — the theme is read by the inline script in `index.html` instead. | `script.js:121-128` |

**Measured page weight (own assets):** 147.3 KB across 5 requests — `index.html` 32.6, `styles.css` 31.4, `script.js` 19.5, `photo.jpeg` 63.4, `favicon.svg` 0.5. Plus 2 third-party origins (Google Fonts CSS + font files, typed.js), which realistically adds 4–8 more requests and roughly 50–90 KB. `og-image.png` is fetched only by crawlers.

### SEO and metadata

| # | Sev | Problem | Evidence |
| --- | --- | --- | --- |
| 27 | B | No `robots.txt`, no `sitemap.xml`, no `humans.txt`, no `404.html`. | repo listing |
| 28 | B | No JSON-LD `Person` structured data. | `index.html` |
| 29 | C | No PNG fallback favicon and no `apple-touch-icon` — only `favicon.svg`. | `index.html:37` |

### Already correct — do not "fix" these

Verified so a later run doesn't spend a day on them or break something live:

- `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset>`, `<meta name="viewport">`.
- **Exactly one `<h1>`**, and heading order is logical throughout (h1 → h2 → h3, no skips).
- **No duplicate `id`s**; every in-page anchor target exists.
- **No horizontal overflow at 375, 768 or 1280 px** — measured `scrollWidth == clientWidth`
  at all three, and zero elements escaping the viewport edges.
- Open Graph and Twitter Card tags are **complete and correct**, including an absolute
  `og:image` URL, `og:image:width/height`, `og:image:alt` and `twitter:card=summary_large_image`.
- Canonical URL, `description`, and light/dark `theme-color` are all present and correct.
- `og-image.png` is **already 1200×630 and 46 KB** (Phase 2 target: under 300 KB — met).
- `photo.jpeg` is **already 63 KB** (Phase 2 target: under 150 KB — met at the current
  800×800; only the `<picture>`/WebP part of that item is outstanding).
- All three `resume.pdf` links already use `target="_blank" rel="noopener noreferrer"`.
- `prefers-reduced-motion` is already handled, twice, including a specific override that
  reveals `[data-aos]` content outright rather than leaving it stuck at `opacity: 0`.
- The site degrades correctly with JavaScript off: the loader is hidden by a `<noscript>`
  rule and the reveal-on-scroll styles are gated behind a `.reveal-ready` class that only
  JS adds, so content is never left invisible.
- **No dead CSS classes.** `is-active`, `is-pending`, `is-success`, `is-error` and
  `modal-repo` do not appear literally in the HTML but are all built by string
  concatenation in `script.js` — they are live. Only problem 25 is genuinely dead.

### Could not verify from this environment

- **External link liveness.** The session's egress policy answered `403` to `CONNECT` for
  every outbound host tried (`www.sonet.io`, `www.umass.edu`, `www.samsungsds.com`,
  `www.linkedin.com`, `github.com`, `cdnjs.cloudflare.com`, `fonts.googleapis.com`,
  `yavrohatgi.me`). Nothing about the links themselves is known to be wrong — they simply
  could not be checked here. The Phase 5 "check every external link still resolves" item
  needs a run with wider network access, or a manual pass.
- Because Google Fonts was blocked, the breakpoint render used fallback system fonts.
  The overflow result (none) is reassuring but text widths could differ slightly with
  Poppins and Space Grotesk loaded.

### One thing that needs your decision

`TODO.md`'s parking lot lists *"Contact form (needs a form backend such as Formspree; I will
decide)"* — but a working Formspree form is **already live** in the Contact section, posting
to `https://formspree.io/f/xdkewlyw`, with a honeypot field and JS-driven status messages.
The decision appears to have already been made. Worth either removing that parking-lot line
or noting that the form is deliberate, so a future run doesn't treat it as unsanctioned.

---

## 3. Recommended order

The default `TODO.md` order is reasonable but front-loads items that are already done. The
ordering below leads with the things that actually block a user, then the things that are
merely wrong. **Phase 1 and Phase 2 in `TODO.md` have been reordered to match this**, so the
routine's "first unchecked item" rule follows the recommendation without further thought.

### Phase 1 — in this order

1. **Static fallback for the typed headline** (problem 1). A visitor can land on a broken
   sentence today. Highest user-visible impact of anything in Phase 1, and it is a two-line fix.
2. **`rel="noopener noreferrer"` on the 8 bare `target="_blank"` links** (4). Mechanical,
   zero risk, closes the only security-flavoured item in the list.
3. **Timeline order + card/modal title mismatches** (2, 3). Both are content correctness and
   both are noticeable to anyone actually reading the page.
4. **Image attributes** (21). `width`/`height` on the portrait; kills the layout shift.
5. **Copy pass** (5–10, 24). Cheap, and worth doing in one sweep rather than piecemeal.
6. **Verify-and-check HTML validity, head completeness, OG tags, broken links, 375 px
   layout.** These are already in good shape (see "Already correct"); each needs a
   confirmation pass and a tick, not a rewrite — except the icon fallbacks (29), which are
   the only real work left in the head item.
7. **Dead code removal** (25, 26). Last, because it is the least valuable and the easiest to
   get wrong; the audit above already establishes exactly which two things are safe to delete.

### Phase 2 — in this order

1. **Visible focus styles** (12). Nothing else in Phase 2 matters if a keyboard user cannot
   see where they are. This is a genuine WCAG failure caused by an `outline: none` with no
   replacement.
2. **Keyboard reachability** (13, 14, 17, 18) — project cards, back-to-top, modal semantics
   and focus trap, initial `aria-pressed`. This is the bulk of the "full keyboard pass" item
   and it is where the real bugs are.
3. **Landmarks and skip link** (16). Small, and it completes the keyboard item.
4. **Contrast** (15). One token change plus a re-measure across both themes.
5. **Tap targets at 375 px** (19). Finishes the mobile part of Phase 1's layout item.
6. **JSON-LD `Person`** (28) and **`robots.txt` / `sitemap.xml` / `humans.txt`** (27).
   Independent, quick, no regression risk.
7. **`404.html`** (27).
8. **Drop typed.js and self-host the effect** (23) — pairs naturally with Phase 1 item 1;
   removes a third-party origin.
9. **Font loading and critical CSS** (22). Deliberately late: it is the most invasive
   performance change and the easiest to regress. `preconnect` and `display=swap` are
   already in place, so the remaining gain is smaller than it looks.
10. **`<picture>` + WebP for the portrait** (21). Low payoff — the JPEG is already 63 KB.
11. **`aria-label` on icon-only links** — already correct on every social link; confirm and tick.
12. **`prefers-reduced-motion`** — already correct; confirm and tick.
13. **Lighthouse-style before/after write-up.** Genuinely last: it is the summary of
    everything above. Baseline for that comparison is in the Performance section here.
