import { useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import NavTabs from './NavTabs'
import { SheetContext } from '../context/sheet-context'
import { pages } from '../nav-pages'

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
              <Outlet />
            </SheetContext.Provider>
          </div>
        </main>
      </div>
    </div>
  )
}
