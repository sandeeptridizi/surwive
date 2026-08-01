import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { SectionHead } from '../components/SectionHead'
import {
  IconArrowUpRight,
  IconCheck,
  IconClock,
  IconClose,
  IconFilter,
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
const ROLES_PER_PAGE = 12

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

function JobCard({ job, index }: { job: JobInfo; index: number }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="job-tile"
      style={{ '--ev-accent': jobAccent(job), animationDelay: `${index * 50}ms` } as CSSProperties}
    >
      <div className="job-tile__head">
        <CompanyLogo logo={job.companyLogo} name={job.company} initial={job.initial} className="job-tile__logo" />
        <div className="job-tile__co">
          <strong>{job.company}</strong>
        </div>
        {job.featured && <span className="job-card__badge"><IconStar /> Featured</span>}
      </div>

      <h3 className="job-tile__title">{job.title}</h3>
      {job.summary && <p className="job-tile__summary">{job.summary}</p>}

      <div className="job-tile__meta">
        {job.detail && <span><IconClock /> {job.detail}</span>}
        {job.openings && <span><IconUsers /> {job.openings}</span>}
      </div>

      <div className="job-card__tags">
        <span className="job-tag job-tag--mode">{job.mode}</span>
        <span className="job-tile__location"><IconPin /> {job.location}</span>
      </div>

      <div className="job-tile__foot">
        <span className="job-tile__salary">{job.pay}<small>{job.per}</small></span>
        <span className="job-tile__cta">View role <IconArrowUpRight /></span>
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
  const type = initialTab
  const bounds = SALARY_BOUNDS[type]

  const [showFilters, setShowFilters] = useState(false)
  const [mode, setMode] = useState<(typeof MODES)[number]>('All')
  const [location, setLocation] = useState('All')
  const [salaryMin, setSalaryMin] = useState<number>(bounds.min)
  const [salaryMax, setSalaryMax] = useState<number>(bounds.max)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [floating, setFloating] = useState(false)
  const [dockSearchOpen, setDockSearchOpen] = useState(false)
  const listbarRef = useRef<HTMLDivElement>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  // Once the real search/filter bar scrolls out of view, show the compact
  // floating dock on the left so search stays reachable without a full-width sticky bar.
  useEffect(() => {
    const el = listbarRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setFloating(!entry.isIntersecting), {
      rootMargin: `-${140}px 0px 0px 0px`,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Close the dock's search/filter flyouts on outside click or Escape.
  useEffect(() => {
    if (!floating || (!dockSearchOpen && !showFilters)) return
    const closeOnOutsideClick = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setDockSearchOpen(false)
        setShowFilters(false)
      }
    }
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDockSearchOpen(false)
        setShowFilters(false)
      }
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [dockSearchOpen, showFilters, floating])

  const salaryActive = salaryMin > bounds.min || salaryMax < bounds.max
  const activeFilterCount = (mode !== 'All' ? 1 : 0) + (location !== 'All' ? 1 : 0) + (salaryActive ? 1 : 0)

  function toggleFilters() {
    setShowFilters((v) => !v)
  }

  function toggleDockFilters() {
    setDockSearchOpen(false)
    setShowFilters((v) => !v)
  }

  function toggleDockSearch() {
    setShowFilters(false)
    setDockSearchOpen((v) => !v)
  }

  function resetSalary() {
    setSalaryMin(bounds.min)
    setSalaryMax(bounds.max)
    setPage(1)
  }

  function clearFilters() {
    setQuery('')
    setMode('All')
    setLocation('All')
    resetSalary()
  }

  const byType = catalog.filter((j) => j.type === type)
  const byMode = byType.filter((j) => mode === 'All' || j.mode === mode)
  const byLocation = byMode.filter((j) => location === 'All' || j.location === location)
  const locations = Array.from(new Set(byMode.map((j) => j.location))).sort()

  const q = query.trim().toLowerCase()
  const visible = byLocation.filter((job) => {
    if (salaryActive && !matchesSalaryRange(job, salaryMin, salaryMax)) return false
    if (!q) return true
    return [job.title, job.company, job.location, ...job.skills]
      .some((field) => field.toLowerCase().includes(q))
  })

  const totalPages = Math.max(1, Math.ceil(visible.length / ROLES_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paged = visible.slice((safePage - 1) * ROLES_PER_PAGE, safePage * ROLES_PER_PAGE)

  function gotoPage(p: number) {
    setPage(Math.min(Math.max(1, p), totalPages))
    window.scrollTo({ top: 0 })
  }

  const filterFields = (
    <>
      <div className="jobs-filter-panel__row">
        <div className="jobs-filter-panel__group">
          <span className="jobs-filter-panel__label">Work mode</span>
          <div className="blog__filters jobs-filter-panel__modes" role="tablist" aria-label="Filter by work mode">
            {MODES.map((m) => (
              <button
                type="button"
                role="tab"
                aria-selected={mode === m}
                key={m}
                className={`blog-pill ${mode === m ? 'is-active' : ''}`}
                style={{ '--blog-accent': 'var(--accent)' } as CSSProperties}
                onClick={() => { setMode(m); setPage(1) }}
              >
                {m === 'All' ? <IconSpark /> : <IconPin />} {m}
              </button>
            ))}
          </div>
        </div>

        <div className="jobs-filter-panel__group">
          <span className="jobs-filter-panel__label">Location</span>
          <label className="jobs-select">
            <IconPin />
            <select
              value={location}
              aria-label="Filter by location"
              onChange={(e) => { setLocation(e.target.value); setPage(1) }}
            >
              <option value="All">All locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="jobs-filter-panel__group jobs-filter-panel__group--salary">
          <span className="jobs-filter-panel__label">{type === 'job' ? 'Salary range' : 'Stipend range'}</span>
          <div className="salary-inputs">
            <label className="salary-inputs__field">
              <IconRupee />
              <span>Min</span>
              <input
                type="number"
                inputMode="numeric"
                min={bounds.min}
                max={bounds.max}
                step={bounds.step}
                value={salaryMin === bounds.min ? '' : salaryMin}
                placeholder="0"
                aria-label={`Minimum ${type === 'job' ? 'salary' : 'stipend'}`}
                onChange={(e) => {
                  const raw = e.target.value === '' ? bounds.min : Number(e.target.value)
                  setSalaryMin(Math.min(Math.max(raw, bounds.min), salaryMax))
                  setPage(1)
                }}
              />
            </label>
            <span className="salary-inputs__sep">to</span>
            <label className="salary-inputs__field">
              <IconRupee />
              <span>Max</span>
              <input
                type="number"
                inputMode="numeric"
                min={bounds.min}
                max={bounds.max}
                step={bounds.step}
                value={salaryMax === bounds.max ? '' : salaryMax}
                placeholder={formatINR(bounds.max)}
                aria-label={`Maximum ${type === 'job' ? 'salary' : 'stipend'}`}
                onChange={(e) => {
                  const raw = e.target.value === '' ? bounds.max : Number(e.target.value)
                  setSalaryMax(Math.max(Math.min(raw, bounds.max), salaryMin))
                  setPage(1)
                }}
              />
            </label>
            {salaryActive && (
              <button type="button" className="salary-inputs__reset" aria-label="Reset salary filter" onClick={resetSalary}>
                <IconClose />
              </button>
            )}
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button type="button" className="btn btn--outline btn--sm jobs-filter-panel__clear" onClick={clearFilters}>
          Clear filters
        </button>
      )}
    </>
  )

  return (
    <section className="blog jobs-page">
      <SectionHead
        align="split"
        eyebrow="Open roles"
        title={type === 'job' ? 'Every job, verified and ranked' : 'Internships that open doors'}
        sub="Browse the full board — every opening is verified, salary-transparent, and one click from a full description."
      />

      <div className="jobs-listbar reveal" ref={listbarRef}>
        <label className="jobs-search">
          <IconSpark />
          <input
            type="search"
            value={query}
            placeholder={`Search ${type === 'job' ? 'jobs' : 'internships'}, skills, cities…`}
            aria-label="Search roles"
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
          />
        </label>

        <button
          type="button"
          className={`jobs-filter-toggle ${showFilters ? 'is-active' : ''}`}
          aria-expanded={showFilters}
          onClick={toggleFilters}
        >
          <IconFilter /> Filters
          {activeFilterCount > 0 && <span className="jobs-filter-toggle__count">{activeFilterCount}</span>}
        </button>
      </div>

      {showFilters && !floating && (
        <div className="jobs-filter-panel">{filterFields}</div>
      )}

      <div className={`jobs-float ${floating ? 'is-visible' : ''}`} aria-hidden={!floating} ref={dockRef}>
        <div className="jobs-float__bar">
          <button
            type="button"
            className={`jobs-float__icon ${dockSearchOpen ? 'is-active' : ''}`}
            aria-label="Search roles"
            aria-expanded={dockSearchOpen}
            tabIndex={floating ? 0 : -1}
            onClick={toggleDockSearch}
          >
            <IconSpark />
          </button>
          <span className="jobs-float__divider" aria-hidden="true" />
          <button
            type="button"
            className={`jobs-float__icon ${showFilters ? 'is-active' : ''}`}
            aria-label="Filters"
            aria-expanded={showFilters}
            tabIndex={floating ? 0 : -1}
            onClick={toggleDockFilters}
          >
            <IconFilter />
            {activeFilterCount > 0 && <span className="jobs-float__count">{activeFilterCount}</span>}
          </button>
        </div>

        {floating && dockSearchOpen && (
          <label className="jobs-float__flyout jobs-float__flyout--search">
            <IconSpark />
            <input
              type="search"
              value={query}
              placeholder={`Search ${type === 'job' ? 'jobs' : 'internships'}…`}
              aria-label="Search roles"
              autoFocus
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            />
          </label>
        )}

        {floating && showFilters && (
          <div className="jobs-float__flyout jobs-float__flyout--filters">{filterFields}</div>
        )}
      </div>

      <div className="jobs-card-grid" key={`${type}-${mode}-${location}-${salaryMin}-${salaryMax}-${q}-${safePage}`}>
        {paged.map((job, i) => (
          <JobCard job={job} index={i} key={job.slug} />
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
            <p>Try a different keyword, or clear the filters to see every open {type === 'job' ? 'job' : 'internship'}.</p>
            <button type="button" className="btn btn--outline btn--sm" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="blog__pagination" aria-label={`${type === 'job' ? 'Job' : 'Internship'} pages`}>
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
          <div className="job-hero__intro">
            <div className="job-hero__title-row">
              <CompanyLogo logo={job.companyLogo} name={job.company} initial={job.initial} className="job-hero__logo" />
              <h1>{job.title}</h1>
            </div>
            <div className="job-hero__meta">
              <p className="event-hero__org">
                at <strong>{job.company}</strong>
                <span className="job-hero__verified"><IconCheck /> Verified opening</span>
              </p>
              <div className="event-hero__chips job-hero__chips">
                <span className="event-chip event-chip--type">{job.type === 'job' ? `${typeLabel} role` : 'Internship'}</span>
                <span className="event-chip">{job.mode}</span>
                {job.featured && <span className="event-chip">★ Featured</span>}
              </div>
            </div>
          </div>
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
              <div className="job-skills">
                {job.skills.map((skill) => (
                  <span className="job-skills__item" key={skill}>
                    <IconCheck aria-hidden="true" />
                    {skill}
                  </span>
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
