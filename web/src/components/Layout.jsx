import { NavLink, Link, Outlet } from 'react-router-dom'

const LINKS = [
  { to: '/', label: '홈', end: true },
  { to: '/about', label: '게임 소개' },
  { to: '/world', label: '세계관' },
  { to: '/download', label: '다운로드' },
]

export default function Layout() {
  return (
    <>
      <nav className="nav">
        <div className="nav-in">
          <Link to="/" className="brand">
            CELESTIEL
          </Link>
          <div className="nav-links">
            {LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        CELESTIEL
        <br />
        <span style={{ opacity: 0.6 }}>창세력 1347년</span>
      </footer>
    </>
  )
}
