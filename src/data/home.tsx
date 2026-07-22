import type { ReactNode } from 'react'
import logo1 from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import logo3 from '../assets/logo3.png'
import logo4 from '../assets/logo4.png'
import logo5 from '../assets/logo5.png'
import logo6 from '../assets/logo6.png'
import logo7 from '../assets/logo7.png'
import { IconArrowUpRight, IconDoc, IconGear, IconGrad, IconRupee, IconShieldCheck } from '../components/icons'

export const trustedLogos: { src: string; invert?: boolean }[] = [
  { src: logo1, invert: true },
  { src: logo2 },
  { src: logo3 },
  { src: logo4 },
  { src: logo5, invert: true },
  { src: logo6 },
  { src: logo7 },
]

export const whyFeatures: { icon: ReactNode; title: string; body: string; size?: 'hero' | 'wide' }[] = [
  { icon: <IconGear />, title: 'AI Job Matching', body: 'Our model reads roles the way a hiring manager does — scoring every opening against your skills, salary target, and seniority before it ever reaches you.', size: 'hero' },
  { icon: <IconShieldCheck />, title: 'Verified Employers', body: 'Every company is vetted before a single role goes live. No ghost listings, no scams.' },
  { icon: <IconArrowUpRight />, title: 'One-click Apply', body: 'Tailored applications submitted on your behalf the moment a fitting role opens up.' },
  { icon: <IconDoc />, title: 'Resume Builder', body: 'Build one profile that speaks for you everywhere — polished, parsable, always up to date.' },
  { icon: <IconGrad />, title: 'Career Coaching', body: 'On-demand guidance from people who have sat on both sides of the interview table.' },
  { icon: <IconRupee />, title: 'Salary Insights', body: 'Know your worth before the offer. Real compensation data across roles and regions.', size: 'wide' },
]

export const matchSignals = [
  { label: 'Skills overlap', value: 96 },
  { label: 'Salary fit', value: 92 },
  { label: 'Seniority match', value: 94 },
]

export const statBand = [
  { value: '25,000+', label: 'Jobs available' },
  { value: '4,800+', label: 'Hiring companies' },
  { value: '1.24M', label: 'Active candidates' },
  { value: '94%', label: 'Hiring success' },
]

export const journeySteps = [
  { id: '01', title: 'Create your profile', body: 'One profile, built around your skills and trajectory — not a stack of keywords.' },
  { id: '02', title: 'Find matched jobs', body: 'See roles ranked by real fit, with a clear reason each one was recommended to you.' },
  { id: '03', title: 'Get hired faster', body: 'Apply in one tap, talk to verified recruiters, and land the offer worth taking.' },
]

export const testimonials = [
  { quote: 'Surwive surfaced a role I would never have found on my own — and I had an offer within two weeks.', name: 'Mamata Sri', role: 'Product Designer at Oraddo' },
  { quote: 'The matching is uncanny. Every role it showed me actually made sense for where my career is going.', name: 'Ramya Ravali', role: 'ML Engineer at 24/7 Intouch' },
  { quote: 'As a recruiter, the shortlist quality changed everything. My first interview is now my best one.', name: 'Hari Sai', role: 'Head of Talent at TriDizi' },
]

export const skillGraph: { label: string; value: number; status: string; low?: boolean }[] = [
  { label: 'React + TypeScript', value: 94, status: 'Verified 9.4' },
  { label: 'Next.js + performance', value: 86, status: 'Verified 8.6' },
  { label: 'Node + REST APIs', value: 81, status: 'Verified 8.1' },
  { label: 'GraphQL', value: 48, status: 'Evidence pending', low: true },
]

export const verificationChecks = [
  'Identity and education confirmed in one pass',
  'Portfolio reviewed by working engineers',
  'Certifications cross-checked with the issuer',
  'References tied to the same verified profile',
]

export const clarityCards: {
  tone: 'candidate' | 'company'
  eyebrow: string
  title: string
  accent: string
  points: string[]
  cta: string
}[] = [
  {
    tone: 'candidate',
    eyebrow: 'For candidates',
    title: 'Career',
    accent: 'Clarity',
    points: [
      'Applications go out on their own.',
      'Verified badge makes you stand out.',
      'Resume gets rewritten for every role.',
      'One score companies actually trust.',
      'Track every application in one place.',
    ],
    cta: 'Get verified free',
  },
  {
    tone: 'company',
    eyebrow: 'For companies',
    title: 'Recruitment',
    accent: 'Clarity',
    points: [
      'Every profile is verified before you see it.',
      'Search by skills, not just keywords.',
      'No cold sourcing, just a verified pool.',
      'Profile score shows who is worth calling.',
      'Pay only when someone joins.',
    ],
    cta: 'Hire verified talent',
  },
]

export const recruiterStats = [
  { value: '3.2×', label: 'faster time-to-hire' },
  { value: '92%', label: 'shortlist relevance' },
  { value: '48h', label: 'avg. first interview' },
  { value: '4,800', label: 'companies hiring' },
]

export const CHAT_SCENARIOS = [
  {
    user: 'Remote senior frontend roles, ₹140k+ — ideally a product-led team.',
    fits: '12 strong fits',
    match: {
      logo: 'C',
      title: 'Senior Frontend Engineer',
      meta: 'Cobalt · Remote · ₹140k–₹180k',
      score: '96% fit',
      reasons: [
        'React + TypeScript depth matches your 5 yrs',
        'Salary sits inside your target range',
        'Remote-first, async-friendly team',
      ],
    },
    typing: 'ranking 11 more matches…',
  },
  {
    user: 'Product manager roles in fintech — hybrid in Bengaluru works.',
    fits: '8 strong fits',
    match: {
      logo: 'Z',
      title: 'Product Manager, Payments',
      meta: 'Zephyr · Hybrid, Bengaluru · ₹160k–₹200k',
      score: '94% fit',
      reasons: [
        'Fintech domain matches your last 3 yrs',
        'Hybrid schedule fits your preference',
        'Owns roadmap end to end, no layers',
      ],
    },
    typing: 'ranking 7 more matches…',
  },
  {
    user: 'AI engineer openings, remote-first — startups are fine.',
    fits: '15 strong fits',
    match: {
      logo: 'N',
      title: 'AI Engineer, LLM Platform',
      meta: 'Nimbus Labs · Remote · ₹170k–₹220k',
      score: '97% fit',
      reasons: [
        'Python + LLM stack mirrors your projects',
        'Seed-stage startup, high ownership',
        'Fully remote, flexible hours',
      ],
    },
    typing: 'ranking 14 more matches…',
  },
  {
    user: 'Senior UX designer with a product-led team, ₹120k+.',
    fits: '9 strong fits',
    match: {
      logo: 'M',
      title: 'Senior UX Designer',
      meta: 'Mosaic · Remote · ₹120k–₹150k',
      score: '95% fit',
      reasons: [
        'Design-system work matches your portfolio',
        'Salary clears your ₹120k floor',
        'Product-led org, design has a seat',
      ],
    },
    typing: 'ranking 8 more matches…',
  },
  {
    user: 'Data analyst roles on growth teams — remote or Pune.',
    fits: '11 strong fits',
    match: {
      logo: 'A',
      title: 'Senior Data Analyst, Growth',
      meta: 'Arcadia · Remote · ₹110k–₹140k',
      score: '93% fit',
      reasons: [
        'SQL + experimentation depth is a direct hit',
        'Growth pod, ships weekly',
        'Remote with quarterly Pune meetups',
      ],
    },
    typing: 'ranking 10 more matches…',
  },
]
