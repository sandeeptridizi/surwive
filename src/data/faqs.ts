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
  { category: 'Getting started', q: 'What is Surwive?', a: 'Surwive is an AI-powered job and hiring platform that connects job seekers with verified employers. Hishi AI analyzes your skills, experience, and career goals to recommend the best-matched jobs and help recruiters find the right candidates faster.', },
  { category: 'Getting started', q: 'Is Surwive free for job seekers?', a: 'Yes. Creating a profile, searching jobs, internships, walk-in drives, and applying to opportunities is free. Premium plans unlock additional AI-powered career features and profile enhancements.', },
  { category: 'Getting started', q: 'How do I create an account?', a: 'Sign up with your email or mobile number, complete your professional profile, and let Hishi AI start recommending jobs that match your skills and career goals.', },
  { category: 'For job seekers', q: 'How does Hishi AI match jobs?', a: 'Hishi AI analyzes your skills, experience, education, and preferences to recommend jobs with the highest matching score, helping you discover relevant opportunities faster.', },
  { category: 'For job seekers', q: 'What is a verified profile?', a: 'A verified profile confirms your skills, education, certifications, and experience, helping recruiters trust your profile and improving your visibility to employers.', },
  { category: 'For job seekers', q: 'Can I find internships and walk-in drives?', a: 'Yes. Surwive offers jobs, internships, walk-in drives, hackathons, career events, and hiring opportunities from verified companies across multiple industries.', },
  { category: 'For job seekers', q: 'Does Surwive provide an AI resume builder?', a: 'Yes. Create a professional ATS-friendly resume using your Surwive profile, making it easier to apply for jobs and impress recruiters.', },
  { category: 'For employers', q: 'How do I post a job?', a: 'Create an employer account, complete your company profile, and publish job openings to reach AI-matched candidates with verified skills.', },
  { category: 'For employers', q: 'How are candidates matched?', a: 'Hishi AI ranks candidates based on skills, experience, qualifications, and job requirements, helping recruiters identify the best-fit talent quickly.', },
  { category: 'For employers', q: 'Can I hire verified candidates?', a: 'Yes. Employers can prioritize verified candidates with authenticated skills and profiles, making hiring faster and more reliable.', },
  { category: 'Pricing & billing', q: 'Which payment methods are supported?', a: 'We support secure online payments, including UPI, credit cards, debit cards, and net banking for premium plans and employer services.', },
  { category: 'Pricing & billing', q: 'Do premium plans renew automatically?', a: 'No. Premium plans do not renew automatically. You can upgrade or renew whenever you choose.', }
]