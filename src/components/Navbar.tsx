import { useState } from 'react'
import logo from '../assets/Group 2.png'
import { useNavScrollState } from '../hooks/useNavScrollState'
import { IconClose, IconMenu } from './icons'

export function Navbar({ onSignup }: { onSignup: () => void }) {
  const navScrolled = useNavScrollState()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleSignup = () => {
    setMobileNavOpen(false)
    onSignup()
  }

  return (
    <header className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="/" className="nav__logo">
          <img src={logo} alt="Surwive Logo" className="nav__logo-img" />
        </a>
        <nav className={`nav__links ${mobileNavOpen ? 'nav__links--open' : ''}`} aria-label="Primary">
          <a href="#jobs" onClick={() => setMobileNavOpen(false)}>Jobs</a>
          <a href="#internships" onClick={() => setMobileNavOpen(false)}>Internships</a>
          <a href="#drives" onClick={() => setMobileNavOpen(false)}>Walk In Drives</a>
          <a href="#events" onClick={() => setMobileNavOpen(false)}>Events & Hackathons</a>
          <a href="#recruiters" onClick={() => setMobileNavOpen(false)}>For Recruiters</a>
          <button type="button" className="btn btn--outline nav__links-login" onClick={handleSignup}>
            Login
          </button>
          <button type="button" className="btn btn--solid nav__links-signup" onClick={handleSignup}>
            Sign up
          </button>
        </nav>
        <div className="nav__actions">
          <button type="button" className="nav__login" onClick={handleSignup}>
            Login
          </button>
          <button type="button" className="btn btn--solid nav__signup-desktop" onClick={handleSignup}>
            Sign up
          </button>
        </div>
        <button
          type="button"
          className="nav__toggle"
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((v) => !v)}
        >
          {mobileNavOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  )
}
