import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const DOT_TONES = ['gold', 'violet', 'teal', 'coral'] as const
const DOTS = Array.from({ length: 26 }, (_, i) => DOT_TONES[i % DOT_TONES.length])
const SHAPES = ['ring', 'square', 'plus', 'ring', 'square', 'plus'] as const
const STREAKS = [0, 1, 2]

export function HomeBackgroundFx() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const q = gsap.utils.selector(rootRef)
      const rand = gsap.utils.random

      ;(q('.bgfx__dot') as HTMLElement[]).forEach((dot) => {
        gsap.set(dot, {
          left: `${rand(2, 98)}%`,
          top: `${rand(2, 98)}%`,
          scale: rand(0.5, 1.4),
        })
        gsap
          .to(dot, {
            x: rand(-60, 60),
            y: rand(-140, -40),
            duration: rand(12, 26),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
          .progress(rand(0, 1))
        gsap
          .to(dot, {
            opacity: rand(0.2, 0.75),
            duration: rand(1.8, 4),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
          .progress(rand(0, 1))
      })

      ;(q('.bgfx__shape') as HTMLElement[]).forEach((shape) => {
        gsap.set(shape, {
          left: `${rand(4, 92)}%`,
          top: `${rand(6, 88)}%`,
          rotation: rand(0, 360),
        })
        gsap.to(shape, { opacity: rand(0.14, 0.3), duration: 2, ease: 'power1.out' })
        gsap.to(shape, {
          rotation: '+=360',
          duration: rand(30, 55),
          ease: 'none',
          repeat: -1,
        })
        gsap
          .to(shape, {
            x: rand(-80, 80),
            y: rand(-100, 100),
            duration: rand(18, 32),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
          .progress(rand(0, 1))
      })

      ;(q('.bgfx__streak') as HTMLElement[]).forEach((streak, i) => {
        const tl = gsap.timeline({
          delay: 2 + i * 4 + rand(0, 3),
          repeat: -1,
          repeatDelay: rand(5, 11),
          repeatRefresh: true,
        })
        tl.set(streak, {
          left: () => `${rand(0, 70)}vw`,
          top: () => `${rand(2, 40)}vh`,
          x: 0,
          y: 0,
          rotation: 35,
          opacity: 0,
        })
          .to(streak, { x: 340, y: 238, duration: 1.25, ease: 'power1.inOut' }, 0)
          .to(streak, { opacity: 0.8, duration: 0.4, ease: 'power2.in' }, 0)
          .to(streak, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.65)
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="bgfx" aria-hidden="true">
      {DOTS.map((tone, i) => (
        <span key={`d${i}`} className={`bgfx__dot bgfx__dot--${tone}`} />
      ))}
      {SHAPES.map((kind, i) => (
        <span key={`s${i}`} className={`bgfx__shape bgfx__shape--${kind}`} />
      ))}
      {STREAKS.map((i) => (
        <span key={`l${i}`} className="bgfx__streak" />
      ))}
    </div>
  )
}
