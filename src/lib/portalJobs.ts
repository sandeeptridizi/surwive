import type { JobInfo } from '../data/jobs'
import { API_BASE } from './config'
import { slugifyHeading } from './utils'

/** Job shape returned by the backend's public portal endpoint (GET /api/portal/jobs). */
type PortalJob = {
  id: string
  title: string
  companyId: string
  company: string
  companyLogo: string
  type: string // 'Full-time' | 'Part-time' | 'Internship' | 'Freelance'
  department: string
  location: string
  salaryMin: number | null
  salaryMax: number | null
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  skills: Array<{ id: string; name: string; level: number }>
  status: string
  postedDate: string // YYYY-MM-DD
  applicants: number
  duration: string // internship-only, e.g. "3 months"
  stipend: string // internship-only, e.g. "₹15,000/month"
  spots: number | null // internship-only
  isPaid: boolean | null // internship-only; null = never specified
}

function inr(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000
    return `₹${Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(1)}L`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

function salaryRange(job: PortalJob): string | null {
  const { salaryMin, salaryMax } = job
  if (salaryMin == null && salaryMax == null) return null
  if (salaryMin != null && salaryMax != null) return `${inr(salaryMin)} – ${inr(salaryMax)}`
  return inr((salaryMin ?? salaryMax) as number)
}

function payInfo(job: PortalJob): { pay: string; per: string } {
  if (job.type === 'Internship') {
    // Internship pay comes from the Internship Hub fields: the stipend text,
    // or "Unpaid" when the paid checkbox is off. The generic salary range is
    // only a fallback for postings where neither was ever filled in.
    if (job.stipend) return { pay: job.stipend, per: '' }
    if (job.isPaid === false) return { pay: 'Unpaid', per: '' }
    const range = salaryRange(job)
    if (range) return { pay: range, per: 'per month' }
    return { pay: job.isPaid ? 'Paid' : 'Not disclosed', per: '' }
  }
  const range = salaryRange(job)
  return range ? { pay: range, per: 'per year' } : { pay: 'Not disclosed', per: '' }
}

function workMode(location: string): JobInfo['mode'] {
  const loc = location.toLowerCase()
  if (loc.includes('remote') || loc.includes('work from home') || loc.includes('wfh')) return 'Remote'
  if (loc.includes('hybrid')) return 'Hybrid'
  return 'On-site'
}

/** Drop a trailing "(Onsite)"/"(Remote)"-style suffix — the work mode is shown as its own chip. */
function cleanLocation(location: string, mode: JobInfo['mode']): string {
  const cleaned = location
    .replace(/\s*[(\[]\s*(?:on-?site|remote|hybrid|wfh|work from home)\s*[)\]]\s*$/i, '')
    .trim()
  if (cleaned) return cleaned
  return mode === 'Remote' ? 'Remote' : 'India'
}

function relativeDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Recently'
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86_400_000))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 35) {
    const weeks = Math.floor(days / 7)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  }
  const months = Math.floor(days / 30)
  return `${months} month${months > 1 ? 's' : ''} ago`
}

/** Readable URL slug for a job, e.g. "aws-developer-7ea60d" — the title plus a short
 * suffix from the job id so postings with the same title never collide. */
function jobSlug(job: PortalJob): string {
  const titleSlug = slugifyHeading(job.title)
  const idSuffix = job.id.slice(-6)
  return titleSlug ? `${titleSlug}-${idSuffix}` : job.id
}

function summarize(description: string): string {
  const text = description.replace(/\s+/g, ' ').trim()
  if (text.length <= 160) return text
  const cut = text.slice(0, 160)
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 1))}…`
}

function toJobInfo(job: PortalJob): JobInfo {
  const isInternship = job.type === 'Internship'
  const { pay, per } = payInfo(job)
  const mode = workMode(job.location || 'India')
  const location = cleanLocation(job.location || 'India', mode)
  return {
    slug: jobSlug(job),
    type: isInternship ? 'internship' : 'job',
    roleType: job.type,
    ...(job.department ? { department: job.department } : {}),
    ...(job.duration ? { duration: job.duration } : {}),
    company: job.company || 'Surwive partner',
    companyLogo: job.companyLogo || undefined,
    initial: (job.company || 'S').trim().charAt(0).toUpperCase(),
    featured: false,
    title: job.title,
    location,
    mode,
    detail: isInternship ? job.duration || 'Internship' : job.type,
    skills: job.skills.map((s) => s.name),
    pay,
    per,
    summary: summarize(job.description),
    posted: relativeDate(job.postedDate),
    applicants: `${job.applicants} applicant${job.applicants === 1 ? '' : 's'}`,
    openings: job.spots ? `${job.spots} opening${job.spots === 1 ? '' : 's'}` : '',
    aboutCompany: [],
    aboutRole: job.description
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    niceToHave: [],
    benefits: job.benefits,
  }
}

export async function fetchPortalJobs(): Promise<JobInfo[]> {
  const res = await fetch(`${API_BASE}/api/portal/jobs`)
  if (!res.ok) throw new Error(`portal jobs request failed: ${res.status}`)
  const data = (await res.json()) as { jobs?: PortalJob[] }
  return (data.jobs ?? []).map(toJobInfo)
}
