import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import './App.css'
import logo from "./assets/Group 2.png";

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

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  )
}

function IconShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function IconDollar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M17 6.5c0-1.9-2.2-3-5-3s-5 1.1-5 3c0 1.9 2.2 2.7 5 3.3 2.8.6 5 1.4 5 3.4 0 1.9-2.2 3-5 3s-5-1.1-5-3" />
    </svg>
  )
}

function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l4 4v14H7V3Z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 12.5h5M9.5 15.5h5M9.5 9.5h2" />
    </svg>
  )
}

function IconGrad() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9l10-4 10 4-10 4L2 9Z" />
      <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2.5l2.9 6 6.6.7-4.9 4.6 1.3 6.5L12 16.9l-5.9 3.4 1.3-6.5-4.9-4.6 6.6-.7L12 2.5Z" />
    </svg>
  )
}

function IconCode() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
    </svg>
  )
}

function IconPalette() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 8 0 1 0 0 16c1.2 0 2-1 2-2 0-.6-.3-1-.6-1.4-.3-.4-.5-.7-.5-1.2 0-.9.7-1.4 1.6-1.4H16a4 4 0 0 0 4-4c0-3.3-3.6-6-8-6Z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconChartBar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10M12 20V4M20 20v-7" />
      <path d="M2 20h20" />
    </svg>
  )
}

function IconCloud() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4-1.5A4.5 4.5 0 0 0 7 18Z" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function IconMegaphone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10v4a1 1 0 0 0 1 1h2l7 4V5L6 9H4a1 1 0 0 0-1 1Z" />
      <path d="M17 9a4 4 0 0 1 0 6" />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7-4.4-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.6-9.3 9-9.3 9Z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  )
}

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
    </svg>
  )
}

function IconApple() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M16.6 12.9c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2.1s1.4-.7 2.7-.7 1.6.7 2.8.7 1.9-1 2.6-2c.8-1.2 1.1-2.3 1.2-2.4-.1-.1-2.3-.9-2.3-3.3ZM14.5 6.7c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2Z" />
    </svg>
  )
}

function IconPlayStore() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M4 3.4v17.2c0 .4.4.6.7.4l9-8.6c.2-.2.2-.6 0-.8l-9-8.6c-.3-.2-.7 0-.7.4Zm11.2 6.9 2.9-1.7c.4-.2.9 0 .9.5v5.8c0 .5-.5.7-.9.5l-2.9-1.7-2-1.7 2-1.7ZM6.6 2.7l8.6 6.4-1.9 1.8-6.7-8.2Zm0 18.6 6.7-8.2 1.9 1.8-8.6 6.4Z" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3Z" />
    </svg>
  )
}

const trendingChips = ['Remote roles', 'AI Engineer', 'Product Manager', 'UX Designer']

const trustedCompanies = ['Cobalt', 'Lumen', 'Quanta', 'Vertex', 'Beacon', 'Helios', 'Nova', 'Delta', 'Atlas', 'Orbit']

const featuredJobs = [
  { company: 'Cobalt', initial: 'C', featured: true, title: 'Senior Frontend Engineer', location: 'San Francisco', exp: '5+ yrs', remote: true, salary: '$140k – $180k' },
  { company: 'Lumen', initial: 'L', featured: false, title: 'Product Designer', location: 'Remote', exp: '3+ yrs', remote: true, salary: '$110k – $150k' },
  { company: 'Quanta', initial: 'Q', featured: true, title: 'Machine Learning Engineer', location: 'New York', exp: '4+ yrs', remote: false, salary: '$160k – $210k' },
  { company: 'Vertex', initial: 'V', featured: false, title: 'DevOps Engineer', location: 'Austin, TX', exp: '4+ yrs', remote: true, salary: '$130k – $170k' },
  { company: 'Beacon', initial: 'B', featured: false, title: 'Data Scientist', location: 'Remote', exp: '3+ yrs', remote: true, salary: '$135k – $175k' },
  { company: 'Helios', initial: 'H', featured: true, title: 'Engineering Manager', location: 'Seattle, WA', exp: '8+ yrs', remote: false, salary: '$190k – $240k' },
]

const categories = [
  { name: 'Software Development', count: '4,280 open roles', icon: <IconCode /> },
  { name: 'AI & Machine Learning', count: '1,940 open roles', icon: <IconRobot /> },
  { name: 'UI / UX Design', count: '1,120 open roles', icon: <IconPalette /> },
  { name: 'Data Science', count: '2,050 open roles', icon: <IconChartBar /> },
  { name: 'Cloud & Infra', count: '1,680 open roles', icon: <IconCloud /> },
  { name: 'Cyber Security', count: '980 open roles', icon: <IconLock /> },
  { name: 'Marketing', count: '2,410 open roles', icon: <IconMegaphone /> },
  { name: 'Finance', count: '1,530 open roles', icon: <IconDollar /> },
  { name: 'Human Resources', count: '870 open roles', icon: <IconUsers /> },
  { name: 'Healthcare', count: '1,260 open roles', icon: <IconHeart /> },
]

const whyFeatures = [
  { icon: <IconShieldCheck />, title: 'Verified Employers', body: 'Every company is vetted before a single role goes live. No ghost listings, no scams.' },
  { icon: <IconGear />, title: 'AI Job Matching', body: 'Our model reads roles the way a hiring manager does — surfacing only fits worth your time.' },
  { icon: <IconArrowUpRight />, title: 'One-click Apply', body: 'Tailored applications submitted on your behalf the moment a fitting role opens up.' },
  { icon: <IconDoc />, title: 'Resume Builder', body: 'Build one profile that speaks for you everywhere — polished, parsable, always up to date.' },
  { icon: <IconGrad />, title: 'Career Coaching', body: 'On-demand guidance from people who have sat on both sides of the interview table.' },
  { icon: <IconDollar />, title: 'Salary Insights', body: 'Know your worth before the offer. Real compensation data across roles and regions.' },
]

const matchSignals = [
  { label: 'Skills overlap', value: 96 },
  { label: 'Salary fit', value: 92 },
  { label: 'Seniority match', value: 94 },
]

const statBand = [
  { value: '25,000+', label: 'Jobs available' },
  { value: '4,800+', label: 'Hiring companies' },
  { value: '1.24M', label: 'Active candidates' },
  { value: '94%', label: 'Hiring success' },
]

const journeySteps = [
  { id: '01', title: 'Create your profile', body: 'One profile, built around your skills and trajectory — not a stack of keywords.' },
  { id: '02', title: 'Find matched jobs', body: 'See roles ranked by real fit, with a clear reason each one was recommended to you.' },
  { id: '03', title: 'Get hired faster', body: 'Apply in one tap, talk to verified recruiters, and land the offer worth taking.' },
]

const testimonials = [
  { quote: 'Surwive surfaced a role I would never have found on my own — and I had an offer within two weeks.', name: 'Aria Reyes', role: 'Product Designer at Lumen' },
  { quote: 'The matching is uncanny. Every role it showed me actually made sense for where my career is going.', name: 'Marcus Chen', role: 'ML Engineer at Quanta' },
  { quote: 'As a recruiter, the shortlist quality changed everything. My first interview is now my best one.', name: 'Priya Nair', role: 'Head of Talent at Cobalt' },
]

const recruiterStats = [
  { value: '3.2×', label: 'faster time-to-hire' },
  { value: '92%', label: 'shortlist relevance' },
  { value: '48h', label: 'avg. first interview' },
  { value: '4,800', label: 'companies hiring' },
]

const articles = [
  { tag: 'Interviews', tone: 'indigo', icon: <IconUsers />, title: 'How to answer "tell me about yourself" — without rambling', date: 'Jul 2, 2026', read: '6 min read' },
  { tag: 'Salary', tone: 'gold', icon: <IconDollar />, title: 'The negotiation script that added $22k to one offer', date: 'Jun 28, 2026', read: '8 min read' },
  { tag: 'Remote', tone: 'teal', icon: <IconCloud />, title: 'Building a portfolio that gets you remote-first roles', date: 'Jun 20, 2026', read: '5 min read' },
]

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('')
}

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

function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora__blob aurora__blob--1" />
      <span className="aurora__blob aurora__blob--2" />
      <span className="aurora__blob aurora__blob--3" />
      <span className="aurora__blob aurora__blob--4" />
    </div>
  )
}

function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'center',
  action,
}: {
  eyebrow: string
  title: string
  sub?: string
  align?: 'center' | 'left' | 'split'
  action?: ReactNode
}) {
  return (
    <div className={`section-head reveal ${align === 'left' ? 'section-head--left' : ''} ${align === 'split' ? 'section-head--split' : ''}`}>
      <div className="section-head__main">
        <span className={`eyebrow ${align === 'center' ? 'eyebrow--center' : 'eyebrow--left'}`}>{eyebrow}</span>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {action && <div className="section-head__action">{action}</div>}
    </div>
  )
}

function CopilotChatCard({ onApply }: { onApply: () => void }) {
  return (
    <div className="chatcard" aria-hidden="true">
      <div className="chatcard__head">
        <span className="chatcard__bot"><IconSpark /></span>
        <div className="chatcard__id">
          <strong>Surwive Copilot</strong>
          <span><i className="chatcard__dot" /> Online — reading 25,000+ live roles</span>
        </div>
        <span className="chatcard__live">Live</span>
      </div>

      <div className="chatcard__body">
        <div className="chatmsg chatmsg--user">
          Remote senior frontend roles, $140k+ — ideally a product-led team.
        </div>
        <div className="chatmsg chatmsg--ai">
          Scanned every open role. <strong>12 strong fits</strong> — here's your top match:
        </div>

        <div className="chatmatch">
          <div className="chatmatch__head">
            <span className="chatmatch__logo">C</span>
            <div>
              <strong>Senior Frontend Engineer</strong>
              <span>Cobalt · Remote · $140k–$180k</span>
            </div>
            <span className="chatmatch__score">96% fit</span>
          </div>
          <ul className="chatmatch__reasons">
            <li><IconCheck /> React + TypeScript depth matches your 5 yrs</li>
            <li><IconCheck /> Salary sits inside your target range</li>
            <li><IconCheck /> Remote-first, async-friendly team</li>
          </ul>
          <div className="chatmatch__actions">
            <button type="button" className="btn btn--solid btn--sm" onClick={onApply} tabIndex={-1}>Apply now</button>
            <button type="button" className="btn btn--outline btn--sm" tabIndex={-1}>Save for later</button>
          </div>
        </div>

        <div className="chatcard__typing">
          <span /><span /><span />
          ranking 11 more matches…
        </div>
      </div>

      <div className="chatcard__input">
        <span className="chatcard__input-icon"><IconSpark /></span>
        <span className="chatcard__placeholder">Ask anything — "compare my top three"</span>
        <span className="chatcard__send"><IconSend /></span>
      </div>
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await submitToGoogleSheet({ role: 'newsletter', email, submittedAt: new Date().toISOString() })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="newsletter__form" onSubmit={handleSubmit}>
      <span className="newsletter__icon"><IconMail /></span>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
      />
      <button type="submit" className="btn btn--solid" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Joining…' : 'Subscribe'} <IconArrowUpRight />
      </button>
      {status === 'success' && <span className="newsletter__status newsletter__status--success">You're on the list!</span>}
      {status === 'error' && <span className="newsletter__status newsletter__status--error">Something went wrong.</span>}
    </form>
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

      <div className="announce">
        <IconSpark /> 25,000+ new jobs added this month — powered by AI matching
      </div>

      <header className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="/" className="nav__logo">
            <img src={logo} alt="Surwive Logo" className="nav__logo-img" />
          </a>
          <nav className={`nav__links ${mobileNavOpen ? 'nav__links--open' : ''}`} aria-label="Primary">
            <a href="#jobs" onClick={() => setMobileNavOpen(false)}>Jobs</a>
            <a href="#companies" onClick={() => setMobileNavOpen(false)}>Companies</a>
            <a href="#how" onClick={() => setMobileNavOpen(false)}>How it works</a>
            <a href="#resources" onClick={() => setMobileNavOpen(false)}>Career Resources</a>
            <a href="#recruiters" onClick={() => setMobileNavOpen(false)}>For Recruiters</a>
            <button type="button" className="btn btn--outline nav__links-login" onClick={() => openSignup('candidate')}>
              Login
            </button>
            <button type="button" className="btn btn--solid nav__links-signup" onClick={() => openSignup('candidate')}>
              Sign up
            </button>
          </nav>
          <div className="nav__actions">
            <button type="button" className="nav__login" onClick={() => openSignup('candidate')}>
              Login
            </button>
            <button type="button" className="btn btn--solid nav__signup-desktop" onClick={() => openSignup('candidate')}>
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

      <main id="main">
        <section className="hero">
          <div className="hero__copy">
            <a href="#copilot" className="hero__badge reveal">
              <span className="hero__badge-new">New</span>
              AI copilot now matches you in real time
              <IconArrowUpRight />
            </a>

            <h1 className="hero__title reveal" style={{ transitionDelay: '70ms' }}>
              Stop searching.<br />
              <span className="hero__title-accent">Let AI match you.</span>
            </h1>

            <p className="hero__sub reveal" style={{ transitionDelay: '140ms' }}>
              Describe the role you want in plain words. Our copilot reads every listing,
              reasons about fit, and hands you a ranked shortlist — not a keyword dump.
            </p>

            <form
              className="hero-prompt reveal"
              style={{ transitionDelay: '210ms' }}
              onSubmit={(e) => { e.preventDefault(); openSignup('candidate') }}
            >
              <span className="hero-prompt__icon"><IconSpark /></span>
              <input
                type="text"
                placeholder='Try "remote senior frontend, $140k+"'
                aria-label="Describe your ideal role"
              />
              <button type="submit" className="btn btn--solid hero-prompt__btn">
                Match me <IconArrowUpRight />
              </button>
            </form>

            <div className="trending-row reveal" style={{ transitionDelay: '280ms' }}>
              <span>Trending:</span>
              {trendingChips.map((chip) => (
                <a href="#jobs" key={chip}>{chip}</a>
              ))}
            </div>

            <div className="hero__proof reveal" role="list" style={{ transitionDelay: '340ms' }}>
              <span className="pill" role="listitem"><IconSpark /> 98% matching accuracy</span>
              <span className="pill" role="listitem"><IconGear /> AI-powered tools</span>
              <span className="pill" role="listitem"><IconShieldCheck /> Verified employers</span>
            </div>
          </div>

          <div className="hero__panel reveal reveal--panel" style={{ transitionDelay: '180ms' }}>
            <div className="hero__panel-glow" aria-hidden="true" />
            <CopilotChatCard onApply={() => openSignup('candidate')} />

            <div className="hero-float hero-float--salary" aria-hidden="true">
              <span className="hero-float__icon"><IconSpark /></span>
              <div>
                <span className="hero-float__value">$150k+</span>
                <span className="hero-float__label">senior roles this week</span>
              </div>
            </div>

            <div className="hero-float hero-float--match" aria-hidden="true">
              <span className="hero-float__avatar">A</span>
              <div>
                <span className="hero-float__value">Offer signed</span>
                <span className="hero-float__label">Aria R. <em className="hero-float__score">14 days from match</em></span>
              </div>
            </div>
          </div>
        </section>

        <section className="trusted" id="companies">
          <span className="trusted__label reveal">Trusted by teams hiring at 4,800+ companies</span>
          <div className="marquee reveal">
            <div className="marquee__track">
              {[...trustedCompanies, ...trustedCompanies].map((name, i) => (
                <span className="marquee__item" key={`${name}-${i}`}><i />{name}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="jobs-section" id="jobs">
          <SectionHead
            align="split"
            eyebrow="Featured roles"
            title="Hand-picked jobs, ranked by fit"
            sub="Every role verified and scored against your profile — so the first ones you see are the ones worth your morning coffee."
            action={
              <button type="button" className="link-arrow" onClick={() => openSignup('candidate')}>
                View all jobs <IconArrowUpRight />
              </button>
            }
          />
          <div className="jobs-grid">
            {featuredJobs.map((job, i) => (
              <article className="job-card reveal" key={job.title} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="job-card__top">
                  <span className="job-card__logo">{job.initial}</span>
                  {job.featured && (
                    <span className="job-card__badge"><IconStar /> Featured</span>
                  )}
                </div>
                <span className="job-card__company">{job.company}</span>
                <h3 className="job-card__title">{job.title}</h3>
                <div className="job-card__meta">
                  <span><IconPin /> {job.location}</span>
                  <span>{job.exp}</span>
                  {job.remote && <span className="job-card__remote">Remote</span>}
                </div>
                <div className="job-card__foot">
                  <span className="job-card__salary">{job.salary}<small>per year</small></span>
                  <button type="button" className="btn btn--outline job-card__apply" onClick={() => openSignup('candidate')}>
                    Apply
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cat-section">
          <SectionHead
            eyebrow="Explore"
            title="Browse by category"
            sub="Find your field. New roles land in every category every day."
          />
          <div className="cat-grid">
            {categories.map((cat, i) => (
              <a href="#jobs" className="cat-card reveal" key={cat.name} style={{ transitionDelay: `${(i % 5) * 60}ms` }}>
                <span className="cat-card__icon">{cat.icon}</span>
                <span className="cat-card__name">{cat.name}</span>
                <span className="cat-card__count">{cat.count}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="why-section">
          <SectionHead
            eyebrow="Why Surwive"
            title="Everything you need to get hired"
            sub="A complete toolkit built around your skills — not your keywords."
          />
          <div className="why-grid">
            {whyFeatures.map((f, i) => (
              <div className="why-card reveal" key={f.title} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <span className="why-card__icon">{f.icon}</span>
                <h3 className="why-card__title">{f.title}</h3>
                <p className="why-card__body">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="copilot" id="copilot">
          <div className="copilot__copy reveal">
            <span className="eyebrow eyebrow--left">AI copilot</span>
            <h2>Your job search, with a brain behind it</h2>
            <p>
              Ask in plain language. The copilot reasons over every open role, weighs your
              skills and goals, and explains exactly why each match made the list.
            </p>
            <ul className="copilot__points">
              <li>
                <strong>Natural-language search</strong>
                <span>No boolean filters. Just say what you want the way you'd tell a friend.</span>
              </li>
              <li>
                <strong>Transparent reasoning</strong>
                <span>Every match comes with the "why" — the exact signals that earned its score.</span>
              </li>
              <li>
                <strong>Learns as you go</strong>
                <span>Skip a role or save one, and the next shortlist gets sharper.</span>
              </li>
            </ul>
          </div>
          <div className="copilot__panel reveal reveal--panel" style={{ transitionDelay: '120ms' }} aria-hidden="true">
            <span className="copilot__panel-live">Live</span>
            <div className="copilot__panel-bar"><span /><span /><span /></div>
            <div className="copilot__panel-query">"Find me senior frontend roles, remote, $140k+"</div>
            <div className="copilot__panel-match">
              <div className="copilot__panel-match-head">
                <span className="copilot__panel-avatar">C</span>
                <div>
                  <strong>Senior Frontend Engineer</strong>
                  <span>Cobalt · Remote · $140k–$180k</span>
                </div>
                <span className="copilot__panel-score">96% match</span>
              </div>
              <div className="copilot__signals">
                {matchSignals.map((s) => (
                  <div className="copilot__signal" key={s.label}>
                    <span>{s.label}</span>
                    <span className="copilot__meter"><i style={{ width: `${s.value}%` }} /></span>
                    <b>{s.value}%</b>
                  </div>
                ))}
              </div>
            </div>
            <div className="copilot__panel-foot">
              <span className="chatcard__input-icon"><IconSpark /></span>
              <span>Why did this one make the list?</span>
              <span className="chatcard__send"><IconSend /></span>
            </div>
          </div>
        </section>

        <section className="statsband reveal">
          <div className="statsband__inner">
            {statBand.map((s) => (
              <div className="statsband__item" key={s.label}>
                <span className="statsband__value">{s.value}</span>
                <span className="statsband__label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="journey" id="how" aria-label="How Surwive works">
          <SectionHead eyebrow="How it works" title="Three steps to your next role" />
          <ol className="journey__grid">
            {journeySteps.map((step, i) => (
              <li className="journey__step reveal" key={step.id} style={{ transitionDelay: `${i * 130}ms` }}>
                <span className="journey__node">{step.id}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="journey__cta reveal">
            <button type="button" className="btn btn--solid" onClick={() => openSignup('candidate')}>
              Create your profile <IconArrowUpRight />
            </button>
          </div>
        </section>

        <section className="testimonials">
          <SectionHead eyebrow="Loved by professionals" title="People who found their fit" />
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <figure className="testimonial-card reveal" key={t.name} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="testimonial-card__stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, idx) => <IconStar key={idx} />)}
                </div>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  <span className="testimonial-card__avatar">{initials(t.name)}</span>
                  <span className="testimonial-card__who">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="recruiter" id="recruiters">
          <div className="recruiter__panel reveal reveal--panel">
            <div className="recruiter__copy">
              <span className="eyebrow eyebrow--ink">For recruiters</span>
              <h2>A shortlist worth reading, not a pile worth sorting.</h2>
              <p>
                Skip the keyword filters. Surwive ranks applicants against the role you actually
                opened — so your first interview is with someone worth interviewing.
              </p>
              <ul className="checklist checklist--ink">
                <li>Reach candidates actively looking for this exact role</li>
                <li>Screen by verified skills, not résumé formatting</li>
                <li>Fill roles in days, not job-board months</li>
              </ul>
              <div className="recruiter__ctas">
                <button type="button" className="btn btn--ink" onClick={() => openSignup('employer')}>
                  Post a job <IconArrowUpRight />
                </button>
                <button type="button" className="btn btn--outline-ink" onClick={() => openSignup('employer')}>
                  See pricing
                </button>
              </div>
            </div>
            <div className="recruiter__stats">
              {recruiterStats.map((s) => (
                <div className="recruiter__stat" key={s.label}>
                  <span>{s.value}</span>
                  <small>{s.label}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="articles-section" id="resources">
          <SectionHead
            align="split"
            eyebrow="Career resources"
            title="Guides to move your career forward"
            action={
              <a className="link-arrow" href="#resources">
                All articles <IconArrowUpRight />
              </a>
            }
          />
          <div className="articles-grid">
            {articles.map((a, i) => (
              <article className="article-card reveal" key={a.title} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className={`article-card__cover article-card__cover--${a.tone}`}>
                  <span className="article-card__cover-icon">{a.icon}</span>
                  <span className="article-card__tag">{a.tag}</span>
                </div>
                <div className="article-card__body">
                  <h3>{a.title}</h3>
                  <span className="article-card__meta">{a.date} · {a.read}</span>
                  <span className="article-card__link">Read guide <IconArrowUpRight /></span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="appsection">
          <div className="appsection__copy reveal">
            <span className="eyebrow eyebrow--left">Mobile app</span>
            <h2>Your job search, in your pocket</h2>
            <p>
              Get instant match alerts, apply in one tap, and message recruiters on the go.
              Everything on desktop, now mobile.
            </p>
            <ul className="checklist">
              <li>Instant match alerts, the moment a role opens</li>
              <li>Apply in one tap from anywhere</li>
              <li>Message recruiters on the go</li>
            </ul>
            <div className="appsection__stores">
              <button type="button" className="store-btn" onClick={() => openSignup('candidate')}>
                <IconApple />
                <span><small>Download on the</small>App Store</span>
              </button>
              <button type="button" className="store-btn" onClick={() => openSignup('candidate')}>
                <IconPlayStore />
                <span><small>Get it on</small>Google Play</span>
              </button>
            </div>
          </div>
          <div className="appsection__phone reveal reveal--panel" style={{ transitionDelay: '120ms' }} aria-hidden="true">
            <div className="phone">
              <div className="phone__notch" />
              <div className="phone__screen">
                <div className="phone__head">
                  <span className="phone__logo"><IconSpark /></span>
                  <span className="phone__bar phone__bar--head" />
                </div>
                <div className="phone__card">
                  <div className="phone__card-top">
                    <span className="phone__avatar" />
                    <span className="phone__fit">96% fit</span>
                  </div>
                  <span className="phone__bar phone__bar--sm" />
                  <span className="phone__bar phone__bar--xs" />
                </div>
                <div className="phone__card">
                  <div className="phone__card-top">
                    <span className="phone__avatar phone__avatar--alt" />
                    <span className="phone__fit phone__fit--alt">91% fit</span>
                  </div>
                  <span className="phone__bar phone__bar--sm" />
                  <span className="phone__bar phone__bar--xs" />
                </div>
                <div className="phone__card">
                  <div className="phone__card-top">
                    <span className="phone__avatar phone__avatar--warm" />
                    <span className="phone__fit">89% fit</span>
                  </div>
                  <span className="phone__bar phone__bar--sm" />
                  <span className="phone__bar phone__bar--xs" />
                </div>
                <span className="phone__pill"><IconSpark /> Match alert</span>
              </div>
            </div>
          </div>
        </section>

        <section className="newsletter reveal">
          <h2>Get matched roles in your inbox</h2>
          <p>One curated email a week. The best roles for your profile — no noise, no spam.</p>
          <NewsletterForm />
          <span className="newsletter__note">Join 120,000+ professionals. Unsubscribe anytime.</span>
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
          <a href="#jobs">Browse jobs</a>
          <a href="#jobs">Internships</a>
          <a href="#jobs">Freelance gigs</a>
          <a href="#resources">Courses</a>
          <a href="#main">My dashboard</a>
        </nav>

        <nav className="footer__col" aria-label="For employers">
          <h4>For employers</h4>
          <a href="#recruiters">Post a job</a>
          <a href="#companies">Browse companies</a>
          <a href="#recruiters">Pricing</a>
          <a href="#resources">Resources</a>
          <a href="#recruiters">Employer solutions</a>
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
          <span>© {new Date().getFullYear()} Surwive. All rights reserved.</span>
          <div className="footer__bottom-links">
            <span className="footer__lang"><IconGlobe /> English (US)</span>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
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
