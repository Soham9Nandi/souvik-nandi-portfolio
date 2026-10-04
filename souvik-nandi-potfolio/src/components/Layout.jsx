import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/experience', label: 'Experience' },
  { to: '/publications', label: 'Publications' },
  { to: '/patents', label: 'Patents' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <NavLink to="/" className="site-name" end>
          Souvik Nandi
        </NavLink>
        <nav className="site-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Dr. Souvik Nandi</p>
      </footer>
    </div>
  )
}
