import { useState, type CSSProperties, type ReactNode } from 'react'
import { SectionHead } from '../components/SectionHead'
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconClose,
  IconPin,
  IconRupee,
  IconSpark,
  IconStar,
  IconUsers,
} from '../components/icons'
import { jobAccent, parsePayRange, type JobInfo } from '../data/jobs'
import { LocationLink } from '../components/LocationLink'
import { CompanyLogo } from '../components/CompanyLogo'
import { Link } from '../components/Link'
import { useJobs } from '../hooks/useJobs'
import { useStickySide } from '../hooks/useStickySide'

const MODES = ['All', 'Remote', 'Hybrid', 'On-site'] as const

const SALARY_BOUNDS = {
  job: { min: 0, max: 6_000_000, step: 100_000 },
  internship: { min: 0, max: 60_000, step: 5_000 },
} as const

function formatINR(value: number): string {
  if (value >= 100_000) {
    const lakhs = value / 100_000
    return `₹${Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(1)}L`
  }
  if (value >= 1_000) return `₹${Math.round(value / 1_000)}k`
  return `₹${value}`
}

function matchesSalaryRange(job: JobInfo, min: number, max: number) {
  const range = parsePayRange(job.pay)
  if (!range) return false
  return range.max >= min && range.min <= max
}

function JobRow({ job, index }: { job: JobInfo; index: number }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="drive-row job-row"
      style={{ '--ev-accent': jobAccent(job), animationDelay: `${index * 60}ms` } as CSSProperties}
    >
      <CompanyLogo logo={job.companyLogo} name={job.company} initial={job.initial} className="job-row__logo" />

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
    </Link>
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
  const [location, setLocation] = useState('All')
  const [salaryMin, setSalaryMin] = useState<number>(SALARY_BOUNDS[initialTab].min)
  const [salaryMax, setSalaryMax] = useState<number>(SALARY_BOUNDS[initialTab].max)
  const [query, setQuery] = useState('')

  const bounds = SALARY_BOUNDS[tab]
  const salaryActive = salaryMin > bounds.min || salaryMax < bounds.max

  function switchTab(next: 'job' | 'internship') {
    setTab(next)
    setLocation('All')
    setSalaryMin(SALARY_BOUNDS[next].min)
    setSalaryMax(SALARY_BOUNDS[next].max)
  }

  function resetSalary() {
    setSalaryMin(bounds.min)
    setSalaryMax(bounds.max)
  }

  function clearFilters() {
    setQuery('')
    setMode('All')
    setLocation('All')
    resetSalary()
  }

  const byTab = catalog.filter((j) => j.type === tab)
  const byMode = byTab.filter((j) => mode === 'All' || j.mode === mode)
  const byLocation = byMode.filter((j) => location === 'All' || j.location === location)
  const locations = Array.from(new Set(byMode.map((j) => j.location))).sort()

  const q = query.trim().toLowerCase()
  const visible = byLocation.filter((job) => {
    if (salaryActive && !matchesSalaryRange(job, salaryMin, salaryMax)) return false
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
              onClick={() => switchTab('job')}
            >
              Jobs
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'internship'}
              className={tab === 'internship' ? 'is-active' : ''}
              onClick={() => switchTab('internship')}
            >
              Internships
            </button>
          </div>
        }
      />

      <div className="jobs-listbar reveal">
        <div className="jobs-toolbar">
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
                  {byTab.filter((j) => m === 'All' || j.mode === m).length}
                </span>
              </button>
            ))}
          </div>

          <label className="jobs-select">
            <IconPin />
            <select
              value={location}
              aria-label="Filter by location"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="All">All locations ({byMode.length})</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc} ({byMode.filter((j) => j.location === loc).length})
                </option>
              ))}
            </select>
          </label>

          <div className="salary-range" style={{
            '--min-pct': `${((salaryMin - bounds.min) / (bounds.max - bounds.min)) * 100}%`,
            '--max-pct': `${((salaryMax - bounds.min) / (bounds.max - bounds.min)) * 100}%`,
          } as CSSProperties}
          >
            <span className="salary-range__label">
              <IconRupee />
              {salaryActive
                ? `${formatINR(salaryMin)} – ${salaryMax >= bounds.max ? `${formatINR(bounds.max)}+` : formatINR(salaryMax)}`
                : tab === 'job' ? 'Any package' : 'Any stipend'}
            </span>
            <div className="salary-range__track-wrap">
              <div className="salary-range__track" />
              <input
                type="range"
                className="salary-range__input"
                min={bounds.min}
                max={bounds.max}
                step={bounds.step}
                value={salaryMin}
                aria-label={`Minimum ${tab === 'job' ? 'salary' : 'stipend'}`}
                onChange={(e) => setSalaryMin(Math.min(Number(e.target.value), salaryMax))}
              />
              <input
                type="range"
                className="salary-range__input"
                min={bounds.min}
                max={bounds.max}
                step={bounds.step}
                value={salaryMax}
                aria-label={`Maximum ${tab === 'job' ? 'salary' : 'stipend'}`}
                onChange={(e) => setSalaryMax(Math.max(Number(e.target.value), salaryMin))}
              />
            </div>
            {salaryActive && (
              <button type="button" className="salary-range__reset" aria-label="Reset salary filter" onClick={resetSalary}>
                <IconClose />
              </button>
            )}
          </div>
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

      <div className="drive-rows" key={`${tab}-${mode}-${location}-${salaryMin}-${salaryMax}-${q}`}>
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
            <button type="button" className="btn btn--outline btn--sm" onClick={clearFilters}>
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
      <Link href="/jobs" className="article__back">← All open roles</Link>

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

export function JobsPage({ path, onApply }: { path: string; onApply: () => void }) {
  const { jobs: catalog, loading } = useJobs()
  const slug = path.startsWith('/jobs/') ? decodeURIComponent(path.slice('/jobs/'.length).split('?')[0]) : null
  const job = slug ? catalog.find((j) => j.slug === slug) : undefined
  if (job) return <JobDetail job={job} catalog={catalog} onApply={onApply} />
  const initialTab = path.includes('tab=internships') ? 'internship' : 'job'
  return <JobsList key={initialTab} initialTab={initialTab} catalog={catalog} loading={loading} />
}
