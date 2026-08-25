import { useEffect, useState } from 'react'
import type { WorkshopInfo } from '../data/workshops'
import { fetchPortalWorkshops } from '../lib/portalWorkshops'

let cache: WorkshopInfo[] | null = null
let inflight: Promise<WorkshopInfo[]> | null = null

/**
 * Live training & workshops published from the admin panel, fetched once per
 * session. The site renders only what the admin has published — when the API
 * is unreachable the section shows its empty state rather than sample data.
 */
export function useWorkshops() {
  const [workshops, setWorkshops] = useState<WorkshopInfo[]>(cache ?? [])
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache) return
    if (!inflight) inflight = fetchPortalWorkshops().catch(() => [])
    let alive = true
    void inflight.then((list) => {
      cache = list
      if (alive) {
        setWorkshops(list)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [])

  return { workshops, loading }
}
