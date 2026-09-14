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
