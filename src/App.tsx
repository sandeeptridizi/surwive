import { useEffect, useState, type FormEvent } from 'react'
import './App.css'
import logo from "./assets/Group 2.png";
import controlHub from "./assets/Control Hub.png";
import dashboardImg from "./assets/Dashboard.png";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXl3P8SeRYzVGO4mSF9pU3_7n6gI_5PrkpSdfN7VfR6MYZaPG28G_xsIcl_gN2cV3F/exec";

async function submitToGoogleSheet(data: Record<string, string>) {
  if (!GOOGLE_SCRIPT_URL) throw new Error('missing-endpoint')
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: new URLSearchParams(data),
  })
}

function IconRobot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 8V4" />
      <circle cx="12" cy="3" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9 17h6" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
      <path d="M10.5 12.5v1.6h3v-1.6" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 19.5c.8-3.4 3.4-5.3 6.5-5.3s5.7 1.9 6.5 5.3" />
      <circle cx="17.5" cy="8.5" r="2.3" />
      <path d="M16 14.6c2.6.2 4.6 2 5.3 4.9" />
    </svg>
  )
}

function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2.5c.5 3.6 1.4 6 2.9 7.4 1.4 1.5 3.8 2.4 7.4 2.9-3.6.5-6 1.4-7.4 2.9-1.5 1.4-2.4 3.8-2.9 7.4-.5-3.6-1.4-6-2.9-7.4C7.6 14.2 5.2 13.3 1.6 12.8c3.6-.5 6-1.4 7.5-2.9 1.5-1.4 2.4-3.8 2.9-7.4Z" />
    </svg>
  )
}

function IconGear() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.4M12 18.1v2.4M20.5 12h-2.4M5.9 12H3.5M17.7 6.3l-1.7 1.7M8 16l-1.7 1.7M17.7 17.7 16 16M8 8 6.3 6.3" />
    </svg>
  )
}

function IconArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}


function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="10" height="18" rx="1.2" />
      <rect x="14" y="9" width="6" height="12" rx="1.2" />
      <path d="M7 7h1M11 7h1M7 11h1M11 11h1M7 15h1M11 15h1" />
      <path d="M16.5 12.5h1M16.5 16h1" />
    </svg>
  )
}


const steps = [
  {
    id: '01',
    icon: <IconRobot />,
    title: 'Auto‑apply',
    body: 'Surwive submits tailored applications on your behalf the moment a fitting role opens up no more copy‑pasting the same résumé forty times.',
  },
  {
    id: '02',
    icon: <IconBriefcase />,
    title: 'Job matching',
    body: 'Our model reads roles the way a hiring manager does skills, seniority, and trajectory and surfaces only the ones worth your time.',
  },
  {
    id: '03',
    icon: <IconUsers />,
    title: 'Candidate matching',
    body: 'Employers get a ranked shortlist instead of a resume pile, so the right conversation starts on day one, not day twenty.',
  },
]

const jobSearches = [
  'Software Engineer', 'Full Stack Developer', 'Data Scientist', 'Product Manager',
  'UX Designer', 'DevOps Engineer', 'Business Analyst', 'Digital Marketing',
  'Project Manager', 'Sales Executive', 'Content Writer', 'HR Manager',
  'Financial Analyst', 'Graphic Designer', 'React Developer', 'Python Developer',
  'Machine Learning Engineer', 'Cloud Architect', 'Cybersecurity Analyst', 'Mobile App Developer',
]

const internshipSearches = [
  'Summer Internship', 'Software Development Internship', 'Marketing Internship',
  'Data Analytics Internship', 'Finance Internship', 'HR Internship', 'Design Internship',
  'Engineering Internship', 'Research Internship', 'Consulting Internship', 'Sales Internship',
  'Content Writing Internship', 'Product Management Internship', 'Business Development Internship',
  'Web Development Internship', 'Mobile App Internship', 'AI/ML Internship',
  'Cloud Computing Internship', 'Cybersecurity Internship', 'Operations Internship',
]


function useScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!targets.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}


function useNavScrollState() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrolled
  
}


function SignalHero() {
  return (
    <div className="signal reveal" style={{ transitionDelay: '420ms' }} aria-hidden="true">
      <svg viewBox="0 0 640 260" className="signal__svg">
        <path id="pathToAI" className="signal__wire" d="M96,150 C 190,150 200,90 280,90" />
        <path id="pathToCo" className="signal__wire" d="M360,90 C 440,90 450,150 544,150" />
        <circle className="signal__pulse" r="4" fill="var(--accent)">
          <animateMotion dur="3.2s" repeatCount="indefinite" begin="0s">
            <mpath href="#pathToAI" />
          </animateMotion>
        </circle>
        <circle className="signal__pulse" r="4" fill="var(--accent)">
          <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.6s">
            <mpath href="#pathToCo" />
          </animateMotion>
        </circle>
      </svg>

      <div className="signal__node signal__node--candidate">
        <span className="signal__glyph signal__glyph--indigo"><IconUsers /></span>
        <span className="signal__label">Candidate</span>
      </div>

      <div className="signal__node signal__node--ai">
        <span className="signal__ring" />
        <span className="signal__glyph signal__glyph--gold"><IconGear /></span>
        <span className="signal__label">AI Match</span>
      </div>

      <div className="signal__node signal__node--company">
        <span className="signal__glyph signal__glyph--orange"><IconBuilding /></span>
        <span className="signal__label">Company</span>
      </div>
    </div>
  )
}

function TagRow({ items }: { items: string[] }) {
  return (
    <ul className="tagrow">
      {items.map((item, i) => (
        <li key={item} className="tag-pop" style={{ transitionDelay: `${Math.min(i, 12) * 30}ms` }}>
          <button type="button" className="tag">{item}</button>
        </li>
      ))}
    </ul>
  )
}


function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora__blob aurora__blob--1" />
      <span className="aurora__blob aurora__blob--2" />
      <span className="aurora__blob aurora__blob--3" />
    </div>
  )
}

type SignupRole = 'candidate' | 'employer'
type ExperienceLevel = 'fresher' | 'experienced'

function SignupModal({
  role,
  onRoleChange,
  onClose,
}: {
  role: SignupRole
  onRoleChange: (role: SignupRole) => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('fresher')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobPosition, setJobPosition] = useState('')
  const [openPositions, setOpenPositions] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function resetFields() {
    setName('')
    setEmail('')
    setPhone('')
    setJobTitle('')
    setExperienceLevel('fresher')
    setYearsOfExperience('')
    setCompanyName('')
    setJobPosition('')
    setOpenPositions('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const data: Record<string, string> =
        role === 'candidate'
          ? {
              role,
              name,
              email,
              phone,
              jobTitle,
              experienceLevel,
              yearsOfExperience: experienceLevel === 'experienced' ? yearsOfExperience : '',
            }
          : {
              role,
              companyName,
              name,
              email,
              phone,
              jobPosition,
              openPositions,
            }
      await submitToGoogleSheet({ ...data, submittedAt: new Date().toISOString() })
      setStatus('success')
      resetFields()
    } catch {
      setStatus('error')
      setErrorText(
        GOOGLE_SCRIPT_URL
          ? "Something went wrong sending that — please try again."
          : "Signups aren't connected yet. Set VITE_GOOGLE_SCRIPT_URL to your Google Apps Script endpoint."
      )
    }
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="signup-modal-title">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          <IconClose />
        </button>

        <span className="eyebrow eyebrow--left">Get started</span>
        <h2 id="signup-modal-title">Join Surwive</h2>
        <p>Tell us a little about you and we'll be in touch with matches worth your time.</p>

        <div className="modal__role-toggle" role="radiogroup" aria-label="I am">
          <label className={`modal__role-btn ${role === 'candidate' ? 'is-active' : ''}`}>
            <input
              type="radio"
              name="signup-audience"
              value="candidate"
              checked={role === 'candidate'}
              onChange={() => onRoleChange('candidate')}
            />
            Looking for a job
          </label>
          <label className={`modal__role-btn ${role === 'employer' ? 'is-active' : ''}`}>
            <input
              type="radio"
              name="signup-audience"
              value="employer"
              checked={role === 'employer'}
              onChange={() => onRoleChange('employer')}
            />
            Looking to hire
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          {role === 'employer' && (
            <div className="modal__field">
              <label htmlFor="signup-company">Company name</label>
              <input
                id="signup-company"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
          )}

          <div className="modal__field">
            <label htmlFor="signup-name">Full name</label>
            <input
              id="signup-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
            />
          </div>

          <div className="modal__field">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@email.com"
            />
          </div>

          <div className="modal__field">
            <label htmlFor="signup-phone">Phone number</label>
            <input
              id="signup-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555 000 0000"
            />
          </div>

          {role === 'candidate' ? (
            <>
              <div className="modal__field">
                <label htmlFor="signup-job-title">Job title</label>
                <input
                  id="signup-job-title"
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Frontend engineer"
                />
              </div>

              <div className="modal__field">
                <label>Experience level</label>
                <div className="modal__role-toggle modal__role-toggle--sub" role="radiogroup" aria-label="Experience level">
                  <label className={`modal__role-btn ${experienceLevel === 'fresher' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="signup-experience-level"
                      value="fresher"
                      checked={experienceLevel === 'fresher'}
                      onChange={() => setExperienceLevel('fresher')}
                    />
                    Fresher
                  </label>
                  <label className={`modal__role-btn ${experienceLevel === 'experienced' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="signup-experience-level"
                      value="experienced"
                      checked={experienceLevel === 'experienced'}
                      onChange={() => setExperienceLevel('experienced')}
                    />
                    Experienced
                  </label>
                </div>
              </div>

              {experienceLevel === 'experienced' && (
                <div className="modal__field">
                  <label htmlFor="signup-years">Years of experience</label>
                  <input
                    id="signup-years"
                    type="number"
                    min={0}
                    step="0.5"
                    required
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    placeholder="e.g. 3"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="modal__field">
                <label htmlFor="signup-job-position">Job position</label>
                <input
                  id="signup-job-position"
                  type="text"
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  placeholder="e.g. Backend engineer"
                />
              </div>

              <div className="modal__field">
                <label htmlFor="signup-open-positions">Number of open positions</label>
                <input
                  id="signup-open-positions"
                  type="number"
                  min={1}
                  step="1"
                  required
                  value={openPositions}
                  onChange={(e) => setOpenPositions(e.target.value)}
                  placeholder="e.g. 2"
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn--solid modal__submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Submit'} <IconArrowUpRight />
          </button>

          {status === 'success' && (
            <p className="modal__status modal__status--success">Thanks — we'll be in touch soon.</p>
          )}
          {status === 'error' && <p className="modal__status modal__status--error">{errorText}</p>}
        </form>
      </div>
    </div>
  )
}

function App() {
  useScrollReveal()
  const navScrolled = useNavScrollState()
  const [signupModal, setSignupModal] = useState<{ open: boolean; role: SignupRole }>({
    open: true,
    role: 'candidate',
  })
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const openSignup = (role: SignupRole) => {
    setMobileNavOpen(false)
    setSignupModal({ open: true, role })
  }
  const closeSignup = () => setSignupModal((s) => ({ ...s, open: false }))

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <AuroraBackground />

      <header className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
        <a href="/" className="nav__logo">
          <img src={logo} alt="Surwive Logo" className="nav__logo-img" />
        </a>
        <nav className={`nav__links ${mobileNavOpen ? 'nav__links--open' : ''}`} aria-label="Primary">
          <a href="#jobs" onClick={() => setMobileNavOpen(false)}>Jobs</a>
          <a href="#internships" onClick={() => setMobileNavOpen(false)}>Internships</a>
          <a href="#companies" onClick={() => setMobileNavOpen(false)}>Companies</a>
          <button type="button" className="btn btn--ghost nav__links-signup" onClick={() => openSignup('candidate')}>
            Sign up
          </button>
        </nav>
        <button type="button" className="btn btn--ghost nav__signup-desktop" onClick={() => openSignup('candidate')}>
          Sign up
        </button>
        <button
          type="button"
          className="nav__toggle"
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((v) => !v)}
        >
          {mobileNavOpen ? <IconClose /> : <IconMenu />}
        </button>
      </header>

      <main id="main">
        <section className="hero">
          <div
            className="hero-search reveal"
            style={{ transitionDelay: "0ms" }}
          >
            <span className="hero-search__icon-wrap">
              <svg
                className="hero-search__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="M20 20l-4.85-4.85" />
              </svg>
            </span>

            <span className="hero-search__placeholder">
              <span className="hero-search__static">Search</span>
              <span className="typewriter">
                <span>Jobs</span>
                <span>Internships</span>
                <span>Companies</span>
              </span>
            </span>
          </div>
          <h1 className="hero__title reveal" style={{ transitionDelay: '80ms' }}>
            AI‑Powered<br />
            <span className="hero__title--accent">Career Intelligence</span>
          </h1>
          <p className="hero__sub reveal" style={{ transitionDelay: '160ms' }}>
            One quiet engine, working around the clock reading roles, ranking fit, and
            putting the right person in front of the right company.
          </p>

          <div className="hero__stats reveal" role="list" style={{ transitionDelay: '240ms' }}>
            <span className="pill" role="listitem"><IconSpark /> 98% matching accuracy</span>
            <span className="pill" role="listitem"><IconGear /> AI‑powered tools</span>
            <span className="pill" role="listitem"><IconArrowUpRight /> Smart automation</span>
          </div>

          <div className="hero__ctas reveal" style={{ transitionDelay: '320ms' }}>
            <button type="button" className="btn btn--solid" onClick={() => openSignup('candidate')}>
              I'm a Candidate <IconArrowUpRight />
            </button>
            <button type="button" className="btn btn--outline" onClick={() => openSignup('employer')}>
              I'm an Employer
            </button>
          </div>

          <SignalHero />
        </section>

        <section className="steps" aria-label="How Surwive works">
          <ol className="steps__grid">
            {steps.map((step, i) => (
              <li
                className="step reveal"
                key={step.id}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <span className="step__index">{step.id}</span>
                <span className="step__icon">{step.icon}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="feature" id="candidate">
          <div className="feature__panel reveal reveal--panel" aria-hidden="true">
            <div className="mock mock--candidate">
              <img
                src={controlHub}
                alt="Control Hub"
                className="mock__image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="feature__copy reveal" style={{ transitionDelay: '120ms' }}>
            <span className="eyebrow eyebrow--left">For candidates</span>
            <h2>A platform built around your skills, not your keywords</h2>
            <p>
              Our matching model reads experience the way a person would, then surfaces the
              roles worth your morning coffee.
            </p>
            <ul className="checklist">
              <li>Rank opportunities by real fit, not just title match</li>
              <li>See exactly why a role was recommended to you</li>
              <li>Keep one profile that speaks for you everywhere</li>
            </ul>
            <button type="button" className="btn btn--solid" onClick={() => openSignup('candidate')}>
              Explore as candidate <IconArrowUpRight />
            </button>
          </div>
        </section>

        <section className="feature feature--reverse" id="companies">
          <div className="feature__copy reveal">
            <span className="eyebrow eyebrow--left">For employers</span>
            <h2>A shortlist worth reading, not a pile worth sorting</h2>
            <p>
              Skip the keyword filters. Surwive ranks applicants against the role you actually
              opened, so your first interview is with someone worth interviewing.
            </p>
            <ul className="checklist">
              <li>Post once, reach candidates actively looking for this exact role</li>
              <li>Screen by verified skills instead of résumé formatting</li>
              <li>Fill roles in days, not job‑board months</li>
            </ul>
            <button type="button" className="btn btn--solid" onClick={() => openSignup('employer')}>
              Explore as company <IconArrowUpRight />
            </button>
          </div>
          <div className="feature__panel reveal reveal--panel" style={{ transitionDelay: '120ms' }} aria-hidden="true">
            <div className="mock mock--company">
              <img
                src={dashboardImg}
                alt="Dashboard"
                className="mock__image"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="search" id="jobs">
          <span className="eyebrow eyebrow--center reveal">AI trending searches</span>
          <h2 className="search__title reveal" style={{ transitionDelay: '60ms' }}>
            Popular search queries
          </h2>
          <p className="search__sub reveal" style={{ transitionDelay: '120ms' }}>
            See what other people are searching for, and find your own way into a new match.
          </p>

          <div className="search__card reveal" style={{ transitionDelay: '0ms' }}>
            <span className="search__icon"><IconBriefcase /></span>
            <h3>Popular job searches</h3>
            <p>Trending roles across every field on Surwive right now.</p>
            <TagRow items={jobSearches} />
          </div>

          <div className="search__card reveal" id="internships" style={{ transitionDelay: '100ms' }}>
            <span className="search__icon"><IconUsers /></span>
            <h3>Popular internship searches</h3>
            <p>A first step into the field you're building toward.</p>
            <TagRow items={internshipSearches} />
          </div>
        </section>

        <section className="cta reveal" id="signup">
          <h2>Ready to start your journey?</h2>
          <p>Join thousands of professionals who found their next role through Surwive.</p>
          <div className="cta__actions">
            <button type="button" className="btn btn--dark" onClick={() => openSignup('candidate')}>
              Sign up as candidate
            </button>
            <button type="button" className="btn btn--outline-dark" onClick={() => openSignup('employer')}>
              Post opportunities
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__brand">
          <a href="/" className="nav__logo">
            <img src={logo} alt="Surwive Logo" className="nav__logo-img" />
          </a>
          <p>Your trusted partner in finding the perfect career opportunity. Get hired faster than ever.</p>
        </div>

        <nav className="footer__col" aria-label="For job seekers">
          <h4>For job seekers</h4>
          <a href="#browse-jobs">Browse jobs</a>
          <a href="#internships">Internships</a>
          <a href="#freelance">Freelance gigs</a>
          <a href="#courses">Courses</a>
          <a href="#tutors">Find tutors</a>
          <a href="#dashboard">My dashboard</a>
        </nav>

        <nav className="footer__col" aria-label="For employers">
          <h4>For employers</h4>
          <a href="#post-job">Post a job</a>
          <a href="#browse-companies">Browse companies</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
          <a href="#employer-solutions">Employer solutions</a>
        </nav>

        <nav className="footer__col" aria-label="Company">
          <h4>Company</h4>
          <a href="#about">About us</a>
          <a href="#contact">Contact us</a>
          <a href="#privacy">Privacy policy</a>
          <a href="#terms">Terms of service</a>
          <a href="#cookies">Cookie policy</a>
        </nav>

        <div className="footer__bottom">
          © {new Date().getFullYear()} Surwive. All rights reserved.
        </div>
      </footer>

      {signupModal.open && (
        <SignupModal
          role={signupModal.role}
          onRoleChange={(role) => setSignupModal((s) => ({ ...s, role }))}
          onClose={closeSignup}
        />
      )}
    </>
  )
}

export default App