import { useEffect, useState } from 'react'
import type { JobInfo } from '../data/jobs'
import { fetchPortalJobs } from '../lib/portalJobs'

let cache: JobInfo[] | null = null
let inflight: Promise<JobInfo[]> | null = null

/** Live job catalog from the backend portal API, fetched once per session. */
export function useJobs() {
  const [jobs, setJobs] = useState<JobInfo[]>(cache ?? [])
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache) return
    if (!inflight) inflight = fetchPortalJobs().catch(() => [])
    let alive = true
    void inflight.then((list) => {
      cache = list
      if (alive) {
        setJobs(list)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [])

  return { jobs, loading }
}
