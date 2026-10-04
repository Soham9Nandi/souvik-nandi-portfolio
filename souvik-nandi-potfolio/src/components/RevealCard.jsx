import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useSheetRef } from '../context/useSheetRef'

// Shared scroll-reveal wrapper (originally built for Experience's JobCard,
// extracted so Publications can reuse the same tested behavior instead of
// reimplementing it for 25 more entries).
//
// Default to "already visible" — the safe state per DESIGN_SYSTEM.md's
// "content must never depend on the animation firing to become visible"
// rule. useLayoutEffect runs synchronously before the browser paints, so if
// this entry is actually below the fold we switch it to the scroll-reveal
// version before the user ever sees a frame.
//
// Both branches still animate — the difference is *what* triggers the
// entrance. In-view entries use `animate`, which fires on mount and doesn't
// depend on any async browser API, so it's exactly as reliable as the Home
// hero's entrance (no IntersectionObserver-timing risk). Below-the-fold
// entries use `whileInView`, since for those the animation firing exactly
// when scrolled into view is the actual desired effect. Distinct `key`s
// force a clean remount when the branch changes (before paint, so it's
// invisible to the user) rather than Framer Motion having to reconcile an
// in-place prop swap between two different trigger modes.
//
// The scrolling viewport is the sheet (see Shell.jsx), not the window.
// `sheet.element` is reactive state (not a plain ref read) specifically so
// this effect re-runs once Shell's sheet node is actually attached — on a
// fresh full-app mount, Shell and this component mount in the same pass,
// and a plain ref read here was found to run before that ref was
// populated, silently leaving every entry on the "already visible"
// fallback (the same class of "blank until scroll" bug fixed earlier for
// Experience, just one layer deeper).
export default function RevealCard({ as = 'article', className, children }) {
  const ref = useRef(null)
  const sheet = useSheetRef()
  const sheetEl = sheet?.element
  const [animateOnScroll, setAnimateOnScroll] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !sheetEl) return
    const alreadyInView = el.getBoundingClientRect().top < sheetEl.getBoundingClientRect().bottom
    if (!alreadyInView) setAnimateOnScroll(true)
  }, [sheetEl])

  const MotionTag = motion[as]

  if (animateOnScroll) {
    return (
      <MotionTag
        key="scroll"
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3, root: sheet?.ref }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      key="mount"
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </MotionTag>
  )
}
