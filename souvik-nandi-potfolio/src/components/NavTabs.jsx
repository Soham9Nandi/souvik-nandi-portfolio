import { NavLink, useLocation } from 'react-router-dom'
import { pages } from '../nav-pages'

export default function NavTabs() {
  const { pathname } = useLocation()
  const activeIndex = pages.findIndex((page) => page.path === pathname)
  const afterCount = pages.length - 1 - activeIndex

  return (
    <nav className="page-tabs" aria-label="Pages">
      {pages.map((page, i) => {
        let role
        let slot
        if (i < activeIndex) {
          role = 'before'
          slot = i
        } else if (i === activeIndex) {
          role = 'active'
          slot = activeIndex
        } else {
          role = 'after'
          slot = afterCount - (i - activeIndex)
        }

        return (
          <NavLink
            key={page.path}
            to={page.path}
            end
            className={`nav-tab nav-tab--${role}`}
            style={{ '--slot': slot, zIndex: role === 'active' ? 100 : slot + 1 }}
            aria-current={role === 'active' ? 'page' : undefined}
          >
            {page.label}
          </NavLink>
        )
      })}
    </nav>
  )
}
