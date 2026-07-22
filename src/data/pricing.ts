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
