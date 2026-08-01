import { useEffect, useState } from 'react'
import type { JobInfo } from '../data/jobs'
import { fetchPortalJobs } from '../lib/portalJobs'

let cache: JobInfo[] | null = null
let inflight: Promise<JobInfo[]> | null = null

/** Round-robins postings across companies so the board reads as a mix rather
 * than every opening from one company in a row before the next company starts. */
function interleaveByCompany(jobs: JobInfo[]): JobInfo[] {
  const buckets = new Map<string, JobInfo[]>()
  for (const job of jobs) {
    const bucket = buckets.get(job.company)
    if (bucket) bucket.push(job)
    else buckets.set(job.company, [job])
  }
  const order = Array.from(buckets.values())
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  const result: JobInfo[] = []
  for (let round = 0; result.length < jobs.length; round++) {
    for (const bucket of order) {
      if (round < bucket.length) result.push(bucket[round])
    }
  }
  return result
}

/** Mixes company order within each posting type, keeping jobs and internships as separate blocks. */
function mixCatalog(jobs: JobInfo[]): JobInfo[] {
  const byType = interleaveByCompany(jobs.filter((j) => j.type === 'job'))
  const byInternship = interleaveByCompany(jobs.filter((j) => j.type === 'internship'))
  return [...byType, ...byInternship]
}

/** Live job catalog from the backend portal API, fetched once per session. */
export function useJobs() {
  const [jobs, setJobs] = useState<JobInfo[]>(cache ?? [])
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache) return
    if (!inflight) inflight = fetchPortalJobs().then(mixCatalog).catch(() => [])
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
