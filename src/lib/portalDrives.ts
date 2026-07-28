import type { DriveInfo } from '../data/drives'
import { API_BASE } from './config'

/** Drive shape returned by the backend's public endpoint (GET /api/portal/drives). */
type PortalDrive = {
  id: string
  slug: string
  title: string
  host: string
  type: string // always 'Walk-in'
  date: string // YYYY-MM-DD
  day: string // '16'
  month: string // 'Jul'
  time: string
  location: string
  mode: string // 'On-site' | 'Online' | 'Hybrid'
  image: string // banner uploaded in the admin panel (URL or data-URI)
  tags: string[]
  perk: string
  salary: string
  openings: string
  deadline: string
  aboutCompany: string[]
  aboutDrive: string[]
  positions: Array<{ title: string; exp: string }>
  process: Array<{ step: string; detail: string }>
  schedule: Array<{ time: string; item: string }>
  eligibility: string[]
  perks: string[]
  documents: string[]
  contact: { name: string; role: string; email: string }
}

const MODES: DriveInfo['mode'][] = ['On-site', 'Online', 'Hybrid']

function toDriveInfo(drive: PortalDrive): DriveInfo {
  const mode = (MODES as string[]).includes(drive.mode) ? (drive.mode as DriveInfo['mode']) : 'On-site'
  return {
    slug: drive.slug,
    title: drive.title,
    host: drive.host || 'Surwive',
    type: drive.type || 'Walk-in',
    day: drive.day,
    month: drive.month,
    time: drive.time,
    location: drive.location,
    mode,
    ...(drive.image ? { image: drive.image } : {}),
    tags: drive.tags ?? [],
    perk: drive.perk,
    salary: drive.salary,
    openings: drive.openings,
    deadline: drive.deadline,
    aboutCompany: drive.aboutCompany ?? [],
    aboutDrive: drive.aboutDrive ?? [],
    positions: drive.positions ?? [],
    process: drive.process ?? [],
    schedule: drive.schedule ?? [],
    eligibility: drive.eligibility ?? [],
    perks: drive.perks ?? [],
    documents: drive.documents ?? [],
    contact: drive.contact ?? { name: '', role: '', email: '' },
  }
}

/** Published walk-in drives from the backend, soonest first. Throws when unreachable. */
export async function fetchPortalDrives(): Promise<DriveInfo[]> {
  const res = await fetch(`${API_BASE}/api/portal/drives`)
  if (!res.ok) throw new Error(`portal drives request failed: ${res.status}`)
  const data = (await res.json()) as { drives?: PortalDrive[] }
  return (data.drives ?? []).map(toDriveInfo)
}
