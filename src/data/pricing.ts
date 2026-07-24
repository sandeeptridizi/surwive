export type PricingAudience = 'student' | 'company'

export type PricingPlan = {
  name: string
  tagline: string
  price: string
  period: string
  featured?: boolean
  badge?: string
  cta: string
  features: { title: string; sub: string }[]
}

export const pricingPlans: Record<PricingAudience, PricingPlan[]> = {
  student: [
    {
      name: 'Free Plan',
      tagline: 'Support for job seekers',
      price: '0',
      period: '30 days',
      cta: 'Choose Free Plan',
      features: [
        { title: 'Normal Badge', sub: 'Stand out with a Standard profile' },
        { title: 'AI Utilisation', sub: 'Utilize AI to enhance your job search' },
        { title: 'Auto Applications', sub: 'AI applies to matched jobs' },
        { title: 'Resume Builder', sub: 'Professional AI-powered resumes' },
        { title: '30 Days Access', sub: '1 month of premium access' },
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
        { title: 'Smart Matching', sub: 'Intelligent Job matching' },
        { title: 'Auto Applications', sub: 'AI applies to matched jobs' },
        { title: '100 Days Access', sub: '3+ months of premium access' },
        { title: 'Job Assistant', sub: 'Personal AI career assistant' },
      ],
    },
  ],
  company: [
    {
      name: 'For Internships',
      tagline: 'Start hiring Interns as per your needs',
      price: '99',
      period: '30 days',
      cta: 'Select Intern Plan',
      features: [
        { title: '30 Days Validity', sub: 'Internship listing active for 30 days' },
        { title: '30 Applicants', sub: 'Receive up to 30 applications' },
        { title: 'AI Matching', sub: 'Smart candidate matching algorithm' },
        { title: 'Chat System', sub: 'Direct messaging with candidates' },
      ],
    },
    {
      name: 'For Jobs',
      tagline: 'Hire faster, hire better',
      price: '249',
      period: 'per posting',
      featured: true,
      cta: 'Select Jobs Plan',
      features: [
        { title: '100 Days Validity', sub: 'Job listing active for 100 days' },
        { title: '100 Applicants', sub: 'Receive up to 100 applications' },
        { title: 'Verified Candidates Priority', sub: 'See verified profiles first' },
        { title: 'AI Matching', sub: 'Smart candidate matching algorithm' },
        { title: 'Chat System', sub: 'Direct messaging with candidates' },
      ],
    },
  ],
}
