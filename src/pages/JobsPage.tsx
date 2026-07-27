import { useState, type CSSProperties, type ReactNode } from 'react'
import { SectionHead } from '../components/SectionHead'
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconPin,
  IconSpark,
  IconStar,
  IconUsers,
} from '../components/icons'
import { jobAccent, type JobInfo } from '../data/jobs'
import { LocationLink } from '../components/LocationLink'
import { useJobs } from '../hooks/useJobs'
import { useStickySide } from '../hooks/useStickySide'

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
          {job.detail && <span><IconClock /> {job.detail}</span>}
          {job.openings && <span><IconUsers /> {job.openings}</span>}
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

function JobsList({
  initialTab,
  catalog,
  loading,
}: {
  initialTab: 'job' | 'internship'
  catalog: JobInfo[]
  loading: boolean
}) {
  const [tab, setTab] = useState<'job' | 'internship'>(initialTab)
  const [mode, setMode] = useState<(typeof MODES)[number]>('All')
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const visible = catalog.filter((job) => {
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
                {catalog.filter((j) => j.type === tab && (m === 'All' || j.mode === m)).length}
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
        {visible.length === 0 && loading && (
          <div className="jobs-empty">
            <span className="jobs-empty__icon"><IconSpark /></span>
            <strong>Loading open roles…</strong>
            <p>Fetching the latest verified openings from Surwive.</p>
          </div>
        )}
        {visible.length === 0 && !loading && (
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

function JobDetail({ job, catalog, onApply }: { job: JobInfo; catalog: JobInfo[]; onApply: () => void }) {
  const similar = catalog.filter((j) => j.type === job.type && j.slug !== job.slug).slice(0, 3)
  const sideRef = useStickySide<HTMLElement>()

  // Backend postings carry roleType/department/duration; the bundled sample
  // data instead keeps an experience level in `detail`.
  const typeLabel = job.roleType ?? (job.type === 'job' ? 'Full-time' : 'Internship')
  const experience = !job.roleType && job.detail ? job.detail : ''
  const facts: Array<{ label: string; value: ReactNode; sub?: string }> = [
    { label: job.type === 'job' ? 'Salary' : 'Stipend', value: job.pay, ...(job.per ? { sub: job.per } : {}) },
    ...(experience ? [{ label: 'Experience', value: experience }] : []),
    ...(job.department ? [{ label: 'Department', value: job.department }] : []),
    ...(job.duration ? [{ label: 'Duration', value: job.duration }] : []),
    { label: 'Location', value: <LocationLink location={job.location} /> },
    ...(job.openings ? [{ label: 'Openings', value: job.openings }] : []),
    { label: 'Posted', value: job.posted, sub: job.applicants },
  ]

  return (
    <section
      className="blog drives-page drives-page--detail"
      style={{ '--ev-accent': jobAccent(job) } as CSSProperties}
      key={job.slug}
    >
      <a href="#/jobs" className="article__back">← All open roles</a>

      <header className="drive-hero job-hero">
        <div className="drive-hero__top job-hero__top">
          <div className="event-hero__chips">
            <span className="event-chip event-chip--type">{job.type === 'job' ? `${typeLabel} role` : 'Internship'}</span>
            <span className="event-chip">{job.mode}</span>
            {job.featured && <span className="event-chip">★ Featured</span>}
          </div>
          <h1>{job.title}</h1>
          <p className="event-hero__org">
            at <strong>{job.company}</strong>
            <span className="job-hero__verified"><IconCheck /> Verified opening</span>
          </p>
          <button type="button" className="btn btn--solid job-hero__apply" onClick={onApply}>
            Apply now <IconArrowUpRight />
          </button>
        </div>
        <div className="drive-hero__facts">
          {facts.map((fact) => (
            <div className="drive-fact" key={fact.label}>
              <span className="drive-fact__label">{fact.label}</span>
              <strong>
                {fact.value}
                {fact.sub && <> <small className="job-fact__sub">{fact.sub}</small></>}
              </strong>
            </div>
          ))}
        </div>
      </header>

      <div className={job.skills.length > 0 ? 'article-layout' : 'article-layout article-layout--full'}>
        <div className="event-main">
          {job.aboutCompany.length > 0 && (
            <div className="event-panel">
              <h2>About {job.company}</h2>
              {job.aboutCompany.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          )}

          {job.aboutRole.length > 0 && (
            <div className="event-panel">
              <h2>About the role</h2>
              {job.aboutRole.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          )}

          {job.responsibilities.length > 0 && (
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
          )}

          {(job.requirements.length > 0 || job.niceToHave.length > 0) && (
            // Two columns only when both lists exist — a lone panel spans full width
            <div className={job.requirements.length > 0 && job.niceToHave.length > 0 ? 'drive-2col' : undefined}>
              {job.requirements.length > 0 && (
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
              )}
              {job.niceToHave.length > 0 && (
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
              )}
            </div>
          )}

          {job.benefits.length > 0 && (
            <div className="event-panel">
              <h2>Benefits & perks</h2>
              <ul className="job-perks">
                {job.benefits.map((item) => (
                  <li key={item}>
                    <IconSpark aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {job.skills.length > 0 && (
          <aside className="article-side" ref={sideRef}>
            <div className="article-side__card">
              <h3>Skills</h3>
              <div className="drive-row__tags">
                {job.skills.map((skill) => (
                  <span className="job-tag" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {similar.length > 0 && (
        <div className="job-similar">
          <h2>Similar roles</h2>
          <div className="drive-rows">
            {similar.map((o, i) => (
              <JobRow job={o} index={i} key={o.slug} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export function JobsPage({ hash, onApply }: { hash: string; onApply: () => void }) {
  const { jobs: catalog, loading } = useJobs()
  const slug = hash.startsWith('#/jobs/') ? decodeURIComponent(hash.slice('#/jobs/'.length)) : null
  const job = slug ? catalog.find((j) => j.slug === slug) : undefined
  if (job) return <JobDetail job={job} catalog={catalog} onApply={onApply} />
  const initialTab = hash.includes('tab=internships') ? 'internship' : 'job'
  return <JobsList key={initialTab} initialTab={initialTab} catalog={catalog} loading={loading} />
}
