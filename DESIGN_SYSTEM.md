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

**Light mode**
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F5F0E6` | page background — manuscript paper |
| `--surface` | `#ECE4D3` | cards, badge fills |
| `--ink` | `#241F17` | primary text |
| `--ink-muted` | `#6B5D45` | secondary text, captions, meta |
| `--accent` | `#2F5D50` | links, active states, badge text — annotation ink |
| `--border` | `#D8CDB6` | hairlines, dividers |

**Dark mode**
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#1B1712` | page background — ink well |
| `--surface` | `#2A251D` | cards, badge fills |
| `--ink` | `#F3EEE1` | primary text |
| `--ink-muted` | `#A99C82` | secondary text, captions, meta |
| `--accent` | `#7FBBA6` | links, active states, badge text — lightened for contrast |
| `--border` | `#423A2F` | hairlines, dividers |

Both modes use the same hue relationships (warm paper ↔ ink ↔ green), so
toggling feels like the same document under different light, not two
unrelated themes.

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

- **Home:** a single staged entrance on load — photo and text block animate
  in together as one moment, not badge-by-badge or line-by-line.
- **Experience:** scroll-triggered reveal per job entry is the one place
  sequential animation is justified, because work history genuinely is a
  chronological sequence — this isn't decoration, it reinforces what the
  content actually is. Use `viewport={{ once: true, amount: 0.3 }}` so it
  fires reliably on mobile and doesn't replay on re-scroll.
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
