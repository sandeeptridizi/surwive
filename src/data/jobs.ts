export const trendingChips = ['Remote roles', 'AI Engineer', 'Product Manager', 'UX Designer']

export type FeaturedRole = {
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

export type JobInfo = FeaturedRole & {
  slug: string
  type: 'job' | 'internship'
  /** Employment type label from the backend ('Full-time' | 'Part-time' | 'Freelance' | 'Internship'). */
  roleType?: string
  department?: string
  duration?: string
  summary: string
  posted: string
  applicants: string
  openings: string
  aboutCompany: string[]
  aboutRole: string[]
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  benefits: string[]
}

const jobAccentPalette = ['#ffc53d', '#7b8cff', '#ff7a50', '#35d0bc']

export function jobAccent(job: JobInfo) {
  let h = 0
  for (let i = 0; i < job.slug.length; i++) h = (h * 31 + job.slug.charCodeAt(i)) | 0
  return jobAccentPalette[Math.abs(h) % jobAccentPalette.length]
}

/** Rupee bounds in a `pay` string (handles "₹24L – ₹32L", "₹40k", stipend text). Returns null for non-numeric pay like "Not disclosed". */
export function parsePayRange(pay: string): { min: number; max: number } | null {
  const matches = [...pay.matchAll(/([\d,.]+)\s*(l|k)\b/gi)]
  if (!matches.length) return null
  const values = matches.map(([, num, unit]) => {
    const n = parseFloat(num.replace(/,/g, ''))
    return unit.toLowerCase() === 'l' ? n * 100_000 : n * 1_000
  })
  return { min: Math.min(...values), max: Math.max(...values) }
}

