import { useState, type CSSProperties } from 'react'
import { SectionHead } from '../components/SectionHead'
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconDoc,
  IconMail,
  IconPin,
  IconRupee,
  IconSpark,
  IconUsers,
} from '../components/icons'
import { driveAccent, driveCatalog, type DriveInfo } from '../data/drives'
import { initials } from '../lib/utils'

function DriveRow({ drive, index }: { drive: DriveInfo; index: number }) {
  return (
    <a
      href={`#/drives/${drive.slug}`}
      className="drive-row"
      style={{ '--ev-accent': driveAccent(drive), animationDelay: `${index * 60}ms` } as CSSProperties}
    >
      <span className="drive-row__date" aria-hidden="true">
        <strong>{drive.day}</strong>
        <span>{drive.month}</span>
      </span>

      <div className="drive-row__body">
        <div className="drive-row__title-line">
          <h3>{drive.title}</h3>
          <span className="event-card__type">{drive.mode}</span>
        </div>
        <span className="drive-row__host">{drive.host}</span>
        <div className="drive-row__meta">
          <span><IconClock /> {drive.time}</span>
          <span><IconPin /> {drive.location}</span>
          <span><IconUsers /> {drive.openings}</span>
        </div>
        <div className="drive-row__tags">
          {drive.tags.map((tag) => (
            <span className="job-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="drive-row__side">
        <span className="drive-row__salary">{drive.salary}</span>
        <span className="drive-row__perk"><IconSpark /> {drive.perk}</span>
        <span className="drive-row__cta">View drive <IconArrowUpRight /></span>
      </div>
    </a>
  )
}

function DrivesList() {
  const [city, setCity] = useState('All')
  const cities = Array.from(new Set(driveCatalog.map((d) => d.location)))
  const visible = city === 'All' ? driveCatalog : driveCatalog.filter((d) => d.location === city)

  return (
    <section className="blog drives-page">
      <SectionHead
        eyebrow="Walk-in drives"
        title="Walk in with a resume, walk out with an offer"
        sub="Every drive is verified, every opening is real, and most companies decide on the spot. Pick your city and show up."
      />

      <div className="blog__filters reveal" role="tablist" aria-label="Filter drives by city">
        <button
          type="button"
          role="tab"
          aria-selected={city === 'All'}
          className={`blog-pill ${city === 'All' ? 'is-active' : ''}`}
          style={{ '--blog-accent': 'var(--accent)' } as CSSProperties}
          onClick={() => setCity('All')}
        >
          <IconSpark /> All cities <span className="blog-pill__count">{driveCatalog.length}</span>
        </button>
        {cities.map((c) => (
          <button
            type="button"
            role="tab"
            aria-selected={city === c}
            key={c}
            className={`blog-pill ${city === c ? 'is-active' : ''}`}
            style={{ '--blog-accent': 'var(--accent)' } as CSSProperties}
            onClick={() => setCity(c)}
          >
            <IconPin /> {c} <span className="blog-pill__count">{driveCatalog.filter((d) => d.location === c).length}</span>
          </button>
        ))}
      </div>

      <div className="drive-rows" key={city}>
        {visible.map((drive, i) => (
          <DriveRow drive={drive} index={i} key={drive.slug} />
        ))}
      </div>
    </section>
  )
}

function DriveDetail({ drive, onRegister }: { drive: DriveInfo; onRegister: () => void }) {
  const others = driveCatalog.filter((d) => d.slug !== drive.slug).slice(0, 3)

  return (
    <section
      className="blog drives-page drives-page--detail"
      style={{ '--ev-accent': driveAccent(drive) } as CSSProperties}
      key={drive.slug}
    >
      <a href="#/drives" className="article__back">← All walk-in drives</a>

      <header className="drive-hero">
        <div className="drive-hero__top">
          <div className="event-hero__chips">
            <span className="event-chip event-chip--type">Walk-in drive</span>
            <span className="event-chip">{drive.mode}</span>
            <span className="event-chip">{drive.openings}</span>
          </div>
          <h1>{drive.title}</h1>
          <p className="event-hero__org">
            Hosted by <strong>{drive.host}</strong> · {drive.location}
          </p>
        </div>
        <div className="drive-hero__facts">
          <div className="drive-fact">
            <span className="drive-fact__label">Date</span>
            <strong>{drive.day} {drive.month}</strong>
          </div>
          <div className="drive-fact">
            <span className="drive-fact__label">Time</span>
            <strong>{drive.time}</strong>
          </div>
          <div className="drive-fact">
            <span className="drive-fact__label">Location</span>
            <strong>{drive.location} · {drive.mode}</strong>
          </div>
          <div className="drive-fact">
            <span className="drive-fact__label">Salary range</span>
            <strong>{drive.salary}</strong>
          </div>
          <div className="drive-fact">
            <span className="drive-fact__label">Openings</span>
            <strong>{drive.openings}</strong>
          </div>
        </div>
      </header>

      <div className="article-layout">
        <div className="event-main">
          <div className="event-panel">
            <h2>About {drive.host}</h2>
            {drive.aboutCompany.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="event-panel">
            <h2>About this drive</h2>
            {drive.aboutDrive.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="event-panel">
            <h2>Open positions</h2>
            <div className="drive-positions">
              {drive.positions.map((pos) => (
                <div className="drive-position" key={pos.title}>
                  <strong>{pos.title}</strong>
                  <span>{pos.exp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="event-panel">
            <h2>Selection process</h2>
            <ol className="drive-steps">
              {drive.process.map((p, i) => (
                <li key={p.step}>
                  <span className="drive-steps__node" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="drive-steps__body">
                    <strong>{p.step}</strong>
                    <span>{p.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="event-panel">
            <h2>Drive schedule</h2>
            <ol className="event-agenda">
              {drive.schedule.map((slot) => (
                <li key={`${slot.time}-${slot.item}`}>
                  <span className="event-agenda__time">{slot.time}</span>
                  <span className="event-agenda__item">{slot.item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="drive-2col">
            <div className="event-panel">
              <h2>Eligibility</h2>
              <ul className="event-highlights event-highlights--single">
                {drive.eligibility.map((e) => (
                  <li key={e}>
                    <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="event-panel">
              <h2>Documents to bring</h2>
              <ul className="event-highlights event-highlights--single">
                {drive.documents.map((d) => (
                  <li key={d}>
                    <span className="article__bullet" aria-hidden="true"><IconDoc /></span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="event-panel">
            <h2>Benefits & perks</h2>
            <ul className="event-highlights">
              {drive.perks.map((p) => (
                <li key={p}>
                  <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="article-side">
          <div className="article-side__card event-register">
            <span className="event-register__price">Free entry</span>
            <span className="event-register__note">{drive.deadline}</span>
            <button type="button" className="btn btn--solid" onClick={onRegister}>
              Register now <IconArrowUpRight />
            </button>
          </div>

          <div className="article-side__card">
            <h3>Drive details</h3>
            <ul className="event-facts">
              <li><span className="event-facts__icon"><IconClock /></span><span><strong>{drive.day} {drive.month}</strong><span>{drive.time}</span></span></li>
              <li><span className="event-facts__icon"><IconPin /></span><span><strong>{drive.location}</strong><span>{drive.mode}</span></span></li>
              <li><span className="event-facts__icon"><IconRupee /></span><span><strong>Salary range</strong><span>{drive.salary}</span></span></li>
              <li><span className="event-facts__icon"><IconUsers /></span><span><strong>Openings</strong><span>{drive.openings}</span></span></li>
            </ul>
          </div>

          <div className="article-side__card">
            <h3>Contact person</h3>
            <div className="article-side__author-head">
              <span className="article__avatar article__avatar--lg" aria-hidden="true">{initials(drive.contact.name)}</span>
              <div>
                <h3 className="event-org__name">{drive.contact.name}</h3>
                <span className="article__author-role">{drive.contact.role}</span>
              </div>
            </div>
            <a className="drive-contact__mail" href={`mailto:${drive.contact.email}`}>
              <IconMail /> {drive.contact.email}
            </a>
          </div>

          {others.length > 0 && (
            <div className="article-side__card">
              <h3>Similar drives</h3>
              <ul className="event-mini-list">
                {others.map((o) => (
                  <li key={o.slug}>
                    <a href={`#/drives/${o.slug}`} style={{ '--ev-accent': driveAccent(o) } as CSSProperties}>
                      <span className="event-mini-list__date" aria-hidden="true">
                        <strong>{o.day}</strong>
                        <span>{o.month}</span>
                      </span>
                      <span className="event-mini-list__body">
                        <strong>{o.title}</strong>
                        <span>{o.host} · {o.location}</span>
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

export function DrivesPage({ slug, onRegister }: { slug: string | null; onRegister: () => void }) {
  const drive = slug ? driveCatalog.find((d) => d.slug === slug) : undefined
  if (drive) return <DriveDetail drive={drive} onRegister={onRegister} />
  return <DrivesList />
}
