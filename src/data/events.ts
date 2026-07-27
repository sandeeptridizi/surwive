import type { DriveEvent } from './drives'

export type EventInfo = DriveEvent & {
  slug: string
  /** Banner image uploaded by the organizer when creating the event; falls back to an accent gradient when absent. */
  image?: string
  price: string
  priceNote: string
  attendees: string
  organizerRole: string
  about: string[]
  highlights: string[]
  agenda: { time: string; item: string }[]
  speakers: { name: string; role: string }[]
  companies: string[]
  bring: string[]
}

export const eventTypeColors: Record<string, string> = {
  Hackathon: '#ff7a50',
  Conference: '#7b8cff',
  Webinar: '#ffc53d',
  Meetup: '#35d0bc',
  Workshop: '#6fd88a',
}

export function eventAccent(event: EventInfo) {
  return eventTypeColors[event.type] ?? '#ffc53d'
}
