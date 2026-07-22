import { useEffect, useState } from 'react'

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  const route = hash.startsWith('#/jobs')
    ? 'jobs'
    : hash.startsWith('#/pricing')
      ? 'pricing'
    : hash.startsWith('#/blog')
      ? 'blog'
      : hash.startsWith('#/events')
        ? 'events'
        : hash.startsWith('#/drives')
          ? 'drives'
          : hash.startsWith('#/faqs')
            ? 'faqs'
            : 'home'
  return { route, hash }
}
