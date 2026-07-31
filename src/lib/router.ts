/** Fired after `navigate()` changes the URL via the History API, since `pushState` doesn't trigger `popstate` on its own. */
export const NAV_EVENT = 'app:navigate'

/**
 * Client-side navigation to a real path (e.g. `/jobs/aws-developer`). External/absolute
 * URLs (other origins, portal links) fall back to a normal full-page navigation.
 */
export function navigate(to: string) {
  if (/^https?:\/\//i.test(to)) {
    window.location.href = to
    return
  }
  const current = window.location.pathname + window.location.search + window.location.hash
  if (current === to) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new Event(NAV_EVENT))
}
