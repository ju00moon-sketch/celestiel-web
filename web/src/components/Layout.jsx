import { useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import Mark from './Mark'

const LINKS = [
  { to: '/', label: '홈', end: true },
  { to: '/about', label: '게임 소개' },
  { to: '/world', label: '세계관' },
  { to: '/download', label: '다운로드' },
]

const TITLES = {
  '/': 'CELESTIEL',
  '/about': '게임 소개 — CELESTIEL',
  '/world': '세계관 — CELESTIEL',
  '/download': '다운로드 — CELESTIEL',
}

export default function Layout() {
  const { pathname } = useLocation()

  // 페이지를 옮기면 맨 위에서 시작하고, 탭 제목도 페이지에 맞춘다
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = TITLES[pathname] ?? '404 — CELESTIEL'
  }, [pathname])

  return (
    <>
      <a className="skip" href="#main">
        본문으로 건너뛰기
      </a>
      <nav className="nav">
        <div className="nav-in">
          <Link to="/" className="brand">
            <Mark className="brand-mark" />
            <span>CELESTIEL</span>
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

      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="footer">
        <Mark className="footer-mark" size={26} />
        CELESTIEL
        <br />
        <span style={{ opacity: 0.6 }}>창세력 1347년</span>
      </footer>
    </>
  )
}
