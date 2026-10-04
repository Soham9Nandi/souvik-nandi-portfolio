# Design system

Source of truth for visual tokens and layout principles. Referenced from
CLAUDE.md — don't introduce colors, fonts, or spacing values outside this
file without adding them here first.

## Rationale, up front

The obvious version of "editorial pharma portfolio" is a warm cream
background, a high-contrast serif, and a terracotta accent — that's also the
generic default a lot of AI-generated design lands on regardless of subject.
To earn the cream/serif direction rather than default to it, the palette
below is grounded specifically in **medical writing and manuscript review** —
paper, ink, annotation — rather than pharma iconography in general. The
accent is an ink-green (fountain-pen / markup-annotation color), not the
common orange-terracotta. Two typefaces were chosen deliberately rather than
reached for as safe defaults — see Typography below.

## Color

Light mode only (owner decision: the logo does not adapt to a dark background).

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F5F0E6` | page background — manuscript paper |
| `--surface` | `#ECE4D3` | cards, badge fills |
| `--ink` | `#241F17` | primary text |
| `--ink-muted` | `#6B5D45` | secondary text, captions, meta |
| `--accent` | `#2F5D50` | links, active states, badge text — annotation ink |
| `--border` | `#D8CDB6` | hairlines, dividers |

## Typography

- **Headings:** Newsreader (serif). Ties to the "manuscript" theme without
  reaching for the overused Playfair/DM Serif display pairing. Weight 500 max
  — never bold headings.
- **Body and UI:** Inter (sans). Highly legible at small sizes, which matters
  given how dense the Experience content is.
- Both load from Google Fonts; self-hosting can happen later if performance
  needs it.

**Type scale (mobile base → desktop at `--bp-md` and up)**
| Role | Mobile | Desktop |
|---|---|---|
| h1 | 2rem / 32px | 2.5rem / 40px |
| h2 | 1.375rem / 22px | 1.75rem / 28px |
| h3 | 1.125rem / 18px | 1.25rem / 20px |
| body | 1rem / 16px | 1rem / 16px |
| caption/meta | 0.8125rem / 13px | 0.8125rem / 13px |

Line height: 1.3 for headings, 1.6 for body. Line length capped around 65ch
for the summary paragraph and job bullets — not a wall of text edge to edge.

## Alignment

Left-aligned throughout — name, title, summary, badges, job entries. Not
centered. A centered hero with a centered CTA is the default template look;
left alignment reads more like an article masthead, which fits "medical
writer" better than "product landing page."

## Spacing & breakpoints (mobile-first)

Write base styles for mobile. Add larger-viewport rules with `min-width`
media queries only — never the reverse.

```
--bp-sm: 480px  /* large phones */
--bp-md: 768px  /* tablet — hero becomes two-column here */
--bp-lg: 1024px /* desktop — max content width applies */
```

Spacing scale: `0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem`. Page padding is
`1.25rem` on mobile, `2rem` from `--bp-md` up. Max content width is
`1040px`, centered, from `--bp-lg` up — widened from an earlier 760px draft
once the enlarged hero photo and stat badges needed more room in practice.
This doesn't conflict with the 65ch line-length rule below: the outer
container can be wide while text elements (summary, job bullets) stay
capped at 65ch independently.

## Motion

One deliberate moment per page, not scattered fade-ins on every element —
scattered per-section fade-and-slide-up is the generic AI-page tell.

- The sheet transition (see Navigation) is the one entrance animation for
  every page, including Home on first load. Pages do not run their own
  entrance animation on top of it. On the Experience and Publications
  pages, per-entry scroll reveals remain, but only for entries below the
  fold inside the sheet; entries already visible when the page mounts
  simply appear.
- Respect `prefers-reduced-motion`: fall back to an instant, fully-visible
  state, never a stripped-down version of the same animation.
- Content must never depend on the animation firing to become visible or
  readable — if the trigger doesn't fire, the fallback is fully visible
  content, not blank space. (This is almost certainly the Experience-page
  mobile bug — see DESIGN_LOG.md.)

## Home hero layout

**Mobile (base, < 768px) — single column, left-aligned:**
```
[ photo, circle, 88px ]
Dr. Souvik Nandi
Clinical Affairs & Medical Writing Leader
Summary paragraph, ~65ch max width...
[25 publications] [50+ projects] [6-person team led]
ph.souvikn@gmail.com
```

**Desktop (≥ 768px) — two column, photo right:**
```
+----------------------------------+  +--------------+
| Dr. Souvik Nandi                  |  |              |
| Clinical Affairs & Medical        |  |  photo,      |
| Writing Leader                    |  |  circle, 220px|
|                                    |  |              |
| Summary paragraph...              |  |              |
|                                    |  |              |
| [25 pubs] [50+ projects] [6-team] |  |              |
| ph.souvikn@gmail.com              |  |              |
+----------------------------------+  +--------------+
```

Same element order in both — photo, name, title, summary, badges, contact —
mobile just stacks it and desktop splits it into two columns.

## Experience page layout

Reverse-chronological stacked entries (most recent first — standard resume
convention), each with a thin left border in `--border` that becomes
`--accent` on the entry currently in view while scrolling, implying a
timeline without literal numbered markers or icons.

## Publications page layout

Ordered by impact factor, highest first — per the site owner's explicit
directive, overriding an earlier chat recommendation of reverse-chronological.

- **In review** (submitted, not yet accepted/peer-reviewed): its own small
  section at the top, clearly labeled "In review" — never listed identically
  to a published work. Currently one entry.
- **Ranked list:** all entries with a stated impact factor, sorted highest
  to lowest.
- **Additional publications:** entries with no impact factor given in the
  source data — cannot be ranked by a number they don't have, so they get
  their own trailing group (sorted by year, descending, within it) rather
  than being placed arbitrarily within the ranked list.
- **Card, condensed by default:** title (serif, matches heading style),
  journal + year (muted caption), first-author badge and impact-factor badge
  inline where applicable. Expands (real `<button>`, `aria-expanded`, not a
  bare div) to reveal the full author list and a link to the source when one
  exists in the data.
- **Motion:** reuse the Experience page's already-tested reveal pattern
  (the `JobCard` already-in-view check) as a shared component rather than
  reimplementing scroll-reveal logic for 25 more entries from scratch.

## Header

Fixed at the top. It never moves or animates during page changes.

- Band: `--surface` background, a 3px `--accent` rule along the bottom, full width. Inner content is centered, max width 1040px.
- Icon: the owner's logo, used exactly as supplied. No recoloring, no filters, no conversion to SVG. It is a JPEG with a white background, so render the image itself as a white rounded square: `border-radius: 10px`, 1px `--border`, no extra padding (the JPEG's own white margin is the chip), `object-fit: contain`, square aspect ratio. Decorative, so `alt=""`.
- Mobile (< 768px): band height 76px. Icon 44px. The name "Souvik Nandi" sits to its right with a 12px gap, Newsreader 19px / 500. No tagline.
- Desktop (>= 768px): band padding 28px 0. Icon 64px. Name in Newsreader 30px / 500, and beneath it the tagline "Clinical Affairs & Medical Writing Leader" in Inter 14px, `--ink-muted`.
- The header is not a link and has no controls.
- Favicon: unchanged for now. Decision deferred.

## Navigation

### Model (all breakpoints)

- Five pages in a fixed order that never changes: Home `/`, Experience `/experience`, Publications `/publications`, Patents `/patents`, Contact `/contact`.
- Exactly one page is active, determined only by the current route. Its tab is joined to its content sheet. Pages before it in the order are stacked behind it on one side; pages after it are stacked behind it on the other.
- Visit history plays no part and nothing is persisted. A direct link, a reload, and the browser back and forward buttons all just produce the arrangement for that route's page. The arrangement is a pure function of the active index (0 to 4).
- Routes stay real React Router routes. Tabs are links (`NavLink`).
- Patents and Contact stay "coming soon" placeholder pages. Their tabs look and behave exactly like the others (no dimming).
- Interaction is tap or click only. No drag gestures.

### Tab shape (every tab, every state)

- Mobile tabs are all the same size: 140px wide, 40px tall. Tabs are never scaled by depth.
- Corners: `8px 8px 0 0` (rounded top, flat bottom) on every tab regardless of where it sits.
- Inactive: `--surface` background, 1px `--border`, `--ink-muted` text. Active: `--accent` background, `--bg` text, no bottom border, and it overlaps its sheet by 2px so there is no seam.
- Labels sit at each tab's exposed edge, never centered: top-aligned for tabs in the before-stack, bottom-aligned for tabs in the after-stack, 4px inner padding. Every label must be fully readable at every depth.

### Mobile (< 768px)

The layout is an app shell the height of the viewport (`100dvh`): header, before-stack, active tab, sheet, after-stack, safe margin. Only the sheet scrolls.

- Reveal per stacked tab: 24px (the WCAG 2.2 minimum target size).
- Before-stack (pages earlier than the active one): the first tab starts 16px below the header and each next one is 24px lower. Home is highest; the page immediately before the active one is closest to the active tab. Each shows 24px.
- Active tab: directly below the before-stack, horizontally centered, top-aligned label.
- Sheet: 16px side margins. Its top is the active tab's bottom minus 2px. Its bottom is 20px above the front tab of the after-stack.
- After-stack (pages later than the active one): the page immediately after the active one is in front and fully visible (40px). Each deeper page is 24px lower and shows 24px. The deepest tab's bottom edge sits `max(24px, env(safe-area-inset-bottom))` above the bottom of the viewport. With no pages after the active one (Contact active), the sheet extends down to that same margin.
- DOM order is always Home, Experience, Publications, Patents, Contact, regardless of visual position.
- Implement with CSS custom properties (`--tab-h: 40px`, `--tab-reveal: 24px`, `--stack-top-gap: 16px`, `--safe-bottom`), not hard-coded pixel coordinates.
- Very short viewports (< 560px tall, e.g. landscape phones): the sheet must not shrink below 280px. Let the whole shell scroll instead.

### Desktop (>= 768px): horizontal tab row

- Below the header, one row of five tabs in the fixed order, left to right, aligned with the sheet's left edge. Each tab is content-sized (padding 12px 26px, 14px text) and overlaps its neighbor by 8px (`margin-left: -8px`).
- The active tab is larger (padding 16px 32px 18px, 16px / 500 text), accent colored, sits above the sheet, and overlaps it by 2px so it covers the sheet's top border and reads as one piece. Inactive tabs sit behind the sheet, with the sheet's top border visible beneath them.
- Sheet: 1px `--border`, radius `0 14px 14px 14px`, padding 56px, fills the remaining viewport height. Only the sheet scrolls. The content column is centered, max width 1040px.
- No before-stack or after-stack on desktop: all five tabs are always visible and directly clickable.

### Transition (all breakpoints)

- Triggered by any route change. The outgoing content fades and drops 14px (about 350ms). The incoming content starts at opacity 0 and 28px low, then floats up to rest (about 350ms). On mobile the tabs also glide to their new positions (about 400ms, ease) while the content swaps.
- The active tab stays visible throughout and is never hidden behind its own sheet.
- `prefers-reduced-motion: reduce`: swap instantly, no movement.
- Content must never depend on the animation to become visible. If the animation fails or stalls, the page is still fully visible and readable.
- After a route change, reset the sheet's scroll to the top and move keyboard focus to the new page's heading so keyboard and screen reader users land on the new content.

### Accessibility

- Tabs are wrapped in `<nav aria-label="Pages">`. The active tab has `aria-current="page"`. All tabs have a visible `:focus-visible` outline.
- The scrolling sheet is the page's `<main>`. It needs `tabindex="0"` so keyboard users can scroll it, and an accessible name.
