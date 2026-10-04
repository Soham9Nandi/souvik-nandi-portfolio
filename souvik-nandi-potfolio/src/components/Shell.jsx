import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()
  const activeIndex = pages.findIndex((page) => page.path === pathname)
  const afterCount = pages.length - 1 - activeIndex

  // The sheet's bottom edge sits a fixed --safe-bottom margin above the
  // viewport when there's no after-stack (Contact active), or 20px above
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

        <main className="sheet" ref={sheetRef} tabIndex={0} aria-label="Page content">
          <div className="sheet-inner">
            <SheetContext.Provider value={sheetRef}>
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
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </SheetContext.Provider>
          </div>
        </main>
      </div>
    </div>
  )
}
