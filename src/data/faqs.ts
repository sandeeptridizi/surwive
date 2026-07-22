import type { ComponentType } from 'react'
import { IconGrad, IconRupee, IconSpark, IconTrophy, IconUsers } from '../components/icons'

export type Faq = {
  q: string
  a: string
  category: string
}

export type FaqCategory = {
  name: string
  icon: ComponentType
  color: string
}

export const faqCategories: FaqCategory[] = [
  { name: 'Getting started', icon: IconSpark, color: '#ffc53d' },
  { name: 'For job seekers', icon: IconGrad, color: '#35d0bc' },
  { name: 'For employers', icon: IconUsers, color: '#7b8cff' },
  { name: 'Pricing & billing', icon: IconRupee, color: '#ff7a50' },
  { name: 'Events & hackathons', icon: IconTrophy, color: '#6fd88a' },
]

export function faqCategoryOf(faq: Faq) {
  return faqCategories.find((c) => c.name === faq.category) ?? faqCategories[0]
}

export const faqs: Faq[] = [
  {
    category: 'Getting started',
    q: 'What is Surwive and how does it work?',
    a: 'Surwive is an AI-powered career platform. You describe the role you want in plain words, our copilot reads 25,000+ live listings, reasons about fit against your skills, salary target, and seniority, and hands you a ranked shortlist — with the exact reasons each role made the list.',
  },
  {
    category: 'Getting started',
    q: 'Is Surwive free for job seekers?',
    a: 'Yes. Browsing jobs, internships, walk-in drives, and applying is completely free. Paid plans (Elite at ₹99 for 60 days, Pro at ₹199 for 100 days) add extras like a verified badge, background verification, auto-applications, and the AI resume builder.',
  },
  {
    category: 'Getting started',
    q: 'How do I create an account?',
    a: 'Click "Sign up" anywhere on the site, tell us whether you are looking for a job or looking to hire, and share a few basics. That is it — we will be in touch with matches worth your time.',
  },
  {
    category: 'For job seekers',
    q: 'How does the AI matching actually work?',
    a: 'Our model reads roles the way a hiring manager does. Every opening is scored against your skills overlap, salary fit, and seniority match — and every recommendation comes with the "why", so you can see exactly which signals earned its score.',
  },
  {
    category: 'For job seekers',
    q: 'What is the verified badge and background verification?',
    a: 'Verified profiles are checked by our team so recruiters can trust what they read. Verification is included in the Elite and Pro plans and consistently increases recruiter responses, because your skills stop competing with unverifiable claims.',
  },
  {
    category: 'For job seekers',
    q: 'Can I find internships and walk-in drives on Surwive?',
    a: 'Absolutely. The Jobs section has a dedicated Internships tab with stipend details, and the Walk-in Drives section lists verified drives across India every week — show up with your resume, and many companies make same-day offers.',
  },
  {
    category: 'For job seekers',
    q: 'How does the resume builder work?',
    a: 'You build one profile and Surwive turns it into a polished, ATS-parsable resume that stays up to date everywhere you apply. Pro users also get AI tailoring that highlights the experience each specific employer cares about.',
  },
  {
    category: 'For employers',
    q: 'How do I post a job?',
    a: 'Sign up as an employer and choose a plan. The Free plan keeps a listing live for 15 days with up to 20 applicants; the Premium plan (₹249 per posting) runs for 60 days, accepts up to 50 applicants, and features your job to top candidates.',
  },
  {
    category: 'For employers',
    q: 'How are candidates ranked for my role?',
    a: 'Applicants are scored against the role you actually opened — verified skills, salary expectations, and seniority — not resume formatting or keyword stuffing. Teams using Surwive report 3.2× faster time-to-hire and 92% shortlist relevance.',
  },
  {
    category: 'For employers',
    q: 'What does "verified candidates priority" mean?',
    a: 'With the Premium plan, candidates who have completed background verification appear at the top of your applicant list. You spend your first interviews on people whose skills and history have already been checked.',
  },
  {
    category: 'Pricing & billing',
    q: 'What payment methods do you accept?',
    a: 'We accept UPI, all major credit and debit cards, and net banking. Payments are processed securely and you receive a GST invoice by email immediately after purchase.',
  },
  {
    category: 'Pricing & billing',
    q: 'Do plans auto-renew?',
    a: 'No. Every plan is a one-time purchase for a fixed duration — 60 days for Elite, 100 days for Pro, and per-posting for employers. When a plan ends, you simply drop back to the free tier; nothing is charged automatically.',
  },
  {
    category: 'Pricing & billing',
    q: 'Can I get a refund or switch plans?',
    a: 'If you upgrade mid-plan, the unused value of your current plan is adjusted against the new one. For refund requests, write to our support team within 7 days of purchase and we will sort it out case by case.',
  },
  {
    category: 'Events & hackathons',
    q: 'Are the events and hackathons free to join?',
    a: 'Most are — hackathons like CodeStorm and meetups are free with registration, and webinars are free entry. Some conferences have paid in-person passes (with a free livestream option); the price is always shown on the event page.',
  },
  {
    category: 'Events & hackathons',
    q: 'What do winners of hackathons get?',
    a: 'It varies by event: prize pools (₹5L at CodeStorm, ₹2L at FinTech Sprint), pre-placement interviews, fast-tracked hiring rounds, and cloud credits. Every event page lists its perks under "Why attend".',
  },
  {
    category: 'Events & hackathons',
    q: 'Can my company host an event or drive on Surwive?',
    a: 'Yes — walk-in drives, hackathons, and hiring events are all part of our employer solutions. Sign up as an employer or reach out through the contact link in the footer and our events team will set it up with you.',
  },
]
