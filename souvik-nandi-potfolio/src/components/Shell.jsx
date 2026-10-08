import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import NavTabs from './NavTabs'
import { SheetContext } from '../context/sheet-context'
import { pages } from '../nav-pages'

const pageVariants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 14 },
}

export default function Shell() {
  const sheetRef = useRef(null)
  // On a fresh full-app mount (direct URL load), Shell and the routed page
  // mount in the same pass, and RevealCard's own mount-time measurement
  // effect (deep inside Outlet) was found to sometimes run before this
  // ref's DOM node is attached — silently leaving every entry on the
  // "already visible" fallback, including ones well below the fold.
  // Routing the node through state (via a callback ref) means a change
  // here triggers a re-render that flows through context, so consumers'
  // effects keyed on it are guaranteed to re-run once it's actually
  // attached, instead of racing a plain ref read.
  const [sheetEl, setSheetEl] = useState(null)
  const setSheetNode = (node) => {
    sheetRef.current = node
    setSheetEl(node)
  }
  const sheetContextValue = useMemo(() => ({ ref: sheetRef, element: sheetEl }), [sheetEl])
  const { pathname } = useLocation()
  // Captured as a value, not rendered as a live <Outlet/>. Outlet is a
  // mounted component that subscribes to router context directly, so if
  // it were nested inside the exiting motion.div, it would swap to the
  // *new* page's content the instant pathname changes — regardless of
  // whether that wrapper is still mid-exit-animation. That produced a real
  // bug: the outgoing page's exit fade visibly showed the incoming page's
  // content, then the real entering instance faded in on top of it,
  // reading as "appears, fades out, fades back in". Capturing the matched
  // element as a plain value freezes it for the lifetime of this specific
  // render — the preserved/exiting tree keeps showing the old page.
  const outlet = useOutlet()
  const activeIndex = pages.findIndex((page) => page.path === pathname)
  const afterCount = pages.length - 1 - activeIndex

  // The sheet's bottom edge sits a fixed --safe-bottom margin above the
  // viewport when there's no after-stack (last page active), or 20px above
  // the after-stack's front tab otherwise. CSS calc() can't branch on
  // afterCount being zero, so the two shapes are built here — but the
  // actual pixel values stay in the CSS custom properties (var()), never
  // hard-coded, matching the rest of the stacking formulas.
  const sheetBottomExtent =
    afterCount > 0
      ? `calc(var(--tab-h) + (${afterCount} - 1) * var(--tab-reveal) + var(--sheet-gap))`
      : '0px'

  // Reset scroll the moment the route changes — don't wait on the
  // transition, otherwise the outgoing page visibly scrolls under the
  // user before it fades out.
  useEffect(() => {
    if (sheetRef.current) sheetRef.current.scrollTop = 0
  }, [pathname])

  // Move focus to the new page's heading only once it has actually
  // mounted and finished entering. With AnimatePresence mode="wait", the
  // incoming page doesn't exist in the DOM until the outgoing one has
  // fully exited, so doing this on the pathname-change effect above would
  // grab the *outgoing* page's heading (or nothing) and lose focus back to
  // <body> once that element unmounts. `definition === 'animate'` filters
  // out the exit-complete call this same handler also receives right
  // before this instance unmounts.
  const handleAnimationComplete = (definition) => {
    if (definition !== 'animate') return
    const heading = sheetRef.current?.querySelector('h1')
    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus()
    }
  }

  return (
    <div className="app-shell">
      <Header />

      <div
        className="nav-stage"
        style={{
          '--before-count': activeIndex,
          '--after-count': afterCount,
          '--sheet-bottom-extent': sheetBottomExtent,
        }}
      >
        <NavTabs />

        <main className="sheet" ref={setSheetNode} tabIndex={0} aria-label="Page content">
          <div className="sheet-inner">
            <SheetContext.Provider value={sheetContextValue}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                  onAnimationComplete={handleAnimationComplete}
                >
                  {outlet}
                </motion.div>
              </AnimatePresence>
            </SheetContext.Provider>
          </div>
        </main>
      </div>
    </div>
  )
}
