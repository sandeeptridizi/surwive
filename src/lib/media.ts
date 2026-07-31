import { CDN_BASE } from './config'

/**
 * Resolves a relative file path stored by the API (e.g. `/app/company/<id>/logo.png`)
 * into a fully-qualified URL the browser can load, by prepending `VITE_CDN_URL`.
 * Already-absolute URLs and empty paths pass through unchanged.
 */
export function getCdnUrl(path?: string | null): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return `${CDN_BASE}${path.startsWith('/') ? path : `/${path}`}`
}
