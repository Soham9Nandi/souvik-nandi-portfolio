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
