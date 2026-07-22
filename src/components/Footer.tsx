import logo from '../assets/Group 2.png'
import { IconGlobe } from './icons'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <a href="/" className="nav__logo">
          <img src={logo} alt="Surwive Logo" className="nav__logo-img" />
        </a>
        <p>Your trusted partner in finding the perfect career opportunity. Get hired faster than ever.</p>
      </div>

      <nav className="footer__col" aria-label="For job seekers">
        <h4>For job seekers</h4>
        <a href="#jobs">Browse jobs</a>
        <a href="#jobs">Internships</a>
        {/* <a href="#jobs">Freelance gigs</a> */}
        <a href="#drives">Walk-in drives</a>
        {/* <a href="#main">My dashboard</a> */}
      </nav>

      <nav className="footer__col" aria-label="For employers">
        <h4>For employers</h4>
        <a href="#recruiters">Post a job</a>
        <a href="#companies">Browse companies</a>
        <a href="#drives">Hiring events</a>
        <a href="#recruiters">Employer solutions</a>
      </nav>

      <nav className="footer__col" aria-label="Company">
        <h4>Company</h4>
        <a href="#contact">Contact us</a>
        <a href="#/blog">Blog</a>
        <a href="#/faqs">FAQs</a>
        <a href="#/pricing">Pricing</a>
      </nav>

      <nav className="footer__col" aria-label="Policies">
        <h4>Policies</h4>
        <a href="#/legal/terms-and-conditions">Terms &amp; conditions</a>
        <a href="#/legal/privacy-policy">Privacy policy</a>
        <a href="#/legal/cookie-policy">Cookie policy</a>
        <a href="#/legal/data-protection">Data protection</a>
        <a href="#/legal/user-agreement">User agreement</a>
      </nav>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Surwive. All rights reserved.</span>
        <div className="footer__bottom-links">
          <span className="footer__lang"><IconGlobe /> English (US)</span>
          <a href="#/legal/privacy-policy">Privacy</a>
          <a href="#/legal/terms-and-conditions">Terms</a>
        </div>
      </div>
    </footer>
  )
}
