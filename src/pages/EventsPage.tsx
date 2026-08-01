import { useState, type CSSProperties } from 'react'
import { SectionHead } from '../components/SectionHead'
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconPin,
  IconSpark,
  IconTrophy,
  IconUsers,
} from '../components/icons'
import { eventAccent, type EventInfo } from '../data/events'
import { LocationLink } from '../components/LocationLink'
import { useStickySide } from '../hooks/useStickySide'
import { useEvents } from '../hooks/useEvents'
import { initials, mapsUrl } from '../lib/utils'
import { Link } from '../components/Link'

function EventMedia({ event, className }: { event: EventInfo; className: string }) {
  return (
    <div className={className}>
      {event.image ? (
        <img
          src={event.image}
          alt=""
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      ) : (
        <span className="event-media__fallback" aria-hidden="true">
          {event.type === 'Hackathon' ? <IconTrophy /> : <IconSpark />}
        </span>
      )}
    </div>
  )
}

function EventCard({ event, index }: { event: EventInfo; index: number }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="event-card"
      style={{ '--ev-accent': eventAccent(event), animationDelay: `${index * 70}ms` } as CSSProperties}
    >
      <div className="event-card__media">
        <EventMedia event={event} className="event-card__img" />
        <span className="event-card__type event-card__type--overlay">{event.type}</span>
        <span className="event-card__date" aria-hidden="true">
          <strong>{event.day}</strong>
          <span>{event.month}</span>
        </span>
      </div>
      <div className="event-card__body">
        <h3>{event.title}</h3>
        <span className="event-card__host">by {event.host}</span>
        <div className="event-card__facts">
          <span><IconClock /> {event.time}</span>
          <span><IconPin /> {event.location} · {event.mode}</span>
        </div>
        <div className="event-card__foot">
          <span className="event-card__perk"><IconSpark /> {event.perk}</span>
          <span className="event-card__arrow" aria-hidden="true"><IconArrowUpRight /></span>
        </div>
      </div>
    </Link>
  )
}

function EventSpotlight({ event }: { event: EventInfo }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="event-spotlight"
      style={{ '--ev-accent': eventAccent(event) } as CSSProperties}
    >
      <div className="event-spotlight__media">
        <EventMedia event={event} className="event-spotlight__img" />
        <span className="event-card__date" aria-hidden="true">
          <strong>{event.day}</strong>
          <span>{event.month}</span>
        </span>
      </div>
      <div className="event-spotlight__body">
        <div className="event-spotlight__chips">
          <span className="event-chip event-chip--type">{event.type}</span>
          <span className="event-chip">{event.mode}</span>
          <span className="event-spotlight__soon"><IconSpark /> Up next</span>
        </div>
        <h3>{event.title}</h3>
        <span className="event-card__host">by {event.host}</span>
        <div className="event-spotlight__facts">
          <span><IconClock /> {event.time}</span>
          <span><IconPin /> {event.location}</span>
          <span><IconUsers /> {event.attendees}</span>
          <span><IconTrophy /> {event.perk}</span>
        </div>
        <div className="event-spotlight__foot">
          <span className="event-spotlight__price">{event.price}</span>
          <span className="event-spotlight__cta">View event <IconArrowUpRight /></span>
        </div>
      </div>
    </Link>
  )
}

const EVENTS_PER_PAGE = 9

function EventsList({ catalog, loading }: { catalog: EventInfo[]; loading: boolean }) {
  const [filter, setFilter] = useState<'all' | 'events' | 'hackathons'>('all')
  const [page, setPage] = useState(1)

  const items = catalog.filter((item) =>
    filter === 'all' ? true : filter === 'hackathons' ? item.type === 'Hackathon' : item.type !== 'Hackathon'
  )
  const hackathonCount = catalog.filter((e) => e.type === 'Hackathon').length

  const [spotlight, ...rest] = items
  const totalPages = Math.max(1, Math.ceil(rest.length / EVENTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paged = rest.slice((safePage - 1) * EVENTS_PER_PAGE, safePage * EVENTS_PER_PAGE)

  function pickFilter(f: 'all' | 'events' | 'hackathons') {
    setFilter(f)
    setPage(1)
  }
  function gotoPage(p: number) {
    setPage(Math.min(Math.max(1, p), totalPages))
    window.scrollTo({ top: 0 })
  }

  return (
    <section className="blog events-page">
      <SectionHead
        eyebrow="Events & Hackathons"
        title="Every event worth your calendar"
        sub="Showcase Your Skills, Win Challenges, and Connect with Leading Companies Through Events and Hackathons."
      />

      <div className="blog__filters reveal" role="tablist" aria-label="Event types">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={`blog-pill ${filter === 'all' ? 'is-active' : ''}`}
          style={{ '--blog-accent': 'var(--accent)' } as CSSProperties}
          onClick={() => pickFilter('all')}
        >
          <IconSpark /> All <span className="blog-pill__count">{catalog.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'events'}
          className={`blog-pill ${filter === 'events' ? 'is-active' : ''}`}
          style={{ '--blog-accent': '#7b8cff' } as CSSProperties}
          onClick={() => pickFilter('events')}
        >
          <IconUsers /> Events <span className="blog-pill__count">{catalog.length - hackathonCount}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'hackathons'}
          className={`blog-pill ${filter === 'hackathons' ? 'is-active' : ''}`}
          style={{ '--blog-accent': '#ff7a50' } as CSSProperties}
          onClick={() => pickFilter('hackathons')}
        >
          <IconTrophy /> Hackathons <span className="blog-pill__count">{hackathonCount}</span>
        </button>
      </div>

      <div className="events-feed" key={`${filter}-${safePage}`}>
        {safePage === 1 && spotlight && <EventSpotlight event={spotlight} />}
        <div className="events-grid">
          {paged.map((event, i) => (
            <EventCard event={event} index={i} key={event.slug} />
          ))}
        </div>
        {items.length === 0 && (
          <div className="jobs-empty">
            <span className="jobs-empty__icon"><IconSpark /></span>
            <strong>{loading ? 'Loading events…' : 'No events here yet'}</strong>
            <p>
              {loading
                ? 'Fetching the latest events and hackathons from Surwive.'
                : 'Check back soon — new events and hackathons are announced all the time.'}
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="blog__pagination" aria-label="Event pages">
          <button type="button" onClick={() => gotoPage(safePage - 1)} disabled={safePage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              type="button"
              key={i}
              className={safePage === i + 1 ? 'is-active' : ''}
              aria-current={safePage === i + 1 ? 'page' : undefined}
              onClick={() => gotoPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button type="button" onClick={() => gotoPage(safePage + 1)} disabled={safePage === totalPages}>
            Next
          </button>
        </nav>
      )}
    </section>
  )
}

function EventDetail({
  event,
  catalog,
  onRegister,
}: {
  event: EventInfo
  catalog: EventInfo[]
  onRegister: () => void
}) {
  const others = catalog.filter((e) => e.slug !== event.slug).slice(0, 3)
  const sideRef = useStickySide<HTMLElement>()

  return (
    <section
      className="blog events-page events-page--detail"
      style={{ '--ev-accent': eventAccent(event) } as CSSProperties}
      key={event.slug}
    >
      <Link href="/events" className="article__back">← All events & hackathons</Link>

      <header className="event-hero event-hero--banner">
        <div className="event-hero__media">
          <EventMedia event={event} className="event-hero__img" />
          <div className="event-hero__scrim" aria-hidden="true" />
          <div className="event-hero__chips">
            <span className="event-chip event-chip--type">{event.type}</span>
            <span className="event-chip event-chip--glass">{event.mode}</span>
            {event.mode === 'Online' ? (
              <span className="event-chip event-chip--glass">{event.location}</span>
            ) : (
              <a
                className="event-chip event-chip--glass event-chip--link"
                href={mapsUrl(event.location)}
                target="_blank"
                rel="noreferrer"
                title={`Open ${event.location} in Google Maps`}
              >
                <IconPin /> {event.location}
              </a>
            )}
          </div>
        </div>
        <div className="event-hero__main">
          <div className="event-hero__title-row">
            <div className="event-hero__heading">
              <h1>{event.title}</h1>
              <p className="event-hero__org">
                Organized by <strong>{event.host}</strong>
              </p>
            </div>
            <div className="event-hero__cta">
              <span className="event-hero__price">{event.price}</span>
              <span className="event-hero__price-note">{event.priceNote}</span>
              <button type="button" className="btn btn--solid event-hero__register" onClick={onRegister}>
                Register now <IconArrowUpRight />
              </button>
            </div>
          </div>
          <div className="event-hero__glance">
            <div className="event-glance">
              <span className="event-glance__badge" aria-hidden="true">
                <strong>{event.day}</strong>
                <span>{event.month}</span>
              </span>
              <span className="event-glance__body">
                <span className="event-glance__label">Date</span>
                <span className="event-glance__value">{event.day} {event.month}</span>
              </span>
            </div>
            <div className="event-glance">
              <span className="event-glance__icon"><IconClock /></span>
              <span className="event-glance__body">
                <span className="event-glance__label">Time</span>
                <span className="event-glance__value">{event.time}</span>
              </span>
            </div>
            <div className="event-glance">
              <span className="event-glance__icon"><IconPin /></span>
              <span className="event-glance__body">
                <span className="event-glance__label">{event.mode} · Location</span>
                <span className="event-glance__value">
                  <LocationLink location={event.location} online={event.mode === 'Online'} />
                </span>
              </span>
            </div>
            <div className="event-glance">
              <span className="event-glance__icon"><IconUsers /></span>
              <span className="event-glance__body">
                <span className="event-glance__label">Attendees</span>
                <span className="event-glance__value">{event.attendees}</span>
              </span>
            </div>
            <div className="event-glance">
              <span className="event-glance__icon"><IconTrophy /></span>
              <span className="event-glance__body">
                <span className="event-glance__label">Perk</span>
                <span className="event-glance__value">{event.perk}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="article-layout">
        <div className="event-main">
          <div className="event-panel">
            <h2>About this event</h2>
            {event.about.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="event-panel">
            <h2>Why attend</h2>
            <ul className="event-highlights">
              {event.highlights.map((h) => (
                <li key={h}>
                  <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="event-panel">
            <h2>Agenda</h2>
            <ol className="event-agenda">
              {event.agenda.map((slot) => (
                <li key={`${slot.time}-${slot.item}`}>
                  <span className="event-agenda__time">{slot.time}</span>
                  <span className="event-agenda__item">{slot.item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="event-panel">
            <h2>Featured speakers</h2>
            <div className="event-speakers">
              {event.speakers.map((sp) => (
                <div className="event-speaker" key={sp.name}>
                  <span className="event-speaker__avatar" aria-hidden="true">{initials(sp.name)}</span>
                  <strong>{sp.name}</strong>
                  <span>{sp.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="event-panel">
            <h2>Participating companies</h2>
            <div className="event-companies">
              {event.companies.map((c) => (
                <span className="article__tag" key={c}>{c}</span>
              ))}
            </div>
          </div>

          <div className="event-panel">
            <h2>What to bring</h2>
            <ul className="event-highlights event-highlights--single">
              {event.bring.map((b) => (
                <li key={b}>
                  <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="article-side" ref={sideRef}>
          <div className="article-side__card event-register">
            <span className="event-register__price">{event.price}</span>
            <span className="event-register__note">{event.priceNote}</span>
            <button type="button" className="btn btn--solid" onClick={onRegister}>
              Register now <IconArrowUpRight />
            </button>
          </div>

          <div className="article-side__card">
            <h3>Event details</h3>
            <ul className="event-facts">
              <li><span className="event-facts__icon"><IconClock /></span><span><strong>{event.day} {event.month}</strong><span>{event.time}</span></span></li>
              <li><span className="event-facts__icon"><IconPin /></span><span><strong><LocationLink location={event.location} online={event.mode === 'Online'} /></strong><span>{event.mode}</span></span></li>
              <li><span className="event-facts__icon"><IconUsers /></span><span><strong>Attendees</strong><span>{event.attendees}</span></span></li>
              <li><span className="event-facts__icon"><IconTrophy /></span><span><strong>Perk</strong><span>{event.perk}</span></span></li>
            </ul>
          </div>

          <div className="article-side__card">
            <h3>Organized by</h3>
            <div className="article-side__author-head">
              <span className="article__avatar article__avatar--lg" aria-hidden="true">{initials(event.host)}</span>
              <div>
                <h3 className="event-org__name">{event.host}</h3>
                <span className="article__author-role">{event.organizerRole}</span>
              </div>
            </div>
          </div>

          {others.length > 0 && (
            <div className="article-side__card">
              <h3>You might also like</h3>
              <ul className="event-mini-list">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/events/${o.slug}`} style={{ '--ev-accent': eventAccent(o) } as CSSProperties}>
                      <span className="event-mini-list__date" aria-hidden="true">
                        <strong>{o.day}</strong>
                        <span>{o.month}</span>
                      </span>
                      <span className="event-mini-list__body">
                        <strong>{o.title}</strong>
                        <span>{o.type} · {o.location}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

export function EventsPage({ slug, onRegister }: { slug: string | null; onRegister: () => void }) {
  const { events, loading } = useEvents()
  const event = slug ? events.find((e) => e.slug === slug) : undefined
  if (event) return <EventDetail event={event} catalog={events} onRegister={onRegister} />
  if (slug && !loading) {
    return (
      <section className="blog events-page">
        <Link href="/events" className="article__back">← All events & hackathons</Link>
        <div className="jobs-empty">
          <span className="jobs-empty__icon"><IconSpark /></span>
          <strong>Event not found</strong>
          <p>It may have wrapped up or been unpublished. Browse what's coming up instead.</p>
        </div>
      </section>
    )
  }
  if (slug) {
    return (
      <section className="blog events-page">
        <div className="jobs-empty">
          <span className="jobs-empty__icon"><IconSpark /></span>
          <strong>Loading event…</strong>
          <p>Fetching the details from Surwive.</p>
        </div>
      </section>
    )
  }
  return <EventsList catalog={events} loading={loading} />
}
