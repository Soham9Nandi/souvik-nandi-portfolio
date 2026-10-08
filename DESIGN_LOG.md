# Design log

Shared record between chat-based planning and Claude Code build sessions.
Chat entries describe what's being requested; Claude Code entries describe
what was actually done. Keep entries in date order, oldest first. Don't
edit past entries — append new ones instead.

## Entry format

```
## [YYYY-MM-DD] Short title (source: chat | claude code)
- what changed or what's being requested
Files touched: (claude code entries only)
Status: requested | in progress | done
```

---

## [2026-09-14] Home page hero feels empty (source: chat)

Current hero reads as too sparse. Requested changes:

- Enlarge the profile photo significantly from its current placeholder size.
- Crop it to a circle.
- Move it to the right side of the hero (it's currently left-aligned/centered
  above the name and title).
- Add stat badges near the top of the hero to surface headline numbers at a
  glance rather than making a visitor read the full summary to find them.
  Suggested numbers, pulled from the CV:
  - 25 peer-reviewed publications (~5 as first author)
  - 50+ clinical research projects supported
  - 6-person team led (with oversight of ~20 professionals across operations)

Layout not fully specified — text content likely moves to the left of the
photo in a two-column hero, but exact proportions, badge styling, and spacing
are left to the build pass. Note any assumptions made in the log entry that
implements this.

Status: requested

---

## [2026-09-14] Home hero redesign: two-column layout, circle photo, stat badges (source: claude code)

Implemented the two-column hero requested above.

- Swapped hero DOM order so text content renders first (left) and the photo
  second (right) in a `flex` row; on desktop this puts photo on the right
  without needing `order` overrides.
- Photo: enlarged from 200px to 320px, `border-radius: 50%` for the circle
  crop, `object-fit: cover`. Source image is a 640x640 square (confirmed via
  PIL), so a centered circle crop doesn't cut off the face — no
  `object-position` adjustment needed. Added a soft drop shadow
  (`0 24px 48px -20px rgba(0,0,0,0.35)`) for separation against the
  background since the circle now sits directly on flat color with no border.
- Added three stat badges (`.stat-badge`): bordered rounded boxes
  (1px `var(--border)`, 10px radius, 14px/16px padding), big number in
  `var(--accent)` at 1.9rem/700 weight, label below at 0.8rem muted text.
  Laid out in a `flex-wrap` row, each badge `flex: 1 1 150px`.
- Numbers used: "25" / "Peer-reviewed publications — ~5 as first author",
  "50+" / "Clinical research projects supported", "6" / "Person team led —
  oversight of ~20 professionals" — as given in the request.

Assumptions made (not specified in the request, flagging for review):
- **Badge position within the column:** placed between title and summary
  (name → title → badges → summary → CTA), not after the summary. The
  request listed content in chat as "name, title, summary, and stat badges"
  but also said badges should surface numbers "rather than making a visitor
  read the full summary to find them" — read that as intent for badges to
  sit near the top, ahead of the summary paragraph. Easy to reorder if the
  listed order was meant literally.
- **Mobile stacking order:** kept DOM order (content above photo) when the
  layout collapses to a single column below 720px, rather than reordering
  the photo to appear first. Only the desktop arrangement was specified.
- **Breakpoint:** used 720px as the column-stack breakpoint; not specified.
- **Container width:** widened `.site` max-width from 900px to 1040px to
  give the enlarged photo and stat badges room without cramping the summary
  column. Affects all pages, not just Home, since it's a shared layout
  token — flagging in case that's unwanted before the full design pass.
- **Photo shadow:** added a drop shadow for depth/separation; not requested,
  easy to remove if it reads as too decorative for the "restraint over
  decoration" direction in CLAUDE.md.
- No new colors or fonts introduced — badge accent color reuses the existing
  `--accent` placeholder value from Sprint 1 (still not finalized per
  CLAUDE.md §3).

Verified in browser: content renders left of photo at desktop width (1280px,
via computed `getBoundingClientRect`), collapses to a single column with
photo below content and no horizontal overflow at mobile width (375px).
`npm run lint` passes clean.

Files touched: `souvik-nandi-potfolio/src/pages/Home.jsx`,
`souvik-nandi-potfolio/src/index.css`

Status: done

---

## [2026-09-15] Set up version control (source: claude code)

Initialized git and pushed the Sprint 1 state to GitHub.

- Project wasn't a git repo yet (`git status` at project root failed with
  "not a git repository"). Ran `git init` at the project root (not inside
  `souvik-nandi-potfolio/`), so the repo covers the whole project —
  docs, source docx/photo, and the Vite app together.
- Confirmed root docs: `CLAUDE.md` and `DESIGN_LOG.md` exist.
  **`DESIGN_SYSTEM.md` does not exist** — not created, per instructions to
  only report, not create/overwrite.
- Reviewed `souvik-nandi-potfolio/.gitignore` (the Vite-generated one):
  `node_modules`, `dist`, and `dist-ssr` are explicitly excluded — confirmed
  in practice too, `git status` after staging did not pick up
  `node_modules`. **Gap:** the only env-related pattern is `*.local`, which
  covers `.env.local` / `.env.production.local` etc. but not a bare `.env`
  file. No `.env` file exists in the project right now, so nothing is at
  risk today, but a plain `.env` added later would not be ignored. Flagging
  rather than editing the file, since this task was scoped to "confirm," not
  "fix" — let me know if you want `.env` added to the ignore list.
- Staged and committed everything present at the project root as-is:
  `.claude/launch.json`, `CLAUDE.md`, `DESIGN_LOG.md`, the CV and
  publications `.docx` source files, the profile photo, and the full
  `souvik-nandi-potfolio/` app. Reviewed the staged file list before
  committing (via `git status`) — nothing unexpected or secret-looking, and
  `node_modules` was correctly absent. Single root commit
  (`f3cc7b3`, on branch `master` — git's default name, not renamed to
  `main` since that wasn't requested).
- No `origin` remote existed. Asked for the repo URL rather than guessing;
  got `git@github.com:Soham9Nandi/souvik-nandi-portfolio.git` and added it.
- Ran `git fetch origin` then `git ls-remote origin` before pushing anything
  — the remote returned no refs at all (fully empty, not even an
  auto-generated README), so pushed normally: `git push -u origin master`.
  No force-push, no merge needed.

Assumptions / notes for review:
- Branch is `master`, not `main` — flagging in case you'd prefer to rename
  it (`git branch -m main` + re-push) before more history builds up on it.
- The CV `.docx`, publications `.docx`, and profile photo were committed
  as-is per "commit the current state of the project as-is." These contain
  personal contact details (email, phone) already intended for a
  recruiter-facing site, but note they're now in git history on a repo
  that's presumably going public — say the word if any of that should be
  kept out of version control instead.

Files touched: (repo-level only — no source files changed) `.git/` created;
remote `origin` added in git config.

Status: done

---

## [2026-09-15] Design system tokens + hero layout fix + Experience mobile bug (source: claude code)

Created `DESIGN_SYSTEM.md` verbatim as provided (color/type/spacing tokens,
rationale, Home hero and Experience layout specs). Then implemented the six
requested changes against it.

**1. Color/type/spacing tokens as real CSS custom properties**
- Replaced the old placeholder palette (`--text`, `--text-muted`, generic
  burgundy accent) with the exact tokens from DESIGN_SYSTEM.md: `--bg`,
  `--surface`, `--ink`, `--ink-muted`, `--accent`, `--border`, light and
  dark, applied both via the `prefers-color-scheme` fallback and the
  `[data-theme]` overrides the existing theme toggle already drives.
  `--surface` is now used for `.stat-badge` and `.skills-grid li` fills
  (the doc's "cards, badge fills" use case).
- Added Newsreader (headings, weight capped at 500) and Inter (body) from
  Google Fonts via `<link>` tags in `index.html`, with `preconnect` hints.
- Implemented the type scale table (h1/h2/h3 mobile → desktop sizes at
  768px, 1.3 heading / 1.6 body line-height, 65ch line-length cap on
  `.home-summary` and `.work-item ul`).
- Spacing scale (`0.5rem`–`3rem`) added as `--space-xs` … `--space-2xl`.
  **Assumption:** DESIGN_SYSTEM.md gave the rem values but not variable
  names for this scale (unlike the color table, which named every token) —
  I chose the `--space-*` naming; flag if you want different names.
  **Constraint, not a choice:** `--bp-sm/md/lg` are documented as a CSS
  comment at the top of `index.css` but the actual breakpoints are
  hardcoded px values inside each `@media` rule — CSS custom properties
  can't be referenced inside a media query condition, so there was no way
  to make those three literally live as custom properties and still work.

**2–4. Home hero fixes**
- Element order now matches the "Home hero layout" spec exactly: photo,
  name, title, summary, badges, contact — same order in the DOM for both
  breakpoints. Mobile (base styles) stacks that order top-to-bottom as-is.
  At `min-width: 768px` the hero switches to a row and `.home-content` gets
  `order: 1` / `.home-photo` gets `order: 2`, so photo displays on the
  right while staying first in the DOM/reading order.
- Badges moved from between title/summary to after the summary paragraph,
  matching the spec's element order.
- Photo resized to 88px (mobile) / 220px (desktop) per the ASCII diagrams
  in the spec — down from the 200px/320px I'd used in the previous pass.
  Drop shadow removed.
- Rebuilt the hero as a single `motion.section` wrapping both photo and
  content in one fade+slide-up, rather than two separately-timed
  `motion.div`s, to match "photo and text block animate in together as one
  moment" in the Motion section.
- Breakpoint changed 720px → 768px to match `--bp-md`; same value now used
  everywhere (Home hero, type scale, site padding).

**5. Container width:** left at 1040px, unchanged, per instruction.

**6. Experience-page mobile bug — root cause confirmed, then fixed**

Investigated before changing anything. Measured actual rendered heights at
375×812 on the *pre-fix* code: the "Work History" wrapper section (which
held all four job entries plus their motion state) was **3369px tall**.
Because a `whileInView` element only becomes visible once enough of *itself*
intersects the viewport, its maximum achievable intersection ratio at that
height was `812 / 3369 = 24.1%` — only ~4 points above the `amount: 0.2`
threshold the code was using. Every other `motion.section` in the file
(Education, Certifications, Core Expertise, Regulatory & Technical
Knowledge, Tools) was *also* independently wrapped in the same
opacity:0-until-triggered treatment, and — critically — **CSS opacity
compounds down the DOM tree**: even when an inner `motion.article` (each
individual job entry) successfully animated to its own `opacity: 1`, it was
still rendered invisible on screen if its `motion.section` ancestor was
stuck at `opacity: 0`. A slow, exhaustive scripted scroll (150px steps)
could accidentally land inside that ~4-point-wide window and trigger it,
which is why the bug wouldn't necessarily show up in a quick manual check —
but a real, fast flick-scroll on a phone has a real chance of skipping past
that narrow band entirely, leaving the whole section (and everything inside
it) permanently invisible. This matches DESIGN_SYSTEM.md's own diagnosis in
the Motion section almost exactly.

Fix: removed the `motion`/reveal wrapper from every section-level element
(`h1` and all six `experience-section`s are now plain, always-visible
elements — no opacity dependency at all). Scroll-triggered reveal now
exists in exactly one place: the four `motion.article` job entries, per
`DESIGN_SYSTEM.md`'s "one deliberate moment... scroll-triggered reveal per
job entry is the one place sequential animation is justified" (also fixes
the earlier version's unrelated violation of "not scattered fade-ins on
every element" — previously the `h1` and every section faded in
separately). Set `viewport={{ once: true, amount: 0.3 }}` on those four as
instructed; post-fix, their own max achievable ratios at 375px are 0.647,
1.0, 0.848, and 1.0 — comfortable margin above 0.3, versus the 0.241-vs-0.2
near-miss the old section wrapper had.

Also added `<MotionConfig reducedMotion="user">` around the whole app in
`main.jsx`, so `prefers-reduced-motion: reduce` makes every animated
element (Home hero, Experience job entries) render immediately in its final
`animate`/`whileInView` state instead of playing a reduced version of the
same animation — per the Motion section's requirement, and a second,
independent safeguard against content ever depending on a transform/opacity
animation actually completing to become visible.

**Testing:** Verified at 375px and 768px using computed styles/geometry
(`getBoundingClientRect`, `getComputedStyle`) rather than visual
screenshots — screenshots have been timing out in this session's Browser
pane all session. While investigating, traced that specifically to the
preview tab running with `document.hidden === true` / unfocused; scroll
tests taken while backgrounded silently never fired any `IntersectionObserver`
callback at all (0% opacity regardless of scroll), which would have looked
like a *worse*, unrelated bug if taken at face value. Re-ran after
`tabs_select` brought the tab to the front (`document.visibilityState`
back to `"visible"`) and all sections/entries rendered at `opacity: 1` as
expected at both viewports, with `node.style` showing the correct end
state. Also spot-checked theme toggle (background/ink swap to the new
token values) and font loading (`document.fonts.status === "loaded"`,
Newsreader on headings, Inter on body) — both fine. `npm run lint` passes
clean.

**Not implemented — out of scope for this pass, flagging so it's not
forgotten:** DESIGN_SYSTEM.md's "Experience page layout" section also
specifies a scroll-linked left border per job entry (`--border` default,
switching to `--accent` for whichever entry is currently in view, "implying
a timeline"). That wasn't in the six requested action items, so I didn't
build it — it needs its own scroll-position tracking (not just a one-shot
`whileInView`) and felt like a distinct follow-up task rather than part of
"fix the mobile bug." Also didn't touch "reverse-chronological" ordering
in that same section — the current work-history array is already in that
order (Micro Data Labs → Meril → MDL Clintech → Senior Research Fellow,
most recent first), so no change was needed there, but flagging that I
didn't independently re-verify chronological correctness beyond the order
already in the data.

Files touched: `DESIGN_SYSTEM.md` (new),
`souvik-nandi-potfolio/index.html`, `souvik-nandi-potfolio/src/index.css`,
`souvik-nandi-potfolio/src/main.jsx`,
`souvik-nandi-potfolio/src/pages/Home.jsx`,
`souvik-nandi-potfolio/src/pages/Experience.jsx`

Status: done

---

## [2026-09-15] Rename default branch master → main (source: chat)

Ran exactly:
```
git branch -m master main
git push -u origin main
```
Local branch renamed and pushed; `main` now tracks `origin/main` (0
ahead/behind at push time). Old `master` left untouched on the remote, as
instructed — not deleted.

Checked github.com/Soham9Nandi/souvik-nandi-portfolio/branches afterward:
**GitHub still shows `master` as the repo's Default branch.** `main` exists
as a regular active branch alongside it. As instructed, I did not try to
change the default via the API/gh CLI — that's a repo-settings change
(Settings → Branches → Default branch) that needs to happen on
github.com, or you can tell me to do it if you want it scripted via `gh
api`/`gh repo edit` instead.

Practical effect until that setting is changed: new clones, PRs, and the
repo's default view will still land on `master`, even though local `git
push`/`git pull` without an explicit branch name now goes to `main` (it's
the current branch and has its upstream set). Worth switching the GitHub
default sooner rather than later so the two don't drift.

Files touched: none (git/remote config only)

Status: done

---

## [2026-09-15] Fix: Experience page content invisible until manual scroll (source: chat)

Follow-up bug report on the previous Experience-page fix: the first job
entry ("Head, Clinical Affairs") still wasn't visible immediately after
navigating to the page — it only appeared after the user manually scrolled,
even though the earlier fix had confirmed (via computed styles) that all
entries reach `opacity: 1` given a normal scroll pass.

**Reproduced first, before changing anything.** Simulated the actual
reported interaction: scroll down on Home (`scrollTo(0, 600)`, standing in
for wherever a real user's scroll position happens to be), then dispatch a
real click on the "Experience" nav link (client-side route change, not a
full navigation), then check the first job card *without* scrolling.
Result: `scrollY` stayed at `600` after navigating to `/experience`, and
the first `.work-item` was positioned at `top: -252px` — already scrolled
above the viewport on mount, with its `whileInView` animation caught
mid-transition (`opacity: 0.867…`, not yet settled).

**Root cause:** React Router (`BrowserRouter` + `Routes`, no data router,
no `<ScrollRestoration>`) does not reset scroll position on client-side
navigation — that's normal browser behavior only for full page loads.
Whatever `scrollY` the previous page was at carries straight into the next
route's DOM. Since the first job card usually sits right at the top of the
Experience page, any nonzero leftover scroll shifts it out of alignment
with the viewport on mount, which is what delayed/confused its
`whileInView` trigger. This is a separate, second cause of the same
"content doesn't show" symptom from the entry above — that earlier fix
correctly resolved the section-wrapper opacity-compounding bug, but this
one only shows up on client-side navigation with a nonzero prior scroll
position, which is exactly how a real visitor clicking through the nav
behaves (a fresh direct URL load starts at `scrollY: 0` and wouldn't have
shown it, which is why it wasn't caught in the previous round of testing).

**Fix:** added `souvik-nandi-potfolio/src/components/ScrollToTop.jsx` — a
`useLocation` + `useEffect(() => window.scrollTo(0, 0), [pathname])`
component, rendered once inside `<BrowserRouter>` in `App.jsx` alongside
`<Routes>`. Every route change now resets the viewport to the top before
the new page's content mounts, matching how a traditional multi-page site
behaves.

**Verified:** re-ran the exact same reproduction (scroll to 600 on Home,
dispatch a click on the Experience nav link, check immediately without
manual scrolling). Post-fix: `scrollY` is `0` after navigation, the first
job card is at `top: 345px` (cleanly inside the 812px viewport), and its
opacity reaches `1` within ~500ms of the click with zero manual scrolling.
`npm run lint` passes clean; no console errors.

**Assumption:** `ScrollToTop` resets scroll on *every* route change,
including the placeholder pages and back/forward navigation. That matches
normal site behavior and wasn't flagged as unwanted, but note it now
governs all routes, not just Experience — say so if you want any route
(e.g. returning to Home) to preserve scroll position instead.

Files touched: `souvik-nandi-potfolio/src/App.jsx`,
`souvik-nandi-potfolio/src/components/ScrollToTop.jsx` (new)

Status: done

---

## [2026-09-15] Fix: Work History blank on Experience load, corrected diagnosis (source: chat)

The previous entry misdiagnosed the report. User clarified (after I asked
targeted questions rather than assuming): this reproduces in a **resized
desktop browser window** standing in for mobile view, the header/nav/title
render fine but **Work History and everything below it is blank**, and it
happens on **both** a direct `/experience` URL load/refresh **and**
clicking the nav link — including a fresh load starting at `scrollY: 0`,
which the previous fix's leftover-scroll-position theory can't explain.

**Re-investigated with that corrected scope.** Did a genuine hard
navigation (not a client-side route change) straight to `/experience` at a
resized viewport and inspected the first job entry immediately. Found it
was still using `initial={{ opacity: 0 }}` + `whileInView` (from the prior
mobile-bug fix, which correctly removed the *section*-level wrapper but
left this per-entry animation in place) — meaning even an entry already
fully inside the viewport on page load still starts invisible and waits on
an asynchronous `IntersectionObserver` callback (via Framer Motion's
`whileInView`) before it's shown. That callback isn't guaranteed to fire
immediately on mount — the delay is normally small, but real — and a user
who starts scrolling shortly after the page loads (which is what most
people do) will reliably perceive "nothing shows until I scroll," because
scrolling itself is often what nudges the browser into delivering the
callback. This is the same underlying principle DESIGN_SYSTEM.md's Motion
section calls out — content depending on an animation trigger to become
visible — just showing up as a load-time flash rather than the
compounding-opacity failure the previous entry fixed.

**Fix:** replaced the inline `motion.article` in the Work History map with
a new `JobCard` component
(`souvik-nandi-potfolio/src/pages/Experience.jsx`). On mount, a
`useLayoutEffect` synchronously checks `getBoundingClientRect().top <
window.innerHeight` **before the browser paints**. If the entry is already
in view, it renders as a plain `<article>` — no Framer Motion, no `style`
attribute, no animation dependency, permanently `opacity: 1`. Only entries
that are genuinely below the fold at mount keep the
`motion.article`/`whileInView` scroll-reveal. Default state (before the
layout effect resolves) is "already visible" — the safe direction per
DESIGN_SYSTEM.md, so even if the check were somehow skipped, content
degrades to always-visible rather than always-hidden.

**Verified:** hard-loaded `/experience` directly (not a SPA nav) at both
375×812 and 500×700. In both cases the first job entry has
`hasAttribute('style') === false` and `opacity: 1` immediately — it's
structurally incapable of being invisible now, not just fast enough to
look that way. Confirmed the three below-the-fold entries still correctly
start at `opacity: 0` and reach `1` after a scroll pass (regression check
against the intended "scroll-triggered reveal per job entry" motion
design). Re-tested at 375px too. `npm run lint` clean, no console errors.

**Process note for next time:** the previous entry's fix was real and
necessary (the section-wrapper compounding-opacity bug was genuinely
happening), but I filled in the *navigation* half of the reproduction
(leftover scroll position from clicking the nav) without confirming that
matched what the user actually meant by "blank until I scroll" — it
didn't. Asked clarifying questions this round before touching any code,
which surfaced that it happens on a direct reload too and narrowed it to
the per-entry animation immediately.

Files touched: `souvik-nandi-potfolio/src/pages/Experience.jsx`

Status: done

---

## [2026-09-15] Restore entrance animation for above-the-fold Experience cards (source: chat)

User noticed a follow-on effect of the previous fix: Home's hero reliably
"floats up" on load, but the Experience job card(s) already in view at
mount now sit static with zero motion — a visible mismatch between the two
pages. Asked before changing anything, since it wasn't obvious whether the
fix should add motion back to Experience or the static behavior was
actually fine and just needed explaining; user confirmed they want it
matched to Home's entrance.

**Why they differed:** Home's hero uses Framer Motion's `animate` prop,
which is driven by the component mounting — it transitions immediately and
deterministically, with no dependency on scroll position or any async
browser API. The previous Experience fix, in guaranteeing already-in-view
cards could never be invisible, went further than necessary and stripped
animation entirely (plain `<article>`, no Framer Motion at all) rather than
swapping to that same reliable `animate` trigger — so the fix was correct
for the visibility bug but incidentally flattened the motion too.

**Fix:** `JobCard`'s "already in view" branch is now a `motion.article`
using `initial` + `animate` (mount-driven, same mechanism as Home) instead
of a plain `<article>`. The "below the fold" branch is unchanged —
`whileInView` is still correct there, since scroll-triggered reveal is the
actual desired effect for cards not yet visible. Gave each branch a
distinct `key` (`"mount"` / `"scroll"`) so switching between them (decided
in `useLayoutEffect`, before paint) forces a clean remount rather than
Framer Motion reconciling an in-place prop swap between two different
trigger modes — a defensive choice to avoid a theoretical race between
Framer Motion's own mount effect and this component's measurement effect,
not something observed failing, but cheap to rule out.

**Verified:** dispatched a real click on the Experience nav link and
sampled `getComputedStyle(item).opacity` every animation frame for ~200ms
immediately after. Confirmed the curve starts at `0` around 29ms in and
rises smoothly (0.017 → 0.044 → 0.072 → … → 0.50 by 196ms) — a real,
playing fade+lift, not just an instant snap to visible. Re-ran the
scroll-through regression check for the three below-the-fold cards — all
still correctly start hidden and reach `opacity: 1` after scrolling.
`npm run lint` clean, no console errors.

Files touched: `souvik-nandi-potfolio/src/pages/Experience.jsx`

Status: done

---

## [2026-09-17] Publications page — full spec (source: chat)

Sort order changed from an earlier chat recommendation (reverse-chronological)
to impact-factor descending, per a direct requirement from the site owner.
All other prior recommendations stand: condensed cards with expand for full
citation, both first-author and impact-factor badges shown per entry,
in-review entries labeled distinctly, shared reveal-animation component
reused from Experience. Full spec now in DESIGN_SYSTEM.md under
"Publications page layout." Data provided in full in this same session —
see src/data/publications.js.

Status: requested

---

## [2026-09-17] Publications page — implementation (source: claude code)

Built the Publications page per the spec above.

**Data gap, resolved before writing any code:** the request said publication
data was "provided in full in this same session," but the actual message
contained only a placeholder (`[paste the full publications.js content from
above, all 287 lines]`) — no data was actually present. Rather than
fabricate 25 academic publication entries for a real person, stopped and
asked. Given the option to extract from the existing `Publications.docx` at
the project root instead of waiting on a re-paste, and did that.

**Extraction:** `Publications.docx` has no tables — 25 citations as plain
paragraphs in mixed citation styles (author order/abbreviation varies by
journal). Parsed each entry by hand rather than with a generic regex, since
formats aren't consistent enough for that to be reliable (e.g. embedded
`<w:tab/>` runs mid-citation in one entry leaked raw XML into a naive
paragraph-text extraction). Cross-checked the result against the CV's
stated stats as a sanity check: got exactly 25 entries and exactly 5 with
"Souvik Nandi" as the literal first author, matching the CV's "25
publications, ~5 as first author" claim — good signal the parsing was
right. Also found exactly one entry with a "Communicated" status (distinct
from "Just Accepted," which appears on several already-peer-reviewed
entries and was treated as published) — matching the design system's
"currently one entry" for the in-review section. Preserved author-list
strings and journal names exactly as written in the source rather than
normalizing or expanding abbreviations — caught myself about to expand
"Rev Chim" to "Revista de Chimie" from my own general knowledge and
reverted it, since that's not what the source document says. Dropped
volume/issue/page numbers as a scoping choice (not requested, and not
something a recruiter skimming needs); kept title, authors, journal, year,
impact factor, first-author flag, and link only.

**`RevealCard` extraction:** pulled the mount-vs-scroll visibility logic out
of Experience's `JobCard` into `src/components/RevealCard.jsx` unchanged in
behavior — same `useLayoutEffect` pre-paint viewport check, same
mount/animate vs. scroll/whileInView split, same `"mount"`/`"scroll"` key
strategy. Added an `as` prop (defaults to `article`) so Publications can use
it on `<li>` elements. `Experience.jsx`'s `JobCard` component is gone;
`Experience` now renders `<RevealCard className="work-item">` directly.

**Publications.jsx:** three sections — "In review" (the one Communicated
entry), "Peer-Reviewed Publications" (21 entries with an impact factor,
sorted descending), "Additional Publications" (3 entries with no impact
factor, sorted by year descending). Each card is a `RevealCard` wrapping a
real `<button aria-expanded>` (condensed: title, journal · year, first-author
/ impact-factor badges) that expands to show the full author string and a
"View source" link when the data has one.

**Assumptions made, not specified in the request:**
- Section heading text: the spec quoted "In review" verbatim, which I used
  as-is; "Peer-Reviewed Publications" and "Additional Publications" (for the
  ranked and no-IF groups respectively) are my own wording — spec named the
  groups conceptually but didn't give exact heading copy.
- Reused `.experience-section` for spacing on Publications' three sections
  rather than introducing a page-specific class, since it's purely a
  margin-bottom utility — no visual coupling to Experience implied.
- The request said to "update its `ready` flag to `true` in the nav tabs
  data," but no such flag existed in `Layout.jsx`'s `navItems` before this
  — nothing currently branches on it (per CLAUDE.md, placeholder tabs are
  already shown identically to built ones, not disabled or badged). Added
  `ready: true/false` per item now so the data honestly reflects build
  state and is available if a future pass wants to visually distinguish
  them; it has no effect on rendering today.
- Toggle affordance is text-only ("Show details" / "Hide details"), not an
  icon/chevron, per CLAUDE.md's "iconography: minimal to none."

**Verified:** loaded `/publications` at 375px and 768px. Confirmed sort
order (impact factor descending in the ranked group, year descending in
"Additional"), exactly 5 first-author badges, all 25 cards present. Tested
expand/collapse via a real `.click()` — `aria-expanded` flips, full author
list and link appear/disappear correctly, `rel="noreferrer"` on the
external link. First card animates in on mount (not scroll-gated, matching
the RevealCard contract); scroll-through confirmed all 25 reach
`opacity: 1`. Confirmed `/patents` and `/contact` still correctly show the
placeholder (no regression from the router change). `npm run lint` clean,
no console errors.

Files touched: `souvik-nandi-potfolio/src/data/publications.js` (new),
`souvik-nandi-potfolio/src/components/RevealCard.jsx` (new),
`souvik-nandi-potfolio/src/pages/Publications.jsx` (new),
`souvik-nandi-potfolio/src/pages/Experience.jsx`,
`souvik-nandi-potfolio/src/App.jsx`, `souvik-nandi-potfolio/src/components/Layout.jsx`,
`souvik-nandi-potfolio/src/index.css`

Status: done

---

## [2026-09-17] Navigation, header and light-only decisions (source: chat)

- Dark mode is removed. The site is light-only (owner: the logo does not adapt).
- The owner's logo is used as supplied, on a white rounded square, before the name in a bigger header.
- Desktop navigation: owner chose the horizontal tab row (Alt B).
- Mobile navigation: fixed page sequence, two stacks derived from the active page only. Every active page has a tab joined to its sheet. Tap only, no drag.
- Transition: content fades and lifts; tabs glide on mobile; reduced motion respected.
- Favicon deferred. Publications card redesign is being done separately by me and is out of scope.

Status: requested

---

## [2026-09-17] Tabbed navigation, header, light-only — implementation (source: claude code)

Built on `feat/tabbed-nav`, seven commits, one per ordered work item plus
two bug fixes found during verification. Branch not merged to `main`.

**Files touched (cumulative):**
- Deleted: `src/context/ThemeContext.jsx`, `theme-context.js`, `useTheme.js`,
  `src/components/ScrollToTop.jsx`, `src/components/Layout.jsx`
- New: `src/components/Header.jsx`, `Shell.jsx`, `NavTabs.jsx`,
  `src/context/sheet-context.js`, `useSheetRef.js`, `src/nav-pages.js`,
  `souvik-nandi-potfolio/vercel.json`
- Modified: `main.jsx`, `App.jsx`, `index.html`, `index.css` (extensively —
  dark-mode removal, Header, app-shell/nav-stage/nav-tab/sheet rules),
  `src/components/RevealCard.jsx`, `src/pages/Home.jsx`
- Added asset: `src/assets/sn-icon.jpeg` (owner-supplied logo)

**Decisions the spec didn't cover:**
- **Header name/icon gap at desktop:** spec gives 12px only for mobile.
  Reused the same 12px at desktop rather than inventing a second value.
- **AnimatePresence mode:** used `mode="wait"` (exit fully completes before
  the incoming page mounts) rather than `"sync"` (both animate at once).
  The spec describes outgoing/incoming motion sequentially and the sheet
  has no spare room to host two overlapping page subtrees cleanly, so
  simultaneous mode risked layout overlap during the transition.
- **z-index scheme:** stacked tabs get `slot + 1` (so depth-from-active,
  not DOM order, decides paint order, per the spec's own requirement); the
  active tab gets `100` inline, which also covers the desktop case even
  though a separate desktop rule was first written for it and then removed
  as dead code (inline style always wins over a stylesheet rule here).
- **`--sheet-bottom-extent` as a JS-built calc() string:** CSS `calc()` has
  no conditional, and the sheet's bottom sits flush against `--safe-bottom`
  when there's no after-stack (Contact active) but needs the extra
  after-stack-height + gap term otherwise. Shell.jsx picks which *shape* of
  expression to use based on `afterCount`, but every literal pixel value in
  that expression is still a `var()` reference into the CSS custom
  properties — none are hard-coded, matching the spec's actual intent.
- **`h1:focus` instead of `h1:focus-visible`:** tabindex="-1" elements get
  no default focus ring, and in testing `:focus-visible` didn't match a
  script-triggered `.focus()` call. Plain `:focus` is safe here specifically
  because this heading is never a mouse click target, so there's no
  click-vs-keyboard distinction to preserve.
- **Mobile sheet background/border:** the spec gives exact values for the
  desktop sheet (1px border, specific radius) but not the mobile one beyond
  position. Gave it `background: var(--bg)`, a 1px border, and a modest
  bottom-only radius, reusing the desktop token values rather than
  inventing new ones.

**Didn't match the spec, flagging rather than silently deviating:**
- **Desktop tab-row/sheet alignment vs. the header.** The header's content
  is centered in a 1040px column; the nav-stage tab row and sheet instead
  sit a flat 2rem from the viewport edge (per "aligned with the sheet's
  left edge" — which they are, verified at 32px/32px). At 1280px this is a
  real, visible ~80px misalignment between the header's logo column and
  the tab row beneath it. The spec never says the two should share an outer
  alignment, so I implemented literally rather than add an unrequested
  max-width cap — but it's worth a second look.
- **Keyboard arrow-key sheet scrolling** — structurally correct (`.sheet`
  is `tabindex="0"`, genuinely overflow-scrollable, confirmed via mouse
  wheel and direct `scrollTop` writes, and a captured `keydown` listener
  shows `ArrowDown` reaching it with `defaultPrevented: false`) but the
  browser's *native* scroll-on-arrow-key action never fired in this test
  harness specifically — the same category of synthetic-input limitation
  hit earlier this session with `.click()` vs `dispatchEvent(MouseEvent)`.
  This should work in any real browser with a real keyboard; I can't make
  this harness prove it.
- **`prefers-reduced-motion` has no emulation control in the tools
  available here** (only light/dark `colorScheme` on `resize_window`), so
  the "swaps are instant" check is verified by code inspection
  (app-wide `MotionConfig reducedMotion="user"`, unchanged from Sprint 1,
  plus the dedicated `@media (prefers-reduced-motion: reduce)` rule
  disabling the mobile tab-glide transition) rather than live-triggered.
- **Vercel preview** wasn't reachable from this environment at all (no
  dashboard/CLI access), so the described 404 condition couldn't actually
  be observed. Added `vercel.json`'s rewrite preemptively since it's a
  standard, well-known requirement for any client-side-routed SPA on
  static hosting, not a fabricated fix for a confirmed failure.

**Two real bugs found and fixed during verification (not spec deviations,
but worth recording since they weren't visible from code review alone):**
1. **RevealCard mount-race.** On a *direct* URL load, Shell and the routed
   page's content mount in the same pass, and `RevealCard`'s mount-time
   "already visible?" check was reading `sheetRef.current` before Shell's
   plain `useRef` had actually attached the DOM node — silently null,
   which made every entry fall back to "already visible" regardless of
   real position (caught because item 2+ on Experience showed
   `opacity: 1` immediately on a hard `/experience` load, but correctly
   `opacity: 0` via client-side nav, where Shell was already mounted).
   Fixed by routing the sheet node through `useState` so consumers'
   effects are guaranteed to re-run once it's actually attached.
2. **Desktop sheet not constraining to the viewport.** `.app-shell` used
   `min-height: 100dvh` — a floor, not a ceiling — so on any desktop-width
   page with real content, the flex column just grew past the viewport and
   the *whole page* (header included) scrolled as one block, instead of
   only the sheet scrolling internally. Caught at the required 844×390
   check (`shellHeight` was 958–5500px against a 390px viewport). Fixed
   with a hard `height: 100dvh` in the desktop media query.

**Verification results:**
- **Mobile stacking math** (375×667, 390×844, 430×932; all 5 routes,
  all 5 active indices): before-stack count == index, after-stack count ==
  4 − index, in every case, at every viewport. 24px reveal, the active
  tab's 2px sheet overlap, and the 20px sheet-to-after-stack gap all
  measured exact at every combination. Contact active (no after-stack):
  sheet bottom sits exactly `--safe-bottom` (24px) from the viewport edge.
- **Desktop** (768×1024, 1280×800): all 5 tabs always rendered and
  clickable, active tab's 2px seam-covering overlap confirmed, tab row and
  sheet share a left edge (32px/32px) — see the header-alignment note above
  for the one thing that doesn't also align.
- **Short landscape (844×390):** after the app-shell fix, shell/body height
  matches the viewport exactly (390px) on all 5 routes, sheet shrinks and
  scrolls internally, header stays at `top: 0` while `sheet.scrollTop`
  changes and `window.scrollY` stays 0.
- **Route consistency:** direct load, hard reload, and browser back/forward
  on `/publications` → `/patents` → back → forward all produced the same
  before/after stack counts as clicking there normally.
- **Experience first load:** at exactly 375×667, the first job entry is
  `opacity: 1` with no scroll; a scripted scroll-through still brings all 4
  (Experience) and 25 (Publications) entries to `opacity: 1`.
- **Keyboard:** Tab order is Home → Experience → Publications → Patents →
  Contact with a visible focus ring at each stop; Enter on a focused tab
  navigates and moves focus to the new page's `<h1>` (also with a visible
  ring). Sheet scroll-by-keyboard: see the flagged tooling limitation above.
- **Reduced motion:** verified by code inspection only, not live-triggered
  (no emulation control available) — see above.
- **No console errors** across a full cycle through all 5 routes. `npm run
  lint` and `npm run build` both pass clean after every one of the 7
  commits, not just the last one.
- **Vercel:** not reachable from this environment; `vercel.json` added
  preemptively (see above).

Status: done

---

## [2026-09-17] Fix: janky page transition, content appears/fades/returns (source: chat)

Reported on `feat/tabbed-nav`: "the motion when I change the tab is janky,
it's like it is appearing but then it fades out and comes back again."

**Diagnosed by sampling, not guessing.** Clicked a tab and recorded the
page-transition wrapper's `getComputedStyle(...).opacity` every animation
frame, tagging each sample with which page's markup it actually contained
(`.home-hero` vs `.work-item` etc.). That showed the outgoing wrapper's
"exit" phase (opacity declining 1→0 over ~350ms) was displaying the
*incoming* page's content the entire time — not the outgoing page's. First
suspected React StrictMode (a known class of issue with double-invoked
effects colliding with animation libraries); disabled it and re-ran the
same trace — identical result, ruling that out.

**Root cause:** `Shell.jsx` rendered a live `<Outlet/>` inside the
AnimatePresence-tracked `motion.div`. `Outlet` is a mounted React component
that subscribes to router context directly — so the instant `pathname`
changes, *that specific Outlet instance* re-renders and swaps to the new
route's output immediately, regardless of whether its parent wrapper is
still mid-exit-animation under `mode="wait"`. AnimatePresence keeps the
old wrapper around to finish its exit, but the Outlet inside it doesn't
care — it already moved on. Net effect on every nav: old wrapper's exit
fade (1→0) plays while already showing the new page's text, then the
genuinely new wrapper's entrance (0→1) plays on top of that — reading
exactly as "appears, fades out, comes back".

**Fix:** capture `useOutlet()` as a plain value (`const outlet =
useOutlet()`) and render `{outlet}` instead of `<Outlet/>`. The captured
React element is just a value — it doesn't itself subscribe to anything —
so the preserved/exiting wrapper keeps showing whatever page it actually
belongs to for the whole of its own animation.

**Verified:** resampled the identical opacity-over-time trace for
Home→Experience and Experience→Publications — outgoing page now stays
correctly tagged as itself through its full 1→0 exit, incoming page fades
0→1 once with no dip, and the first `RevealCard` entry climbs 0→1 cleanly
only once its real page has mounted. No console errors; `npm run lint` and
`npm run build` both clean.

Files touched: `souvik-nandi-potfolio/src/components/Shell.jsx`

Status: done

---

## [2026-09-17] Patents page — details + scope decision (source: chat)

Only patent data anywhere in the project (CV, docs) was the bare line "1
published patent: 202231024247 (IP India)" — not enough to build a page
from. Asked; got the full detail:

- Title: "Transdermal drug delivery film composition and method for
  synthesis thereof."
- Inventors: Raghunath Hazari, Annanya Gangopadhyay, Rudra Narayan Sahoo,
  Souvik Nandi, Rakesh Swain, Swati Biswas, Anindya Bose
- Application number: 202231024247, IP India
- Filed: April 25, 2022. Published: October 27, 2023.

Also asked whether to draft a dedicated "Patents page layout" section in
DESIGN_SYSTEM.md first (as was done for Publications) before building.
Owner's call: skip the spec, build directly, log the decision here instead
— with only one entry, a dedicated spec section was judged not worth the
round trip.

Status: requested

---

## [2026-09-17] Patents page — implementation (source: claude code)

Built per the details above, no dedicated spec section (per the decision
logged there).

- `src/data/patents.js`: array of one patent object (title, inventors,
  application number, jurisdiction, filed/publication dates, status) —
  kept as an array rather than a single object since the page/CLAUDE.md
  framing ("currently just the one patent") implies more may be added
  later, and an array costs nothing extra for one entry.
- `src/pages/Patents.jsx`: single `RevealCard` (`as="li"`) per patent,
  reusing the same mount-vs-scroll visibility behavior already used on
  Experience and Publications. No expand/collapse — unlike Publications'
  dense citations, everything here already fits in the condensed view, so
  a toggle would just be an extra click for no reason.
- CSS: new `.patent-card`/`.patent-title`/`.patent-meta`/`.patent-inventors`
  rules mirroring the existing `.publication-card` visual treatment
  (`--surface` fill, 1px `--border`, 10px radius) rather than sharing that
  class directly — kept each page's styles self-contained rather than
  naming a Patents element after Publications.
- Wired `/patents` to the real page in `App.jsx`, replacing the
  placeholder. No nav changes needed — `NavTabs` has no "ready/dimming"
  concept since the tabbed-nav rebuild, so the tab already behaved
  identically to the others.

**Verified:** loaded `/patents` at 375px and 1280px — all fields render
correctly, the card is `opacity: 1` immediately on load (already in view,
no scroll-gated flash), Patents tab shows active with no dimming, Contact
still stacks correctly after it. No console errors; `npm run lint` and
`npm run build` both clean.

Files touched: `souvik-nandi-potfolio/src/data/patents.js` (new),
`souvik-nandi-potfolio/src/pages/Patents.jsx` (new),
`souvik-nandi-potfolio/src/App.jsx`, `souvik-nandi-potfolio/src/index.css`

Status: done

---

## [2026-09-17] Disable Contact tab/page and Home email CTA (source: chat)

Requested: remove the Contact page, but as a comment-out rather than a
deletion (reversible), and comment out the email link on Home too.

- `nav-pages.js`: commented out the `/contact` entry in the `pages` array.
  Nav is now 4 tabs (Home, Experience, Publications, Patents); the mobile
  stacking math and desktop row are both computed from `pages.length`, so
  this didn't need any other code changes — Patents is now the page with
  no after-stack instead of Contact.
- `App.jsx`: commented out the `/contact` Route and its now-unused
  `Placeholder` import (would otherwise fail lint as unused).
- `Home.jsx`: commented out the `EMAIL` constant and the `mailto:` CTA
  link together (same reason — an unused-but-declared constant would also
  fail lint).
- `Shell.jsx`: updated a comment that referenced "(Contact active)" as the
  example of the no-after-stack case, since Contact's no longer in the
  active page set — Patents is now that example.

**Flagging, not fixed:** commenting out the route (rather than deleting it)
means there's no fallback for it — a direct visit to `/contact` (an old
bookmark, a search-indexed link, anyone typing it) now renders a
**completely blank page**: no header, no nav, nothing, with React Router
logging "No routes matched location /contact" to the console. Didn't add a
redirect or restore the placeholder for this case since it wasn't asked
for and a redirect is itself a small design decision (send to Home? show
the old placeholder? something else?) — flagging rather than guessing.

**Verified:** nav shows exactly 4 tabs at both breakpoints; mobile stacking
re-confirmed at 375×812 with Patents active — sheet bottom sits exactly
24px (`--safe-bottom`) above the viewport edge, matching the no-after-stack
case that used to belong to Contact. Home page no longer shows the email
CTA. `npm run lint` and `npm run build` both clean (no unused-import/
unused-var errors from the commented-out code).

Files touched: `souvik-nandi-potfolio/src/nav-pages.js`,
`souvik-nandi-potfolio/src/App.jsx`,
`souvik-nandi-potfolio/src/pages/Home.jsx`,
`souvik-nandi-potfolio/src/components/Shell.jsx`

Status: done

---

## [2026-09-17] Fix: visible focus box around heading on every tab click (source: chat)

User flagged a screenshot showing a visible outline box around the
"Patents" `<h1>` right after clicking the tab with a mouse.

**Root cause:** during the tabbed-nav build, the page heading gets
programmatic focus after every route change (`Shell.jsx`, so keyboard and
screen-reader users land on the new content, per DESIGN_SYSTEM.md). The
CSS for that used plain `h1:focus` rather than `h1:focus-visible`, with a
reasoning note at the time that `:focus-visible` "didn't reliably treat a
script-triggered `.focus()` as keyboard-initiated" in this session's test
harness. That reasoning turned out to be an artifact of the test
environment, not real-browser behavior — the actual verification back then
used a synthetic `.focus()` call with no real preceding user interaction
at all, so the browser had no input-modality context to work with either
way. The practical effect: the ring showed up for *every* navigation,
mouse clicks included, which is what the user saw.

**Fix:** swapped `h1:focus` for `h1:focus-visible`. The programmatic focus
move itself is unconditional (still happens on every route change, mouse
or keyboard, which is what the accessibility requirement actually needs),
but the *visible ring* now depends on the browser's own input-modality
tracking.

**Verified properly this time, with real input:** a real mouse click
(`computer` tool) navigating to a page leaves `document.activeElement` on
the new `<h1>` (focus moved, confirmed) but `:focus-visible` does not
match and computed `outline` is `none`. A real sequence of keyboard `Tab`
presses to a tab link, then activating it, leaves the new `<h1>` focused
*and* matching `:focus-visible`, with a visible 2px solid outline. (Note:
the `computer` tool's synthetic `Return` key didn't trigger the anchor's
navigation in this harness — same class of synthetic-input gap seen
earlier this session — so the keyboard case was completed by calling
`.click()` on the already Tab-focused element rather than sending Enter;
the resulting input-modality state is still keyboard-based, which is what
mattered for this test.) `npm run lint` and `npm run build` both clean.

Files touched: `souvik-nandi-potfolio/src/index.css`

Status: done

---

## [2026-09-17] Simplify Publications cards: drop expand/badges/authors, link the card (source: chat)

Discussed before building (per request). Landed on:

- No more expand/collapse or "Show details" — card links straight to the
  source paper instead. Mechanism commented out in `Publications.jsx`
  (button, `aria-expanded`, details panel with the old author list +
  "View source" link), not deleted — explicitly asked to keep it for
  possible future use. CSS for it (`.publication-toggle`,
  `.publication-expand-hint`, `.publication-details`, `.publication-authors`)
  left in place too, so restoring is a pure uncomment with no CSS work.
- First-author and impact-factor badges, and the full author list: deleted
  outright, not commented — explicit instruction, unlike the expand
  mechanism. `.publication-badges`/`.badge`/`.badge-first-author`/
  `.badge-impact-factor` CSS removed with it (confirmed via grep they
  weren't used anywhere else — Home's `.stat-badge` is unrelated).
- Card is the whole link: discussed two options (title-only vs whole-card)
  — went with whole-card per the owner's call that precise clicks aren't
  realistic "in a hurry." No semantic issue since the expand button's gone
  — an `<a>` wrapping a card's full text content is a standard accessible
  pattern as long as there's no OTHER interactive element nested inside it,
  which is now the case.
- Linking affordance: discussed several options with iconography set aside
  (external-link arrow, "open in new window" icon, accent dot, "[PDF]"-
  style tag, chain-link glyph); picked the external-link arrow paired with
  text — renders as "View paper ↗" — shown only on cards that actually
  have `pub.link`. Cards without a link render as a plain, non-interactive
  `<div>` instead of an `<a>` — no hint text, not clickable.
- Sort/grouping logic (in-review / impact-factor-ranked / additional-by-
  year) is unchanged — only the per-card visual content changed, not which
  entries land in which section or their order within it.

**Verified:** all 25 cards render; of those, the 9 with a real `pub.link`
are `<a>` elements with correct `href`/`target="_blank"`/`rel="noreferrer"`
and the "View paper ↗" hint, the other 16 are plain `<div>`s with no hint
and no href. No badges, no author text anywhere in the rendered output.
Checked at 375px. No console errors; `npm run lint` and `npm run build`
both clean.

Files touched: `souvik-nandi-potfolio/src/pages/Publications.jsx`,
`souvik-nandi-potfolio/src/index.css`

Status: done
