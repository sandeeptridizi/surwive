import { useEffect, useState } from 'react'
import type { DriveInfo } from '../data/drives'
import { fetchPortalDrives } from '../lib/portalDrives'

let cache: DriveInfo[] | null = null
let inflight: Promise<DriveInfo[]> | null = null

/**
 * Live walk-in drives published from the admin panel, fetched once per
 * session. The site renders only what the admin has published — when the API
 * is unreachable the pages show their empty states rather than sample data.
 */
export function useDrives() {
  const [drives, setDrives] = useState<DriveInfo[]>(cache ?? [])
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache) return
    if (!inflight) inflight = fetchPortalDrives().catch(() => [])
    let alive = true
    void inflight.then((list) => {
      cache = list
      if (alive) {
        setDrives(list)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [])

  return { drives, loading }
}
