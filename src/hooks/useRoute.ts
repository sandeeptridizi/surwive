import { useEffect, useState } from 'react'
import { NAV_EVENT } from '../lib/router'

function currentLocation() {
  return {
    path: window.location.pathname + window.location.search,
    hash: window.location.hash,
  }
}

export function useRoute() {
  const [{ path, hash }, setLocation] = useState(currentLocation)

  useEffect(() => {
    const onChange = () => setLocation(currentLocation())
    window.addEventListener('popstate', onChange)
    window.addEventListener(NAV_EVENT, onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener(NAV_EVENT, onChange)
    }
  }, [])

  const pathname = path.split('?')[0] || '/'
  const route = pathname === '/jobs' || pathname.startsWith('/jobs/')
    ? 'jobs'
    : pathname === '/pricing'
      ? 'pricing'
    : pathname === '/for-recruiters'
      ? 'for-recruiters'
    : pathname === '/blog' || pathname.startsWith('/blog/')
      ? 'blog'
      : pathname === '/events' || pathname.startsWith('/events/')
        ? 'events'
        : pathname === '/drives' || pathname.startsWith('/drives/')
          ? 'drives'
          : pathname === '/faqs'
            ? 'faqs'
            : pathname === '/contact'
              ? 'contact'
              : pathname === '/legal' || pathname.startsWith('/legal/')
                ? 'legal'
                : 'home'

  return { route, path, hash }
}
