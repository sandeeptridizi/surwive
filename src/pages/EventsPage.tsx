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
import { eventAccent, eventCatalog, type EventInfo } from '../data/events'
import { initials } from '../lib/utils'

function EventCard({ event, index }: { event: EventInfo; index: number }) {
  return (
    <a
      href={`#/events/${event.slug}`}
      className="event-card"
      style={{ '--ev-accent': eventAccent(event), animationDelay: `${index * 70}ms` } as CSSProperties}
    >
      <div className="event-card__top">
        <span className="event-card__date" aria-hidden="true">
          <strong>{event.day}</strong>
          <span>{event.month}</span>
        </span>
        <span className="event-card__type">{event.type}</span>
      </div>
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
    </a>
  )
}

function EventsList() {
  const [filter, setFilter] = useState<'all' | 'events' | 'hackathons'>('all')

  const items = eventCatalog.filter((item) =>
    filter === 'all' ? true : filter === 'hackathons' ? item.type === 'Hackathon' : item.type !== 'Hackathon'
  )
  const hackathonCount = eventCatalog.filter((e) => e.type === 'Hackathon').length

  return (
    <section className="blog events-page">
      <SectionHead
        eyebrow="Events & Hackathons"
        title="Every event worth your calendar"
        sub="Hackathons with real prize money, conferences with real builders, and meetups where the hiring actually happens."
      />

      <div className="blog__filters reveal" role="tablist" aria-label="Event types">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={`blog-pill ${filter === 'all' ? 'is-active' : ''}`}
          style={{ '--blog-accent': 'var(--accent)' } as CSSProperties}
          onClick={() => setFilter('all')}
        >
          <IconSpark /> All <span className="blog-pill__count">{eventCatalog.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'events'}
          className={`blog-pill ${filter === 'events' ? 'is-active' : ''}`}
          style={{ '--blog-accent': '#7b8cff' } as CSSProperties}
          onClick={() => setFilter('events')}
        >
          <IconUsers /> Events <span className="blog-pill__count">{eventCatalog.length - hackathonCount}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'hackathons'}
          className={`blog-pill ${filter === 'hackathons' ? 'is-active' : ''}`}
          style={{ '--blog-accent': '#ff7a50' } as CSSProperties}
          onClick={() => setFilter('hackathons')}
        >
          <IconTrophy /> Hackathons <span className="blog-pill__count">{hackathonCount}</span>
        </button>
      </div>

      <div className="events-grid" key={filter}>
        {items.map((event, i) => (
          <EventCard event={event} index={i} key={event.slug} />
        ))}
      </div>
    </section>
  )
}

function EventDetail({ event, onRegister }: { event: EventInfo; onRegister: () => void }) {
  const others = eventCatalog.filter((e) => e.slug !== event.slug).slice(0, 3)

  return (
    <section
      className="blog events-page events-page--detail"
      style={{ '--ev-accent': eventAccent(event) } as CSSProperties}
      key={event.slug}
    >
      <a href="#/events" className="article__back">← All events & hackathons</a>

      <header className="event-hero">
        <div className="event-hero__main">
          <div className="event-hero__chips">
            <span className="event-chip event-chip--type">{event.type}</span>
            <span className="event-chip">{event.mode}</span>
            <span className="event-chip">{event.location}</span>
          </div>
          <h1>{event.title}</h1>
          <p className="event-hero__org">
            Organized by <strong>{event.host}</strong>
          </p>
          <div className="event-hero__facts">
            <span><IconClock /> {event.time}</span>
            <span><IconUsers /> {event.attendees}</span>
            <span><IconSpark /> {event.perk}</span>
          </div>
        </div>
        <div className="event-hero__stub" aria-hidden="true">
          <span className="event-hero__stub-date">
            <strong>{event.day}</strong>
            <span>{event.month}</span>
          </span>
          <span className="event-hero__stub-label">Save the date</span>
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

        <aside className="article-side">
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
              <li><span className="event-facts__icon"><IconPin /></span><span><strong>{event.location}</strong><span>{event.mode}</span></span></li>
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
                    <a href={`#/events/${o.slug}`} style={{ '--ev-accent': eventAccent(o) } as CSSProperties}>
                      <span className="event-mini-list__date" aria-hidden="true">
                        <strong>{o.day}</strong>
                        <span>{o.month}</span>
                      </span>
                      <span className="event-mini-list__body">
                        <strong>{o.title}</strong>
                        <span>{o.type} · {o.location}</span>
                      </span>
                    </a>
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
  const event = slug ? eventCatalog.find((e) => e.slug === slug) : undefined
  if (event) return <EventDetail event={event} onRegister={onRegister} />
  return <EventsList />
}
