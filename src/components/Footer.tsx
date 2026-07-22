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
        <a href="#privacy">Privacy policy</a>
        <a href="#terms">Terms of service</a>
        <a href="#cookies">Cookie policy</a>
      </nav>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Surwive. All rights reserved.</span>
        <div className="footer__bottom-links">
          <span className="footer__lang"><IconGlobe /> English (US)</span>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  )
}
