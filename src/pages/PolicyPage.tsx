import { useEffect, useState, type CSSProperties } from 'react'
import { IconCheck, IconClock, IconMail } from '../components/icons'
import { policyBySlug, policyCatalog } from '../data/policies'
import { slugifyHeading } from '../lib/utils'
import { useStickySide } from '../hooks/useStickySide'

export function PolicyPage({ slug }: { slug: string | null }) {
  const policy = policyBySlug(slug)
  const Icon = policy.icon
  const [activeHeading, setActiveHeading] = useState('')
  const sideRef = useStickySide<HTMLElement>()

  const headings = policy.sections.map((s) => ({ text: s.heading, id: slugifyHeading(s.heading) }))

  useEffect(() => {
    setActiveHeading('')
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.article__block h2[id]'))
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [policy.slug])

  return (
    <section
      className="blog blog--article policy-page"
      style={{ '--blog-accent': policy.color } as CSSProperties}
      key={policy.slug}
    >
      <header className="article-hero">
        <div className="article-hero__main">
          <span className="article__chip">Legal</span>
          <h1>{policy.title}</h1>
          <p className="article-hero__excerpt">{policy.summary}</p>
          <div className="article__meta">
            <span className="article__stat"><IconClock /> Last updated {policy.updated}</span>
          </div>
        </div>
        <div className="article-hero__art" aria-hidden="true">
          <span className="blog-feature__rings" />
          <Icon />
        </div>
      </header>

      <div className="article-layout">
        <article className="article__body">
          <p className="article__intro">{policy.intro}</p>
          {policy.sections.map((block, i) => (
            <div className="article__block" key={block.heading}>
              <h2 id={slugifyHeading(block.heading)}>
                <span className="policy-page__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                {block.heading}
              </h2>
              {block.text && <p>{block.text}</p>}
              {block.list && (
                <ul>
                  {block.list.map((item) => (
                    <li key={item}>
                      <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        <aside className="article-side" ref={sideRef}>
          <nav className="article-side__card article-toc" aria-label="On this page">
            <h3>On this page</h3>
            <ul>
              {headings.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    className={activeHeading === h.id ? 'is-active' : ''}
                    onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  >
                    {h.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="article-side__card" aria-label="All policies">
            <h3>All policies</h3>
            <ul className="policy-nav">
              {policyCatalog.map((p) => {
                const PIcon = p.icon
                return (
                  <li key={p.slug}>
                    <a
                      href={`#/legal/${p.slug}`}
                      className={p.slug === policy.slug ? 'is-active' : ''}
                      style={{ '--blog-accent': p.color } as CSSProperties}
                    >
                      <span className="policy-nav__icon" aria-hidden="true"><PIcon /></span>
                      {p.shortTitle}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="article-side__card">
            <h3>Questions?</h3>
            <p className="policy-page__help">
              Anything unclear about this policy? Our team reads every message.
            </p>
            <a className="drive-contact__mail" href="mailto:legal@surwive.com">
              <IconMail /> legal@surwive.com
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}
