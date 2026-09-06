import { useEffect, useState } from 'react'
import { Link } from '../components/Link'
import {
  IconArrowUpRight,
  IconCalendar,
  IconCheck,
  IconClock,
  IconGrad,
  IconPin,
  IconShare,
  IconSpark,
  IconUsers,
} from '../components/icons'
import { fetchPortalWorkshopBySlug, type PortalWorkshopDetail } from '../lib/portalWorkshops'

function formatDate(iso: string | null): string {
  if (!iso) return 'TBA'
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

type DescriptionSection = { heading: string; rows: { label: string; value: string }[] }

/**
 * Workshop descriptions are one free-text field, but admins commonly write
 * "Heading" followed by "Label: Value" lines (e.g. "Job Opportunity"), a lone
 * "Eligibility Criteria" heading followed by requirement lines, and a trailing
 * "Important: ..." line. Pull those out as their own panels instead of dumping
 * everything into one wall of text.
 */
function parseWorkshopDescription(description: string): {
  text: string
  sections: DescriptionSection[]
  eligibility: string[]
  importantNote: string
} {
  const blocks = description.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)
  const textBlocks: string[] = []
  const sections: DescriptionSection[] = []
  const eligibility: string[] = []
  let importantNote = ''

  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
    const [heading, ...rest] = lines

    if (/^important\s*:/i.test(block)) {
      importantNote = block.replace(/^important\s*:\s*/i, '')
      continue
    }

    if (heading && heading.toLowerCase() === 'eligibility criteria' && rest.length > 0) {
      eligibility.push(...rest)
      continue
    }

    const rows = rest.map((line) => {
      const idx = line.indexOf(':')
      return idx > 0 ? { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() } : null
    })
    const isSection = heading && !heading.includes(':') && rest.length > 0 && rows.every((r) => r !== null)
    if (isSection) {
      sections.push({ heading, rows: rows as { label: string; value: string }[] })
    } else {
      textBlocks.push(block)
    }
  }

  return { text: textBlocks.join('\n\n'), sections, eligibility, importantNote }
}

function WorkshopMedia({ workshop, className }: { workshop: PortalWorkshopDetail; className: string }) {
  return (
    <div className={className}>
      {workshop.image ? (
        <img src={workshop.image} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
      ) : (
        <span className="event-media__fallback" aria-hidden="true"><IconGrad /></span>
      )}
    </div>
  )
}

function WorkshopDetail({ workshop, onRegister }: { workshop: PortalWorkshopDetail; onRegister: () => void }) {
  const [linkCopied, setLinkCopied] = useState(false)
  const registrationClosed = workshop.registrationEndDate
    ? new Date(workshop.registrationEndDate) < new Date()
    : false
  const closed = registrationClosed || workshop.seatsLeft <= 0

  const copyWorkshopLink = async () => {
    const url = `${window.location.origin}/workshops/${workshop.slug}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      /* clipboard unavailable */
    }
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const { text: aboutText, sections, eligibility, importantNote } = parseWorkshopDescription(workshop.description || '')
  const paragraphs = aboutText
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section className="blog drives-page drives-page--detail" key={workshop.slug}>
      <Link href="/" className="article__back">← Back to Surwive</Link>

      <header className="event-hero event-hero--banner">
        <div className="event-hero__media">
          <WorkshopMedia workshop={workshop} className="event-hero__img" />
          <div className="event-hero__scrim" aria-hidden="true" />
          <div className="event-hero__chips">
            <span className="event-chip event-chip--type">Workshop</span>
            <span className="event-chip event-chip--glass">{workshop.isFree ? 'Free' : `₹${workshop.price}`}</span>
            <span className="event-chip event-chip--glass"><IconPin /> {workshop.location || 'TBA'}</span>
          </div>
        </div>
        <div className="event-hero__main">
          <div className="event-hero__title-row">
            <div className="event-hero__heading">
              <div className="event-hero__title">
                {workshop.logo && (
                  <span className="event-hero__logo" aria-hidden="true">
                    <img src={workshop.logo} alt="" />
                  </span>
                )}
                <h1>{workshop.title}</h1>
              </div>
            </div>
            <div className="event-hero__cta">
              <span className="event-hero__price">{workshop.isFree ? 'Free' : `₹${workshop.price}`}</span>
              <span className="event-hero__price-note">
                {closed ? 'Registration closed' : `Closes ${formatDate(workshop.registrationEndDate)}`}
              </span>
              <div className="job-hero__actions-row">
                <button type="button" className="btn btn--solid event-hero__register" onClick={onRegister} disabled={closed}>
                  {closed ? 'Registration closed' : 'Register now'} <IconArrowUpRight />
                </button>
                <button
                  type="button"
                  className="job-hero__share"
                  onClick={copyWorkshopLink}
                  aria-label="Copy shareable link to this workshop"
                  title={linkCopied ? 'Link copied!' : 'Copy shareable link'}
                >
                  {linkCopied ? <IconCheck /> : <IconShare />}
                </button>
              </div>
            </div>
          </div>
          <div className="event-hero__glance">
            <div className="event-glance">
              <span className="event-glance__icon"><IconClock /></span>
              <span className="event-glance__body">
                <span className="event-glance__label">Duration</span>
                <span className="event-glance__value">{workshop.duration || 'TBA'}</span>
              </span>
            </div>
            <div className="event-glance">
              <span className="event-glance__icon"><IconCalendar /></span>
              <span className="event-glance__body">
                <span className="event-glance__label">Dates</span>
                <span className="event-glance__value">
                  {formatDate(workshop.startDate)}{workshop.endDate ? ` – ${formatDate(workshop.endDate)}` : ''}
                </span>
              </span>
            </div>
            <div className="event-glance">
              <span className="event-glance__icon"><IconCalendar /></span>
              <span className="event-glance__body">
                <span className="event-glance__label">Registration closes</span>
                <span className="event-glance__value">{formatDate(workshop.registrationEndDate)}</span>
              </span>
            </div>
            <div className="event-glance">
              <span className="event-glance__icon"><IconUsers /></span>
              <span className="event-glance__body">
                <span className="event-glance__label">Registered</span>
                <span className="event-glance__value">
                  {workshop.registeredCount}{workshop.maxCapacity ? ` / ${workshop.maxCapacity}` : ''}
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="article-layout">
        <div className="event-main">
          <div className="event-panel">
            <h2>About this workshop</h2>
            {paragraphs.length > 0
              ? paragraphs.map((para) => <p key={para}>{para}</p>)
              : <p>No description has been added for this workshop yet.</p>}
          </div>
        </div>

        <aside className="article-side">
          {sections.map((section) => (
            <div className="article-side__card" key={section.heading}>
              <h3>{section.heading}</h3>
              <div className="event-spec-list">
                {section.rows.map((row) => (
                  <div className="event-spec-row" key={row.label}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {eligibility.length > 0 && (
            <div className="article-side__card">
              <h3>Eligibility Criteria</h3>
              <ul className="event-highlights event-highlights--single">
                {eligibility.map((item) => (
                  <li key={item}>
                    <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {importantNote && (
            <div className="event-notice">
              <strong>Important</strong>
              <p>{importantNote}</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

export function WorkshopsPage({ slug, onRegister }: { slug: string | null; onRegister: (slug: string) => void }) {
  const [workshop, setWorkshop] = useState<PortalWorkshopDetail | null>(null)
  const [loading, setLoading] = useState(Boolean(slug))

  useEffect(() => {
    if (!slug) {
      setWorkshop(null)
      return
    }
    let cancelled = false
    setWorkshop(null)
    setLoading(true)
    fetchPortalWorkshopBySlug(slug).then((found) => {
      if (cancelled) return
      setWorkshop(found)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (workshop && workshop.slug === slug) {
    return <WorkshopDetail workshop={workshop} onRegister={() => onRegister(workshop.slug)} />
  }
  if (slug && !loading) {
    return (
      <section className="blog drives-page">
        <Link href="/" className="article__back">← Back to Surwive</Link>
        <div className="jobs-empty">
          <span className="jobs-empty__icon"><IconSpark /></span>
          <strong>Workshop not found</strong>
          <p>It may have closed or been unpublished. Check the homepage for what's live now.</p>
        </div>
      </section>
    )
  }
  if (slug) {
    return (
      <section className="blog drives-page">
        <div className="jobs-empty">
          <span className="jobs-empty__icon"><IconSpark /></span>
          <strong>Loading workshop…</strong>
          <p>Fetching the details from Surwive.</p>
        </div>
      </section>
    )
  }
  return (
    <section className="blog drives-page">
      <div className="jobs-empty">
        <span className="jobs-empty__icon"><IconGrad /></span>
        <strong>Browse training &amp; workshops</strong>
        <p>Open a workshop's link to see it here, or check the homepage for what's live now.</p>
        <Link href="/#workshops" className="btn btn--outline btn--sm">See workshops</Link>
      </div>
    </section>
  )
}
