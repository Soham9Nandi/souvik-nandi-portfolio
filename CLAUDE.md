# Portfolio website — project brief (Claude Code reads this automatically)

**Subject:** Dr. Souvik Nandi (Clinical Affairs & Medical Writing Leader)
**Method:** Agile, iterative sprints — this document covers Sprint 1 only. Deferred items are listed explicitly at the end so nothing gets lost.

---

## Working agreement

- @DESIGN_LOG.md — read it every session. It's the shared record between
  chat-based planning and Claude Code build sessions: chat entries describe
  what's being requested, Claude Code entries describe what was actually done.
- After completing any task — whether it came from a DESIGN_LOG.md entry or
  a direct prompt — append a new entry to DESIGN_LOG.md following the format
  at the top of that file. Note the files touched and the status. Don't edit
  past entries, only append.
- If you have to make an assumption to proceed (an exact number, a color, a
  spacing choice) because the brief or log entry didn't specify it, say so
  explicitly in your log entry so it's easy to review and correct later.

---

## 1. Project purpose

- **Primary audience:** recruiters, hiring managers, and clinical-industry contacts.
- **Main goal:** support job and consulting opportunities — the site should make it easy for a recruiter to quickly understand credibility and get in touch.
- This drives two design priorities: a clear, low-friction way to make contact, and content that reads as immediately credible to a non-specialist skimming quickly.

## 2. Tech stack

- **React + Vite**, client-side rendered.
- **React Router** for real, separate page routes (e.g. `/experience`, `/publications`) rather than single-page anchor scrolling.
- **Framer Motion** for scroll-triggered reveal animations.
- **Dark/light mode:** auto-detects the visitor's system preference on load; a manual toggle lets the visitor override it, and that choice should persist (e.g. via `localStorage`).

**Known trade-off (backlog, not blocking):** a client-side SPA means search engines and link-preview crawlers (Google, LinkedIn) won't easily read per-page content, since it all renders after JavaScript loads. Given the recruiter-focused audience, this may matter later. Mitigation options for a future sprint: `react-helmet-async` for per-route meta tags, or prerendering specific routes. Not solving this now — flagging it so it doesn't get forgotten.

## 3. Visual direction — modern editorial

- **Palette:** cream/off-white background with deep ink text in light mode. A dark-mode equivalent (deep ink background, warm off-white text) is needed but **exact hex values are not yet finalized** — next design round.
- **Typography:** serif headline paired with a clean sans-serif body — signals the academic/published-author credibility (PhD, 25 publications) without looking like a generic template.
- **Iconography:** minimal to none. No literal pharma imagery (molecules, DNA helixes, medical crosses). The "pharmaceutical touch" comes through restraint and precision, not decoration.
- **Accent color:** a muted, sophisticated tone (e.g. deep burgundy or forest green family) — **exact color not yet chosen**, next design round.
- Must be fully legible and intentional in both light and dark mode, not just an inverted light theme.

## 4. Site architecture — Sprint 1

- Multi-page app, real routes via React Router.
- **Built this sprint:** Home (landing) and Experience.
- **Visible now, placeholder content:** Publications, Patents/Research, Contact. These tabs appear in navigation immediately (not hidden, not disabled) and route to a simple "coming soon" page. This keeps the nav feeling complete to a visitor even before every page is built.
- **Backlog (later sprints):** build out Publications, Patents/Research, and Contact into full pages.

## 5. Home / landing page — content scope

- Name and title: Dr. Souvik Nandi, Clinical Affairs & Medical Writing Leader.
- Professional summary: drawn from the CV. **Open item:** the CV summary is written at full-paragraph, document length — it likely needs a shorter, hero-appropriate rewrite versus what appears further down the page. Not yet decided; flag for a content-writing pass.
- Profile photo: a professional photo is ready to use. Treatment: **full color, natural** — no duotone or grayscale filter.
- Navigation: Home, Experience, Publications, Patents, Contact (last three route to the placeholder page for now).
- **Assumption flagged for confirmation:** including a subtle contact CTA (e.g. an email link) directly on the landing page, even though a dedicated Contact page isn't built yet — this seemed consistent with the recruiter-audience goal of easy contact, but wasn't explicitly requested. Please confirm or override.
- **Open item:** whether additional CTA buttons are wanted beyond the nav (e.g. "Download CV" as a PDF) — not yet decided.

## 6. Experience page — content scope

One page, combining (with scroll-reveal animation):

- **Work history** (4 roles): Head, Clinical Affairs — Micro Data Labs; Consultant/Team Lead, Clinical & Regulatory Writing — Meril Life Sciences; Concurrent Director — MDL Clintech Ltd., Kenya; Senior Research Fellow — Siksha 'O' Anusandhan.
- **Education:** MBA (pursuing), PhD in Pharmaceutical Sciences, M.Pharm, B.Pharm.
- **Certifications:** the 5 listed in the CV.
- **Core skills/expertise:** Core Expertise table, Regulatory & Technical Knowledge, and Tools sections from the CV.

**Open items, not yet decided — next design round:**
- Layout style: vertical timeline vs. stacked cards vs. tabbed sub-sections within the page.
- Level of detail per entry: all bullets always visible, or an expand/collapse pattern (relevant given how dense the work-history bullets are).

## 7. Animation

- Library: Framer Motion.
- **Open item:** exact reveal style (fade + slide-up vs. fade-only vs. staggered children per bullet/card) — not yet decided.

## 8. Explicitly deferred to later sprints

- Publications page — 25 entries; display/filtering/sorting strategy (chronological? by impact factor? first-author highlighted?) not yet discussed.
- Patents/Research page (currently just the one 202231024247 patent).
- Contact page.
- Final color palette (exact hex values) and full typography scale.
- Accessibility review specifics.
- Hosting, deployment, and domain.
- SEO/discoverability mitigation for the SPA, if it turns out to matter.

## Assumptions to confirm

1. A subtle contact CTA appears on the landing page in Sprint 1, ahead of the full Contact page.
2. Unbuilt-page tabs are visible immediately, not hidden until ready.
3. The CV's professional summary will need a shorter rewrite for the hero section specifically (exact wording not yet drafted).

