import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../context/useTheme'

const navItems = [
  { to: '/', label: 'Home', end: true, ready: true },
  { to: '/experience', label: 'Experience', ready: true },
  { to: '/publications', label: 'Publications', ready: true },
  { to: '/patents', label: 'Patents', ready: false },
  { to: '/contact', label: 'Contact', ready: false },
]

export default function Layout() {
  const { theme, toggleTheme } = useTheme()

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
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? 'Dark' : 'Light'} mode
        </button>
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
