import type { EventInfo } from '../data/events'
import { API_BASE } from './config'

/** Event shape returned by the backend's public endpoint (GET /api/portal/events). */
type PortalEvent = {
  id: string
  slug: string
  title: string
  host: string
  organizerRole: string
  type: string // 'Hackathon' | 'Conference' | 'Webinar' | 'Meetup' | 'Workshop'
  date: string // YYYY-MM-DD
  day: string // '19'
  month: string // 'Jul'
  time: string
  location: string
  mode: string // 'On-site' | 'Online' | 'Hybrid'
  image: string // banner uploaded in the admin panel (URL or data-URI)
  tags: string[]
  perk: string
  price: string
  priceNote: string
  attendees: string
  about: string[]
  highlights: string[]
  agenda: Array<{ time: string; item: string }>
  speakers: Array<{ name: string; role: string }>
  companies: string[]
  bring: string[]
}

const MODES: EventInfo['mode'][] = ['On-site', 'Online', 'Hybrid']

function toEventInfo(event: PortalEvent): EventInfo {
  const mode = (MODES as string[]).includes(event.mode) ? (event.mode as EventInfo['mode']) : 'On-site'
  return {
    slug: event.slug,
    title: event.title,
    host: event.host || 'Surwive',
    organizerRole: event.organizerRole || 'Event organizer',
    type: event.type,
    day: event.day,
    month: event.month,
    time: event.time,
    location: event.location,
    mode,
    ...(event.image ? { image: event.image } : {}),
    tags: event.tags ?? [],
    perk: event.perk,
    price: event.price || 'Free',
    priceNote: event.priceNote,
    attendees: event.attendees,
    about: event.about ?? [],
    highlights: event.highlights ?? [],
    agenda: event.agenda ?? [],
    speakers: event.speakers ?? [],
    companies: event.companies ?? [],
    bring: event.bring ?? [],
  }
}

/** Published events from the backend, soonest first. Throws when unreachable. */
export async function fetchPortalEvents(): Promise<EventInfo[]> {
  const res = await fetch(`${API_BASE}/api/portal/events`)
  if (!res.ok) throw new Error(`portal events request failed: ${res.status}`)
  const data = (await res.json()) as { events?: PortalEvent[] }
  return (data.events ?? []).map(toEventInfo)
}
