import logo from '../assets/Group 2.png'
import { IconGlobe } from './icons'
import { Link } from './Link'

const EMPLOYER_PORTAL_URL = 'https://employer.surwive.com'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <a href="/" className="nav__logo">
          <img src={logo} alt="Surwive Logo" className="nav__logo-img" />
        </a>
        <p>Your trusted AI career partner for finding the right job and getting hired faster.</p>
      </div>

      <nav className="footer__col" aria-label="For job seekers">
        <h4>For job seekers</h4>
        <a href="/#jobs">Browse jobs</a>
        <a href="/#jobs">Internships</a>
        {/* <a href="/#jobs">Freelance gigs</a> */}
        <a href="/#drives">Walk-in drives</a>
        {/* <a href="#main">My dashboard</a> */}
      </nav>

      <nav className="footer__col" aria-label="For employers">
        <h4>For employers</h4>
        <a href={EMPLOYER_PORTAL_URL}>Post a job</a>
        <a href="/#companies">Browse companies</a>
        <a href="/#drives">Hiring events</a>
        <a href={EMPLOYER_PORTAL_URL}>Employer solutions</a>
      </nav>

      <nav className="footer__col" aria-label="Company">
        <h4>Company</h4>
        <Link href="/contact">Contact us</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/faqs">FAQs</Link>
        <Link href="/pricing">Pricing</Link>
      </nav>

      <nav className="footer__col" aria-label="Policies">
        <h4>Policies</h4>
        <Link href="/legal/terms-and-conditions">Terms &amp; conditions</Link>
        <Link href="/legal/privacy-policy">Privacy policy</Link>
        <Link href="/legal/cookie-policy">Cookie policy</Link>
        <Link href="/legal/data-protection">Data protection</Link>
        <Link href="/legal/user-agreement">User agreement</Link>
      </nav>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Surwive. All rights reserved.</span>
        <div className="footer__bottom-links">
          <span className="footer__lang"><IconGlobe /> English (US)</span>
          <Link href="/legal/privacy-policy">Privacy</Link>
          <Link href="/legal/terms-and-conditions">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
