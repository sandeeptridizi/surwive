export const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5001'

// CDN origin that serves uploaded assets (company logos, etc.). The API stores
// and returns relative paths; `lib/media.ts` prepends this to render them.
export const CDN_BASE = import.meta.env.VITE_CDN_URL ?? ''
