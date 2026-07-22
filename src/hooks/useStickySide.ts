import { useEffect, useRef } from 'react'

const NAV_OFFSET = 92
const BOTTOM_GAP = 24

/**
 * Sticky sidebar that never traps content off-screen: when the sidebar is
 * taller than the viewport it scrolls along with the page and only pins
 * once its bottom edge is in view.
 */
export function useStickySide<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const fits = el.offsetHeight + NAV_OFFSET + BOTTOM_GAP <= window.innerHeight
      const top = fits ? NAV_OFFSET : window.innerHeight - el.offsetHeight - BOTTOM_GAP
      el.style.top = `${top}px`
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return ref
}
