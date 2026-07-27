import { useEffect, useState } from 'react'
import type { EventInfo } from '../data/events'
import { fetchPortalEvents } from '../lib/portalEvents'

let cache: EventInfo[] | null = null
let inflight: Promise<EventInfo[]> | null = null

/**
 * Live events & hackathons published from the admin panel, fetched once per
 * session. The site renders only what the admin has published — when the API
 * is unreachable the pages show their empty states rather than sample data.
 */
export function useEvents() {
  const [events, setEvents] = useState<EventInfo[]>(cache ?? [])
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache) return
    if (!inflight) inflight = fetchPortalEvents().catch(() => [])
    let alive = true
    void inflight.then((list) => {
      cache = list
      if (alive) {
        setEvents(list)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [])

  return { events, loading }
}
