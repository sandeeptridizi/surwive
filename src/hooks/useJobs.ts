import { useEffect, useState } from 'react'
import { jobCatalog, type JobInfo } from '../data/jobs'
import { fetchPortalJobs } from '../lib/portalJobs'

let cache: JobInfo[] | null = null
let inflight: Promise<JobInfo[]> | null = null

/**
 * Live job catalog from the backend portal API, fetched once per session.
 * Falls back to the bundled sample catalog when the API is unreachable.
 */
export function useJobs() {
  const [jobs, setJobs] = useState<JobInfo[]>(cache ?? [])
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache) return
    if (!inflight) inflight = fetchPortalJobs().catch(() => jobCatalog)
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
