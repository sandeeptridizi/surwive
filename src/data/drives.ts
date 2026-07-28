export type DriveEvent = {
  host: string
  title: string
  type: string
  day: string
  month: string
  time: string
  location: string
  mode: 'On-site' | 'Online' | 'Hybrid'
  tags: string[]
  perk: string
}

export type DriveInfo = DriveEvent & {
  slug: string
  /** Banner image uploaded by the admin when creating the drive; falls back to an accent gradient when absent. */
  image?: string
  salary: string
  openings: string
  deadline: string
  aboutCompany: string[]
  aboutDrive: string[]
  positions: { title: string; exp: string }[]
  process: { step: string; detail: string }[]
  schedule: { time: string; item: string }[]
  eligibility: string[]
  perks: string[]
  documents: string[]
  contact: { name: string; role: string; email: string }
}

const driveAccentPalette = ['#ffc53d', '#7b8cff', '#ff7a50', '#35d0bc']

/** Deterministic accent per drive — a slug hash picks the palette entry, so it survives list reordering. */
export function driveAccent(drive: Pick<DriveInfo, 'slug'>) {
  let hash = 0
  for (let i = 0; i < drive.slug.length; i++) hash = (hash * 31 + drive.slug.charCodeAt(i)) | 0
  return driveAccentPalette[Math.abs(hash) % driveAccentPalette.length] as string
}
