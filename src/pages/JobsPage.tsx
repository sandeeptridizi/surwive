import { useState, type CSSProperties } from 'react'
import { SectionHead } from '../components/SectionHead'
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconGrad,
  IconPin,
  IconRupee,
  IconSpark,
  IconStar,
  IconUsers,
} from '../components/icons'
import { jobAccent, jobCatalog, type JobInfo } from '../data/jobs'

const MODES = ['All', 'Remote', 'Hybrid', 'On-site'] as const

function JobRow({ job, index }: { job: JobInfo; index: number }) {
  return (
    <a
      href={`#/jobs/${job.slug}`}
      className="drive-row job-row"
      style={{ '--ev-accent': jobAccent(job), animationDelay: `${index * 60}ms` } as CSSProperties}
    >
      <span className="job-row__logo" aria-hidden="true">{job.initial}</span>

      <div className="drive-row__body">
        <div className="drive-row__title-line">
          <h3>{job.title}</h3>
          {job.featured && <span className="job-card__badge"><IconStar /> Featured</span>}
        </div>
        <span className="drive-row__host">{job.company}</span>
        <p className="job-row__summary">{job.summary}</p>
        <div className="drive-row__meta">
          <span><IconPin /> {job.location}</span>
          <span><IconClock /> {job.detail}</span>
          <span><IconUsers /> {job.openings}</span>
        </div>
        <div className="drive-row__tags">
          <span className="job-tag job-tag--mode">{job.mode}</span>
          {job.skills.map((skill) => (
            <span className="job-tag" key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="drive-row__side">
        <span className="drive-row__salary">{job.pay}</span>
        <span className="job-row__per">{job.per}</span>
        <span className="drive-row__perk"><IconSpark /> {job.posted}</span>
        <span className="drive-row__cta">View role <IconArrowUpRight /></span>
      </div>
    </a>
  )
}

function JobsList({ initialTab }: { initialTab: 'job' | 'internship' }) {
  const [tab, setTab] = useState<'job' | 'internship'>(initialTab)
  const [mode, setMode] = useState<(typeof MODES)[number]>('All')
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const visible = jobCatalog.filter((job) => {
    if (job.type !== tab) return false
    if (mode !== 'All' && job.mode !== mode) return false
    if (!q) return true
    return [job.title, job.company, job.location, ...job.skills]
      .some((field) => field.toLowerCase().includes(q))
  })

  return (
    <section className="blog jobs-page">
      <SectionHead
        align="split"
        eyebrow="Open roles"
        title={tab === 'job' ? 'Every job, verified and ranked' : 'Internships that open doors'}
        sub="Browse the full board — every opening is verified, salary-transparent, and one click from a full description."
        action={
          <div className="jobs-toggle" role="tablist" aria-label="Role type">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'job'}
              className={tab === 'job' ? 'is-active' : ''}
              onClick={() => setTab('job')}
            >
              Jobs
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'internship'}
              className={tab === 'internship' ? 'is-active' : ''}
              onClick={() => setTab('internship')}
            >
              Internships
            </button>
          </div>
        }
      />

      <div className="jobs-listbar reveal">
        <div className="blog__filters jobs-listbar__filters" role="tablist" aria-label="Filter by work mode">
          {MODES.map((m) => (
            <button
              type="button"
              role="tab"
              aria-selected={mode === m}
              key={m}
              className={`blog-pill ${mode === m ? 'is-active' : ''}`}
              style={{ '--blog-accent': 'var(--accent)' } as CSSProperties}
              onClick={() => setMode(m)}
            >
              {m === 'All' ? <IconSpark /> : <IconPin />} {m}
              <span className="blog-pill__count">
                {jobCatalog.filter((j) => j.type === tab && (m === 'All' || j.mode === m)).length}
              </span>
            </button>
          ))}
        </div>

        <label className="jobs-search">
          <IconSpark />
          <input
            type="search"
            value={query}
            placeholder={`Search ${tab === 'job' ? 'jobs' : 'internships'}, skills, cities…`}
            aria-label="Search roles"
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <div className="drive-rows" key={`${tab}-${mode}-${q}`}>
        {visible.map((job, i) => (
          <JobRow job={job} index={i} key={job.slug} />
        ))}
        {visible.length === 0 && (
          <div className="jobs-empty">
            <span className="jobs-empty__icon"><IconSpark /></span>
            <strong>No roles match that search</strong>
            <p>Try a different keyword, or clear the filters to see every open {tab === 'job' ? 'job' : 'internship'}.</p>
            <button type="button" className="btn btn--outline btn--sm" onClick={() => { setQuery(''); setMode('All') }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function JobDetail({ job, onApply }: { job: JobInfo; onApply: () => void }) {
  const similar = jobCatalog.filter((j) => j.type === job.type && j.slug !== job.slug).slice(0, 3)

  return (
    <section
      className="blog drives-page drives-page--detail"
      style={{ '--ev-accent': jobAccent(job) } as CSSProperties}
      key={job.slug}
    >
      <a href="#/jobs" className="article__back">← All open roles</a>

      <header className="drive-hero">
        <div className="drive-hero__top">
          <div className="job-hero__id">
            <span className="job-hero__logo" aria-hidden="true">{job.initial}</span>
            <div className="event-hero__chips">
              <span className="event-chip event-chip--type">{job.type === 'job' ? 'Full-time role' : 'Internship'}</span>
              <span className="event-chip">{job.mode}</span>
              <span className="event-chip">{job.detail}</span>
              {job.featured && <span className="event-chip">★ Featured</span>}
            </div>
          </div>
          <h1>{job.title}</h1>
          <p className="event-hero__org">
            at <strong>{job.company}</strong> · {job.location}
          </p>
        </div>
        <div className="drive-hero__facts">
          <div className="drive-fact">
            <span className="drive-fact__label">{job.type === 'job' ? 'Salary' : 'Stipend'}</span>
            <strong>{job.pay} <small className="job-fact__sub">{job.per}</small></strong>
          </div>
          <div className="drive-fact">
            <span className="drive-fact__label">Experience</span>
            <strong>{job.detail}</strong>
          </div>
          <div className="drive-fact">
            <span className="drive-fact__label">Work mode</span>
            <strong>{job.location} · {job.mode}</strong>
          </div>
          <div className="drive-fact">
            <span className="drive-fact__label">Openings</span>
            <strong>{job.openings}</strong>
          </div>
          <div className="drive-fact">
            <span className="drive-fact__label">Posted</span>
            <strong>{job.posted}</strong>
          </div>
        </div>
      </header>

      <div className="article-layout">
        <div className="event-main">
          <div className="event-panel">
            <h2>About {job.company}</h2>
            {job.aboutCompany.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="event-panel">
            <h2>About the role</h2>
            {job.aboutRole.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="event-panel">
            <h2>What you'll do</h2>
            <ul className="event-highlights event-highlights--single">
              {job.responsibilities.map((item) => (
                <li key={item}>
                  <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="drive-2col">
            <div className="event-panel">
              <h2>What you'll need</h2>
              <ul className="event-highlights event-highlights--single">
                {job.requirements.map((item) => (
                  <li key={item}>
                    <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="event-panel">
              <h2>Nice to have</h2>
              <ul className="event-highlights event-highlights--single">
                {job.niceToHave.map((item) => (
                  <li key={item}>
                    <span className="article__bullet" aria-hidden="true"><IconSpark /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="event-panel">
            <h2>Benefits & perks</h2>
            <ul className="event-highlights">
              {job.benefits.map((item) => (
                <li key={item}>
                  <span className="article__bullet" aria-hidden="true"><IconCheck /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="article-side">
          <div className="article-side__card event-register">
            <span className="event-register__price">{job.pay}</span>
            <span className="event-register__note">{job.per} · {job.applicants}</span>
            <button type="button" className="btn btn--solid" onClick={onApply}>
              Apply now <IconArrowUpRight />
            </button>
          </div>

          <div className="article-side__card">
            <h3>Role details</h3>
            <ul className="event-facts">
              <li><span className="event-facts__icon"><IconRupee /></span><span><strong>{job.pay}</strong><span>{job.per}</span></span></li>
              <li><span className="event-facts__icon"><IconPin /></span><span><strong>{job.location}</strong><span>{job.mode}</span></span></li>
              <li><span className="event-facts__icon"><IconGrad /></span><span><strong>Experience</strong><span>{job.detail}</span></span></li>
              <li><span className="event-facts__icon"><IconUsers /></span><span><strong>{job.openings}</strong><span>{job.applicants}</span></span></li>
              <li><span className="event-facts__icon"><IconClock /></span><span><strong>Posted</strong><span>{job.posted}</span></span></li>
            </ul>
          </div>

          <div className="article-side__card">
            <h3>Skills</h3>
            <div className="drive-row__tags">
              <span className="job-tag job-tag--mode">{job.mode}</span>
              {job.skills.map((skill) => (
                <span className="job-tag" key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          {similar.length > 0 && (
            <div className="article-side__card">
              <h3>Similar roles</h3>
              <ul className="event-mini-list">
                {similar.map((o) => (
                  <li key={o.slug}>
                    <a href={`#/jobs/${o.slug}`} style={{ '--ev-accent': jobAccent(o) } as CSSProperties}>
                      <span className="event-mini-list__date" aria-hidden="true">
                        <strong>{o.initial}</strong>
                      </span>
                      <span className="event-mini-list__body">
                        <strong>{o.title}</strong>
                        <span>{o.company} · {o.location}</span>
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

export function JobsPage({ hash, onApply }: { hash: string; onApply: () => void }) {
  const slug = hash.startsWith('#/jobs/') ? decodeURIComponent(hash.slice('#/jobs/'.length)) : null
  const job = slug ? jobCatalog.find((j) => j.slug === slug) : undefined
  if (job) return <JobDetail job={job} onApply={onApply} />
  const initialTab = hash.includes('tab=internships') ? 'internship' : 'job'
  return <JobsList initialTab={initialTab} />
}
