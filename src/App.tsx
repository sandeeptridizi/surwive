import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import './App.css'
import logo from "./assets/Group 2.png";
import appPic from "./assets/apppic.png";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import logo4 from "./assets/logo4.png";
import logo5 from "./assets/logo5.png";
import logo6 from "./assets/logo6.png";
import logo7 from "./assets/logo7.png";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXl3P8SeRYzVGO4mSF9pU3_7n6gI_5PrkpSdfN7VfR6MYZaPG28G_xsIcl_gN2cV3F/exec";

async function submitToGoogleSheet(data: Record<string, string>) {
  if (!GOOGLE_SCRIPT_URL) throw new Error('missing-endpoint')
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: new URLSearchParams(data),
  })
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

function IconRupee() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="M6 13h3" />
      <path d="M9 13c6.7 0 6.7-10 0-10" />
      <path d="m6 13 8.5 8" />
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

function IconCrown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5 7 12l5-6.5L17 12l3.5-3.5L19 18.5H5L3.5 8.5Z" />
      <path d="M5 21h14" />
    </svg>
  )
}

function IconTrophy() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h8v6a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H4.5c.2 3 1.6 4.6 4 4.9" />
      <path d="M16 5h3.5c-.2 3-1.6 4.6-4 4.9" />
      <path d="M12 14v3.5" />
      <path d="M8.5 20.5c.4-2 1.7-3 3.5-3s3.1 1 3.5 3h-7Z" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
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

const trustedLogos: { src: string; invert?: boolean }[] = [
  { src: logo1, invert: true },
  { src: logo2 },
  { src: logo3 },
  { src: logo4 },
  { src: logo5, invert: true },
  { src: logo6 },
  { src: logo7 },
]

type FeaturedRole = {
  company: string
  initial: string
  featured: boolean
  title: string
  location: string
  mode: 'Remote' | 'Hybrid' | 'On-site'
  detail: string
  skills: string[]
  pay: string
  per: string
}

const featuredJobs: FeaturedRole[] = [
  { company: 'Cobalt', initial: 'C', featured: true, title: 'Senior Frontend Engineer', location: 'Bengaluru', mode: 'Remote', detail: '5+ yrs', skills: ['React', 'TypeScript'], pay: '₹24L – ₹32L', per: 'per year' },
  { company: 'Lumen', initial: 'L', featured: false, title: 'Product Designer', location: 'Mumbai', mode: 'Hybrid', detail: '3+ yrs', skills: ['Figma', 'Design systems'], pay: '₹16L – ₹22L', per: 'per year' },
  { company: 'Quanta', initial: 'Q', featured: true, title: 'Machine Learning Engineer', location: 'Hyderabad', mode: 'On-site', detail: '4+ yrs', skills: ['Python', 'PyTorch'], pay: '₹28L – ₹38L', per: 'per year' },
  { company: 'Vertex', initial: 'V', featured: false, title: 'DevOps Engineer', location: 'Pune', mode: 'Remote', detail: '4+ yrs', skills: ['AWS', 'Kubernetes'], pay: '₹20L – ₹28L', per: 'per year' },
  { company: 'Beacon', initial: 'B', featured: false, title: 'Data Scientist', location: 'Gurugram', mode: 'Remote', detail: '3+ yrs', skills: ['SQL', 'Python'], pay: '₹18L – ₹26L', per: 'per year' },
  { company: 'Helios', initial: 'H', featured: true, title: 'Engineering Manager', location: 'Chennai', mode: 'Hybrid', detail: '8+ yrs', skills: ['Platform', 'Team of 12'], pay: '₹40L – ₹55L', per: 'per year' },
]

const featuredInternships: FeaturedRole[] = [
  { company: 'Cobalt', initial: 'C', featured: true, title: 'Frontend Developer Intern', location: 'Bengaluru', mode: 'Remote', detail: '6 months', skills: ['React', 'Tailwind'], pay: '₹40k', per: 'stipend / month' },
  { company: 'Nova', initial: 'N', featured: false, title: 'UI/UX Design Intern', location: 'Mumbai', mode: 'Hybrid', detail: '3 months', skills: ['Figma', 'Prototyping'], pay: '₹25k', per: 'stipend / month' },
  { company: 'Quanta', initial: 'Q', featured: true, title: 'Machine Learning Intern', location: 'Hyderabad', mode: 'On-site', detail: '6 months', skills: ['Python', 'NumPy'], pay: '₹50k', per: 'stipend / month' },
  { company: 'Atlas', initial: 'A', featured: false, title: 'Backend Developer Intern', location: 'Pune', mode: 'Remote', detail: '6 months', skills: ['Node.js', 'MongoDB'], pay: '₹35k', per: 'stipend / month' },
  { company: 'Delta', initial: 'D', featured: false, title: 'Data Analyst Intern', location: 'Gurugram', mode: 'Hybrid', detail: '3 months', skills: ['SQL', 'Excel'], pay: '₹30k', per: 'stipend / month' },
  { company: 'Orbit', initial: 'O', featured: true, title: 'Digital Marketing Intern', location: 'Chennai', mode: 'Remote', detail: '3 months', skills: ['SEO', 'Content'], pay: '₹20k', per: 'stipend / month' },
]

type DriveEvent = {
  host: string
  title: string
  type: string
  day: string
  month: string
  time: string
  location: string
  mode: 'On-site' | 'Online' | 'Hybrid'
  tags: string[]
  perk: string
}

const walkInDrives: DriveEvent[] = [
  { host: 'Cobalt', title: 'Frontend & Backend Mega Drive', type: 'Walk-in', day: '16', month: 'Jul', time: '9:00 AM – 4:00 PM', location: 'Bengaluru', mode: 'On-site', tags: ['0–4 yrs', 'React', 'Node.js'], perk: 'On-the-spot offers' },
  { host: 'Quanta', title: 'ML & Data Science Open Drive', type: 'Walk-in', day: '18', month: 'Jul', time: '10:00 AM – 5:00 PM', location: 'Hyderabad', mode: 'On-site', tags: ['2+ yrs', 'Python', 'SQL'], perk: '80+ openings' },
  { host: 'Vertex', title: 'DevOps Walk-in Wednesday', type: 'Walk-in', day: '22', month: 'Jul', time: '9:30 AM – 3:30 PM', location: 'Pune', mode: 'On-site', tags: ['3+ yrs', 'AWS', 'Kubernetes'], perk: 'Same-day results' },
  { host: 'Lumen', title: 'Design Portfolio Day', type: 'Walk-in', day: '25', month: 'Jul', time: '11:00 AM – 4:00 PM', location: 'Mumbai', mode: 'On-site', tags: ['Freshers welcome', 'Figma'], perk: 'Live portfolio reviews' },
  { host: 'Beacon', title: 'Analytics Hiring Blitz', type: 'Walk-in', day: '28', month: 'Jul', time: '9:00 AM – 2:00 PM', location: 'Gurugram', mode: 'On-site', tags: ['1–3 yrs', 'SQL', 'Power BI'], perk: '40 openings' },
  { host: 'Helios', title: 'Engineering Open House', type: 'Walk-in', day: '01', month: 'Aug', time: '10:00 AM – 6:00 PM', location: 'Chennai', mode: 'On-site', tags: ['Senior roles', 'Platform'], perk: 'Meet the CTO' },
]

const eventsHackathons: DriveEvent[] = [
  { host: 'Surwive', title: 'CodeStorm 48-Hour Hackathon', type: 'Hackathon', day: '19', month: 'Jul', time: 'Kicks off 6:00 PM', location: 'India-wide', mode: 'Online', tags: ['Teams of 2–4', 'Any stack'], perk: '₹5L prize pool' },
  { host: 'Nova', title: 'Resume Roast — Live Teardown', type: 'Webinar', day: '24', month: 'Jul', time: '7:00 PM – 8:30 PM', location: 'Streamed live', mode: 'Online', tags: ['Free entry', 'Live Q&A'], perk: 'Recruiter panel' },
  { host: 'Quanta', title: 'AI Builders Summit 2026', type: 'Conference', day: '02', month: 'Aug', time: '9:00 AM – 6:00 PM', location: 'Bengaluru', mode: 'Hybrid', tags: ['Keynotes', 'Live demos'], perk: '2,000+ builders' },
  { host: 'Atlas', title: 'CloudCraft Hackathon', type: 'Hackathon', day: '08', month: 'Aug', time: '48 hours non-stop', location: 'Pune', mode: 'Hybrid', tags: ['Cloud-native', 'Open theme'], perk: 'PPIs for top 3' },
  { host: 'Vertex', title: 'FinTech Sprint Hackathon', type: 'Hackathon', day: '30', month: 'Aug', time: '24 hours flat', location: 'Bengaluru', mode: 'On-site', tags: ['Payments', 'APIs'], perk: '₹2L + fast-track interviews' },
  { host: 'Orbit', title: 'Women in Tech Meetup', type: 'Meetup', day: '14', month: 'Aug', time: '5:00 PM – 8:00 PM', location: 'Hyderabad', mode: 'On-site', tags: ['Networking', 'Mentorship'], perk: 'Free passes' },
  { host: 'Surwive', title: 'Campus Job Fair 2026', type: 'Job Fair', day: '22', month: 'Aug', time: '10:00 AM – 5:00 PM', location: 'Mumbai', mode: 'On-site', tags: ['80+ companies', 'All streams'], perk: '5,000+ roles' },
]

const whyFeatures: { icon: ReactNode; title: string; body: string; size?: 'hero' | 'wide' }[] = [
  { icon: <IconGear />, title: 'AI Job Matching', body: 'Our model reads roles the way a hiring manager does — scoring every opening against your skills, salary target, and seniority before it ever reaches you.', size: 'hero' },
  { icon: <IconShieldCheck />, title: 'Verified Employers', body: 'Every company is vetted before a single role goes live. No ghost listings, no scams.' },
  { icon: <IconArrowUpRight />, title: 'One-click Apply', body: 'Tailored applications submitted on your behalf the moment a fitting role opens up.' },
  { icon: <IconDoc />, title: 'Resume Builder', body: 'Build one profile that speaks for you everywhere — polished, parsable, always up to date.' },
  { icon: <IconGrad />, title: 'Career Coaching', body: 'On-demand guidance from people who have sat on both sides of the interview table.' },
  { icon: <IconRupee />, title: 'Salary Insights', body: 'Know your worth before the offer. Real compensation data across roles and regions.', size: 'wide' },
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

type PricingAudience = 'student' | 'company'

type PricingPlan = {
  name: string
  tagline: string
  price: string
  period: string
  featured?: boolean
  badge?: string
  cta: string
  features: { title: string; sub: string }[]
}

const pricingPlans: Record<PricingAudience, PricingPlan[]> = {
  student: [
    {
      name: 'Elite Plan',
      tagline: 'Perfect for job seekers',
      price: '99',
      period: '60 days',
      cta: 'Choose Elite Plan',
      features: [
        { title: 'Verified Badge', sub: 'Stand out with a verified profile' },
        { title: 'Background Verification', sub: 'Complete profile verification' },
        { title: 'Auto Applications', sub: 'AI applies to matched jobs' },
        { title: 'Resume Builder', sub: 'Professional AI-powered resumes' },
        { title: '60 Days Access', sub: '2 months of premium access' },
      ],
    },
    {
      name: 'Pro Plan',
      tagline: 'Best for career growth',
      price: '199',
      period: '100 days',
      featured: true,
      badge: 'Popular',
      cta: 'Choose Pro Plan',
      features: [
        { title: 'Verified Badge', sub: 'Premium verified profile' },
        { title: 'Background Verification', sub: 'Complete profile verification' },
        { title: 'Auto Applications', sub: 'AI applies to matched jobs' },
        { title: 'Resume Builder', sub: 'Professional AI-powered resumes' },
        { title: '100 Days Access', sub: '3+ months of premium access' },
        { title: 'Job Assistant', sub: 'Personal AI career assistant' },
      ],
    },
  ],
  company: [
    {
      name: 'Free Plan',
      tagline: 'Start hiring at zero cost',
      price: '0',
      period: 'always free',
      cta: 'Select Free Plan',
      features: [
        { title: '15 Days Validity', sub: 'Job listing active for 15 days' },
        { title: '20 Applicants', sub: 'Receive up to 20 applications' },
        { title: 'AI Matching', sub: 'Smart candidate matching algorithm' },
        { title: 'Chat System', sub: 'Direct messaging with candidates' },
      ],
    },
    {
      name: 'Premium Plan',
      tagline: 'Hire faster, hire better',
      price: '249',
      period: 'per posting',
      featured: true,
      badge: 'Recommended',
      cta: 'Select Premium Plan',
      features: [
        { title: '60 Days Validity', sub: 'Job listing active for 60 days' },
        { title: '50 Applicants', sub: 'Receive up to 50 applications' },
        { title: 'Featured Job', sub: 'Showcase your job to top applicants' },
        { title: 'Verified Candidates Priority', sub: 'See verified profiles first' },
        { title: 'AI Matching', sub: 'Smart candidate matching algorithm' },
        { title: 'Chat System', sub: 'Direct messaging with candidates' },
      ],
    },
  ],
}

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('')
}

function useScrollReveal(routeKey?: string) {
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
  }, [routeKey])
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return hash.startsWith('#/pricing') ? 'pricing' : 'home'
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

const CHAT_SCENARIOS = [
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

function CopilotChatCard({ onApply }: { onApply: () => void }) {
  const [scene, setScene] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setLeaving(true), 5600)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!leaving) return
    const id = window.setTimeout(() => {
      setScene((s) => (s + 1) % CHAT_SCENARIOS.length)
      setLeaving(false)
    }, 450)
    return () => window.clearTimeout(id)
  }, [leaving])

  const s = CHAT_SCENARIOS[scene]

  return (
    <div className="chatcard" aria-hidden="true">
      <div className="chatcard__head">
        <span className="chatcard__bot"><IconSpark /></span>
        <div className="chatcard__id">
          <strong>Surwive Copilot</strong>
          <span><i className="chatcard__dot" /> <span className="chatcard__status-text">Online — reading 25,000+ live roles</span></span>
        </div>
        <span className="chatcard__live">Live</span>
      </div>

      <div className={`chatcard__body ${leaving ? 'chatcard__body--leaving' : ''}`} key={scene}>
        <div className="chatmsg chatmsg--user">
          {s.user}
        </div>
        <div className="chatmsg chatmsg--ai">
          Scanned every open role. <strong>{s.fits}</strong> — here's your top match:
        </div>

        <div className="chatmatch">
          <div className="chatmatch__head">
            <span className="chatmatch__logo">{s.match.logo}</span>
            <div>
              <strong>{s.match.title}</strong>
              <span>{s.match.meta}</span>
            </div>
            <span className="chatmatch__score">{s.match.score}</span>
          </div>
          <ul className="chatmatch__reasons">
            {s.match.reasons.map((reason) => (
              <li key={reason}><IconCheck /> {reason}</li>
            ))}
          </ul>
          <div className="chatmatch__actions">
            <button type="button" className="btn btn--solid btn--sm" onClick={onApply} tabIndex={-1}>Apply now</button>
            <button type="button" className="btn btn--outline btn--sm" tabIndex={-1}>Save for later</button>
          </div>
        </div>

        <div className="chatcard__typing">
          <span /><span /><span />
          {s.typing}
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

function FeaturedRoles({ onApply }: { onApply: () => void }) {
  const [tab, setTab] = useState<'jobs' | 'internships'>('jobs')
  const roles = tab === 'jobs' ? featuredJobs : featuredInternships

  return (
    <section className="jobs-section" id="jobs">
      <SectionHead
        align="split"
        eyebrow="Featured roles"
        title={tab === 'jobs' ? 'Jobs chosen for you, not the crowd' : 'Internships that kick-start careers'}
        sub="Skip the endless scroll. Every opening is verified, matched to your skills, and ranked so the best fit always lands on top."
        action={
          <div className="jobs-head-controls">
            <div className="jobs-toggle" role="tablist" aria-label="Role type">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'jobs'}
                className={tab === 'jobs' ? 'is-active' : ''}
                onClick={() => setTab('jobs')}
              >
                Jobs
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'internships'}
                className={tab === 'internships' ? 'is-active' : ''}
                onClick={() => setTab('internships')}
              >
                Internships
              </button>
            </div>
            <button type="button" className="link-arrow" onClick={onApply}>
              View all {tab} <IconArrowUpRight />
            </button>
          </div>
        }
      />
      <div className="jobs-grid">
        {roles.map((job, i) => (
          <article className="job-card" key={`${tab}-${job.title}`} style={{ animationDelay: `${i * 70}ms` }}>
            <div className="job-card__head">
              <span className="job-card__logo">{job.initial}</span>
              <div className="job-card__co">
                <strong>{job.company}</strong>
                <span><IconPin /> {job.location}</span>
              </div>
              {job.featured && (
                <span className="job-card__badge"><IconStar /> Featured</span>
              )}
            </div>
            <h3 className="job-card__title">{job.title}</h3>
            <div className="job-card__tags">
              <span className="job-tag job-tag--mode">{job.mode}</span>
              <span className="job-tag">{job.detail}</span>
              {job.skills.map((skill) => (
                <span className="job-tag" key={skill}>{skill}</span>
              ))}
            </div>
            <div className="job-card__foot">
              <span className="job-card__salary">{job.pay}<small>{job.per}</small></span>
              <button type="button" className="btn btn--solid btn--sm job-card__apply" onClick={onApply}>
                Apply <IconArrowUpRight />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function DriveCard({ item, index, onApply }: { item: DriveEvent; index: number; onApply: () => void }) {
  return (
    <article className="drive-card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="drive-card__head">
        <span className="drive-card__date" aria-hidden="true">
          <strong>{item.day}</strong>
          <span>{item.month}</span>
        </span>
        <div className="drive-card__host">
          <strong>{item.host}</strong>
          <span><IconPin /> {item.location}</span>
        </div>
        <span className="drive-card__type">{item.type}</span>
      </div>
      <h3 className="drive-card__title">{item.title}</h3>
      <span className="drive-card__time"><IconClock /> {item.time} · {item.day} {item.month}</span>
      <div className="drive-card__tags">
        <span className="job-tag job-tag--mode">{item.mode}</span>
        {item.tags.map((tag) => (
          <span className="job-tag" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="drive-card__foot">
        <span className="drive-card__perk"><IconSpark /> {item.perk}</span>
        <button type="button" className="btn btn--solid btn--sm drive-card__cta" onClick={onApply}>
          Register <IconArrowUpRight />
        </button>
      </div>
    </article>
  )
}

function WalkInDrives({ onApply }: { onApply: () => void }) {
  return (
    <section className="drives-section" id="drives">
      <SectionHead
        eyebrow="Happening now"
        title="Walk-in drives near you"
        sub="Show up with your resume, walk out with an offer. Verified companies, real openings, zero cover letters."
      />
      <div className="drives-grid">
        {walkInDrives.map((item, i) => (
          <DriveCard item={item} index={i} onApply={onApply} key={item.title} />
        ))}
      </div>
    </section>
  )
}

function EventsAndHackathons({ onApply }: { onApply: () => void }) {
  const [tab, setTab] = useState<'events' | 'hackathons'>('events')
  const items = eventsHackathons.filter((item) =>
    tab === 'hackathons' ? item.type === 'Hackathon' : item.type !== 'Hackathon'
  )

  return (
    <section className="drives-section" id="events">
      <SectionHead
        eyebrow="Beyond the drives"
        title="Events & hackathons worth your weekend"
        sub="Build, compete, and get noticed — every event puts you in the room with the people who hire."
      />

      <div className="drives-toggle-wrap reveal">
        <div
          className={`drives-toggle ${tab === 'hackathons' ? 'drives-toggle--second' : ''}`}
          role="tablist"
          aria-label="Events and hackathons"
        >
          <span className="drives-toggle__thumb" aria-hidden="true" />
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'events'}
            className={`drives-toggle__btn ${tab === 'events' ? 'is-active' : ''}`}
            onClick={() => setTab('events')}
          >
            <IconSpark /> Events
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'hackathons'}
            className={`drives-toggle__btn ${tab === 'hackathons' ? 'is-active' : ''}`}
            onClick={() => setTab('hackathons')}
          >
            <IconTrophy /> Hackathons
          </button>
        </div>
      </div>

      <div className="drives-grid" key={tab}>
        {items.map((item, i) => (
          <DriveCard item={item} index={i} onApply={onApply} key={item.title} />
        ))}
      </div>
    </section>
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

function PricingSection({
  audience,
  onAudienceChange,
  onSelectPlan,
}: {
  audience: PricingAudience
  onAudienceChange: (audience: PricingAudience) => void
  onSelectPlan: (audience: PricingAudience) => void
}) {
  return (
    <section className="pricing" id="pricing">
      <SectionHead
        eyebrow="Pricing"
        title="Simple plans for every side of the table"
        sub="Whether you're landing a role or filling one — pick a plan, and only pay for what moves you forward."
      />

      <div className="pricing__toggle-wrap reveal">
        <div
          className={`pricing-toggle ${audience === 'company' ? 'pricing-toggle--company' : ''}`}
          role="tablist"
          aria-label="Pricing for"
        >
          <span className="pricing-toggle__thumb" aria-hidden="true" />
          <button
            type="button"
            role="tab"
            aria-selected={audience === 'student'}
            className={`pricing-toggle__btn ${audience === 'student' ? 'is-active' : ''}`}
            onClick={() => onAudienceChange('student')}
          >
            <IconGrad /> For Students
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={audience === 'company'}
            className={`pricing-toggle__btn ${audience === 'company' ? 'is-active' : ''}`}
            onClick={() => onAudienceChange('company')}
          >
            <IconUsers /> For Companies
          </button>
        </div>
      </div>

      <div className="pricing__grid" key={audience}>
        {pricingPlans[audience].map((plan, i) => (
          <article
            className={`plan-card ${plan.featured ? 'plan-card--featured' : ''}`}
            key={plan.name}
            style={{ animationDelay: `${i * 110}ms` }}
          >
            {plan.badge && <span className="plan-card__badge">{plan.badge}</span>}

            <div className="plan-card__head">
              <span className="plan-card__icon">{plan.featured ? <IconCrown /> : <IconShieldCheck />}</span>
              <div className="plan-card__id">
                <h3>{plan.name}</h3>
                <span>{plan.tagline}</span>
              </div>
            </div>

            <div className="plan-card__price">
              <span className="plan-card__currency">₹</span>
              <span className="plan-card__amount">{plan.price}</span>
              <span className="plan-card__period">/ {plan.period}</span>
            </div>

            <ul className="plan-card__features">
              {plan.features.map((f) => (
                <li key={f.title}>
                  <span className="plan-card__check"><IconCheck /></span>
                  <span className="plan-card__feature">
                    <strong>{f.title}</strong>
                    <span>{f.sub}</span>
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`btn ${plan.featured ? 'btn--solid' : 'btn--outline'} plan-card__cta`}
              onClick={() => onSelectPlan(audience)}
            >
              {plan.cta} <IconArrowUpRight />
            </button>
          </article>
        ))}
      </div>
    </section>
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
    const phoneDigits = phone.replace(/\D/g, '')
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      setStatus('error')
      setErrorText('Please enter a valid phone number with 10 to 13 digits.')
      return
    }
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
              inputMode="tel"
              maxLength={18}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
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
  const route = useHashRoute()
  useScrollReveal(route)
  const navScrolled = useNavScrollState()
  const [signupModal, setSignupModal] = useState<{ open: boolean; role: SignupRole }>({
    open: false,
    role: 'candidate',
  })
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [pricingAudience, setPricingAudience] = useState<PricingAudience>('student')

  const openSignup = (role: SignupRole) => {
    setMobileNavOpen(false)
    setSignupModal({ open: true, role })
  }
  const closeSignup = () => setSignupModal((s) => ({ ...s, open: false }))

  useEffect(() => {
    if (route === 'pricing') {
      window.scrollTo({ top: 0 })
    } else {
      const id = window.location.hash.slice(1)
      if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView()
    }
  }, [route])

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
            <a href="#companies" onClick={() => setMobileNavOpen(false)}>Companies</a>
            <a href="#jobs" onClick={() => setMobileNavOpen(false)}>Jobs</a>
            <a href="#drives" onClick={() => setMobileNavOpen(false)}>Walk-in Drives</a>
            <a href="#how" onClick={() => setMobileNavOpen(false)}>How it works</a>
            <a href="#recruiters" onClick={() => setMobileNavOpen(false)}>For Recruiters</a>
            <a href="#/pricing" onClick={() => setMobileNavOpen(false)}>Pricing</a>
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
        {route === 'pricing' ? (
          <PricingSection
            audience={pricingAudience}
            onAudienceChange={setPricingAudience}
            onSelectPlan={(audience) => openSignup(audience === 'company' ? 'employer' : 'candidate')}
          />
        ) : (
        <>
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
                placeholder='Try "remote senior frontend, ₹140k+"'
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
                <span className="hero-float__value">₹150k+</span>
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
          <div className="marquee reveal" aria-hidden="true">
            <div className="marquee__track">
              {[...trustedLogos, ...trustedLogos].map((item, i) => (
                <span className={`marquee__item ${item.invert ? 'marquee__item--invert' : ''}`} key={i}>
                  <img src={item.src} alt="" loading="lazy" />
                </span>
              ))}
            </div>
          </div>
        </section>

        <FeaturedRoles onApply={() => openSignup('candidate')} />

        <WalkInDrives onApply={() => openSignup('candidate')} />
        <EventsAndHackathons onApply={() => openSignup('candidate')} />

        <section className="why-section">
          <SectionHead
            eyebrow="Why Surwive"
            title="Everything you need to get hired"
            sub="A complete toolkit built around your skills — not your keywords."
          />
          <div className="why-bento">
            {whyFeatures.map((f, i) => (
              <div className={`why-tile ${f.size ? `why-tile--${f.size}` : ''} reveal`} key={f.title} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <span className="why-tile__watermark" aria-hidden="true">{f.icon}</span>
                <span className="why-tile__icon">{f.icon}</span>
                <h3 className="why-tile__title">{f.title}</h3>
                <p className="why-tile__body">{f.body}</p>
                {f.size === 'hero' && (
                  <div className="why-tile__meters" aria-hidden="true">
                    {matchSignals.map((s) => (
                      <div className="why-meter" key={s.label}>
                        <span className="why-meter__label">{s.label}</span>
                        <span className="why-meter__track"><i style={{ width: `${s.value}%` }} /></span>
                        <span className="why-meter__value">{s.value}%</span>
                      </div>
                    ))}
                  </div>
                )}
                {f.size === 'wide' && (
                  <div className="why-tile__salary" aria-hidden="true">
                    <div className="why-tile__salary-bar">
                      <span className="why-tile__salary-median" style={{ left: '54%' }}>₹26L median</span>
                    </div>
                    <div className="why-tile__salary-ends">
                      <span>₹12L</span>
                      <span>₹45L</span>
                    </div>
                  </div>
                )}
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
            <div className="copilot__panel-query">"Find me senior frontend roles, remote, ₹140k+"</div>
            <div className="copilot__panel-match">
              <div className="copilot__panel-match-head">
                <span className="copilot__panel-avatar">C</span>
                <div>
                  <strong>Senior Frontend Engineer</strong>
                  <span>Cobalt · Remote · ₹140k–₹180k</span>
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
                <a className="btn btn--outline-ink" href="#/pricing" onClick={() => setPricingAudience('company')}>
                  See pricing
                </a>
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
              <div className="phone__screen phone__screen--shot">
                <img src={appPic} alt="" className="phone__shot" />
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
        </>
        )}
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
          <a href="#drives">Walk-in drives</a>
          <a href="#main">My dashboard</a>
        </nav>

        <nav className="footer__col" aria-label="For employers">
          <h4>For employers</h4>
          <a href="#recruiters">Post a job</a>
          <a href="#companies">Browse companies</a>
          <a href="#/pricing">Pricing</a>
          <a href="#drives">Hiring events</a>
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
