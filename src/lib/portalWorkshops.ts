import type { WorkshopInfo } from '../data/workshops'
import { API_BASE } from './config'

/** Workshop shape returned by the backend's public endpoint (GET /api/portal/workshops). */
type PortalWorkshop = {
  slug: string
  title: string
  image: string // banner uploaded in the admin panel (URL or data-URI)
  logo: string // organizer logo uploaded in the admin panel (URL or data-URI)
  location: string
  duration: string
  startDate: string | null
  registrationEndDate: string | null
  maxCapacity: number
  seatsLeft: number
  price: number
  isFree: boolean
}

function toWorkshopInfo(workshop: PortalWorkshop): WorkshopInfo {
  const start = workshop.startDate ? new Date(workshop.startDate) : null
  const registrationClosed = workshop.registrationEndDate
    ? new Date(workshop.registrationEndDate) < new Date()
    : false

  return {
    slug: workshop.slug,
    title: workshop.title,
    location: workshop.location || 'Online',
    duration: workshop.duration,
    day: start ? start.toLocaleDateString('en-IN', { day: 'numeric' }) : '',
    month: start ? start.toLocaleDateString('en-IN', { month: 'short' }) : '',
    ...(workshop.image ? { image: workshop.image } : {}),
    ...(workshop.logo ? { logo: workshop.logo } : {}),
    seatsLeft: workshop.seatsLeft,
    maxCapacity: workshop.maxCapacity,
    registrationClosed,
    isFree: workshop.isFree,
    price: workshop.price,
  }
}

/** Published training & workshops from the backend, soonest first. Throws when unreachable. */
export async function fetchPortalWorkshops(limit = 6): Promise<WorkshopInfo[]> {
  const res = await fetch(`${API_BASE}/api/portal/workshops?limit=${limit}`)
  if (!res.ok) throw new Error(`portal workshops request failed: ${res.status}`)
  const data = (await res.json()) as { workshops?: PortalWorkshop[] }
  return (data.workshops ?? []).map(toWorkshopInfo)
}
