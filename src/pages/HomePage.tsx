import { useEffect, useState } from 'react'
import appPic from '../assets/apppic.png'
import { DriveCard } from '../components/DriveCard'
import { NewsletterForm } from '../components/NewsletterForm'
import { SectionHead } from '../components/SectionHead'
import {
  IconApple,
  IconArrowUpRight,
  IconCheck,
  IconGear,
  IconPin,
  IconPlayStore,
  IconSend,
  IconShieldCheck,
  IconSpark,
  IconStar,
  IconTrophy,
} from '../components/icons'
import { eventCatalog } from '../data/events'
import {
  CHAT_SCENARIOS,
  clarityCards,
  journeySteps,
  matchSignals,
  recruiterStats,
  skillGraph,
  statBand,
  testimonials,
  trustedLogos,
  verificationChecks,
  whyFeatures,
} from '../data/home'
import { featuredInternships, featuredJobs, trendingChips } from '../data/jobs'
import { driveCatalog } from '../data/drives'
import { initials } from '../lib/utils'

function CopilotChatCard({ onApply }: { onApply: () => void }) {
  const [scene, setScene] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setLeaving(true), 5600)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!leaving) return
    const id = window.setTimeout(() => {
      setScene((s) => (s + 1) % CHAT_SCENARIOS.length)
      setLeaving(false)
    }, 450)
    return () => window.clearTimeout(id)
  }, [leaving])

  const s = CHAT_SCENARIOS[scene]

  return (
    <div className="chatcard" aria-hidden="true">
      <div className="chatcard__head">
        <span className="chatcard__bot"><IconSpark /></span>
        <div className="chatcard__id">
          <strong>Surwive Copilot</strong>
          <span><i className="chatcard__dot" /> <span className="chatcard__status-text">Online — reading 25,000+ live roles</span></span>
        </div>
        <span className="chatcard__live">Live</span>
      </div>

      <div className={`chatcard__body ${leaving ? 'chatcard__body--leaving' : ''}`} key={scene}>
        <div className="chatmsg chatmsg--user">
          {s.user}
        </div>
        <div className="chatmsg chatmsg--ai">
          Scanned every open role. <strong>{s.fits}</strong> — here's your top match:
        </div>

        <div className="chatmatch">
          <div className="chatmatch__head">
            <span className="chatmatch__logo">{s.match.logo}</span>
            <div>
              <strong>{s.match.title}</strong>
              <span>{s.match.meta}</span>
            </div>
            <span className="chatmatch__score">{s.match.score}</span>
          </div>
          <ul className="chatmatch__reasons">
            {s.match.reasons.map((reason) => (
              <li key={reason}><IconCheck /> {reason}</li>
            ))}
          </ul>
          <div className="chatmatch__actions">
            <button type="button" className="btn btn--solid btn--sm" onClick={onApply} tabIndex={-1}>Apply now</button>
            <button type="button" className="btn btn--outline btn--sm" tabIndex={-1}>Save for later</button>
          </div>
        </div>

        <div className="chatcard__typing">
          <span /><span /><span />
          {s.typing}
        </div>
      </div>

      <div className="chatcard__input">
        <span className="chatcard__input-icon"><IconSpark /></span>
        <span className="chatcard__placeholder">Ask anything — "compare my top three"</span>
        <span className="chatcard__send"><IconSend /></span>
      </div>
    </div>
  )
}

function FeaturedRoles({ onApply }: { onApply: () => void }) {
  const [tab, setTab] = useState<'jobs' | 'internships'>('jobs')
  const roles = tab === 'jobs' ? featuredJobs : featuredInternships

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash
      if (hash !== '#internships' && hash !== '#jobs') return
      setTab(hash === '#internships' ? 'internships' : 'jobs')
      document.getElementById('jobs')?.scrollIntoView()
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  return (
    <section className="jobs-section" id="jobs">
      <SectionHead
        align="split"
        eyebrow="Featured roles"
        title={tab === 'jobs' ? 'Jobs chosen for you, not the crowd' : 'Internships that kick-start careers'}
        sub="Skip the endless scroll. Every opening is verified, matched to your skills, and ranked so the best fit always lands on top."
        action={
          <div className="jobs-head-controls">
            <div className="jobs-toggle" role="tablist" aria-label="Role type">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'jobs'}
                className={tab === 'jobs' ? 'is-active' : ''}
                onClick={() => setTab('jobs')}
              >
                Jobs
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'internships'}
                className={tab === 'internships' ? 'is-active' : ''}
                onClick={() => setTab('internships')}
              >
                Internships
              </button>
            </div>
            <a className="link-arrow" href={tab === 'jobs' ? '#/jobs' : '#/jobs?tab=internships'}>
              View all {tab} <IconArrowUpRight />
            </a>
          </div>
        }
      />
      <div className="jobs-grid">
        {roles.map((job, i) => (
          <article
            className="job-card job-card--link"
            key={`${tab}-${job.title}`}
            style={{ animationDelay: `${i * 70}ms` }}
            onClick={() => { window.location.hash = `#/jobs/${job.slug}` }}
          >
            <div className="job-card__head">
              <span className="job-card__logo">{job.initial}</span>
              <div className="job-card__co">
                <strong>{job.company}</strong>
                <span><IconPin /> {job.location}</span>
              </div>
              {job.featured && (
                <span className="job-card__badge"><IconStar /> Featured</span>
              )}
            </div>
            <h3 className="job-card__title">
              <a href={`#/jobs/${job.slug}`} onClick={(e) => e.stopPropagation()}>{job.title}</a>
            </h3>
            <div className="job-card__tags">
              <span className="job-tag job-tag--mode">{job.mode}</span>
              <span className="job-tag">{job.detail}</span>
              {job.skills.map((skill) => (
                <span className="job-tag" key={skill}>{skill}</span>
              ))}
            </div>
            <div className="job-card__foot">
              <span className="job-card__salary">{job.pay}<small>{job.per}</small></span>
              <button type="button" className="btn btn--solid btn--sm job-card__apply" onClick={(e) => { e.stopPropagation(); onApply() }}>
                Apply <IconArrowUpRight />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function WalkInDrives({ onApply }: { onApply: () => void }) {
  return (
    <section className="drives-section" id="drives">
      <SectionHead
        align="split"
        eyebrow="Happening now"
        title="Walk-in drives near you"
        sub="Walk In with Confidence. Walk Out with Opportunity. Meet verified employers, attend real interviews, and get hired faster."
        action={
          <a href="#/drives" className="link-arrow">
            View all walk-in drives <IconArrowUpRight />
          </a>
        }
      />
      <div className="drives-grid">
        {driveCatalog.map((item, i) => (
          <DriveCard item={item} index={i} onApply={onApply} key={item.title} />
        ))}
      </div>
    </section>
  )
}

function EventsAndHackathons({ onApply }: { onApply: () => void }) {
  const [tab, setTab] = useState<'events' | 'hackathons'>('events')
  const items = eventCatalog.filter((item) =>
    tab === 'hackathons' ? item.type === 'Hackathon' : item.type !== 'Hackathon'
  )

  return (
    <section className="drives-section" id="events">
      <SectionHead
        align="split"
        eyebrow="Beyond the drives"
        title="Events & hackathons"
        sub="Showcase Your Skills, Win Challenges, and Connect with Leading Companies Through Events and Hackathons."
        action={
          <a href="#/events" className="link-arrow">
            View all events & hackathons <IconArrowUpRight />
          </a>
        }
      />

      <div className="drives-toggle-wrap reveal">
        <div
          className={`drives-toggle ${tab === 'hackathons' ? 'drives-toggle--second' : ''}`}
          role="tablist"
          aria-label="Events and hackathons"
        >
          <span className="drives-toggle__thumb" aria-hidden="true" />
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'events'}
            className={`drives-toggle__btn ${tab === 'events' ? 'is-active' : ''}`}
            onClick={() => setTab('events')}
          >
            <IconSpark /> Events
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'hackathons'}
            className={`drives-toggle__btn ${tab === 'hackathons' ? 'is-active' : ''}`}
            onClick={() => setTab('hackathons')}
          >
            <IconTrophy /> Hackathons
          </button>
        </div>
      </div>

      <div className="drives-grid" key={tab}>
        {items.map((item, i) => (
          <DriveCard item={item} index={i} onApply={onApply} key={item.title} />
        ))}
      </div>
    </section>
  )
}

export function HomePage({
  onSignupCandidate,
  onSignupEmployer,
  onCompanyPricing,
}: {
  onSignupCandidate: () => void
  onSignupEmployer: () => void
  onCompanyPricing: () => void
}) {
  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <a href="#copilot" className="hero__badge reveal">
            <span className="hero__badge-new">New</span>
            Instant AI Job Matching Based on Your Skills
            <IconArrowUpRight />
          </a>

          <h1 className="hero__title reveal" style={{ transitionDelay: '70ms' }}>
            Stop searching.<br />
            <span className="hero__title-accent">Let AI match you.</span>
          </h1>

          <p className="hero__sub reveal" style={{ transitionDelay: '140ms' }}>
            Describe your ideal job in simple words. Surwive AI analyzes thousands of job listings, understands your skills and career goals, and delivers a personalized shortlist of the best-matched opportunities, not just another keyword search.
          </p>

          <form
            className="hero-prompt reveal"
            style={{ transitionDelay: '210ms' }}
            onSubmit={(e) => { e.preventDefault(); onSignupCandidate() }}
          >
            <span className="hero-prompt__icon"><IconSpark /></span>
            <input
              type="text"
              placeholder='Try "remote senior frontend, ₹140k+"'
              aria-label="Describe your ideal role"
            />
            <button type="submit" className="btn btn--solid hero-prompt__btn">
              Match me <IconArrowUpRight />
            </button>
          </form>

          <div className="trending-row reveal" style={{ transitionDelay: '280ms' }}>
            <span>Trending:</span>
            {trendingChips.map((chip) => (
              <a href="#jobs" key={chip}>{chip}</a>
            ))}
          </div>

          <div className="hero__proof reveal" role="list" style={{ transitionDelay: '340ms' }}>
            <span className="pill" role="listitem"><IconSpark /> 98% matching accuracy</span>
            <span className="pill" role="listitem"><IconGear /> AI-powered tools</span>
            <span className="pill" role="listitem"><IconShieldCheck /> Verified employers</span>
          </div>
        </div>

        <div className="hero__panel reveal reveal--panel" style={{ transitionDelay: '180ms' }}>
          <div className="hero__panel-glow" aria-hidden="true" />
          <CopilotChatCard onApply={onSignupCandidate} />

          <div className="hero-float hero-float--salary" aria-hidden="true">
            <span className="hero-float__icon"><IconSpark /></span>
            <div>
              <span className="hero-float__value">₹150k+</span>
              <span className="hero-float__label">senior roles this week</span>
            </div>
          </div>

          <div className="hero-float hero-float--match" aria-hidden="true">
            <span className="hero-float__avatar">A</span>
            <div>
              <span className="hero-float__value">Offer signed</span>
              <span className="hero-float__label">Aria R. <em className="hero-float__score">14 days from match</em></span>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted" id="companies">
        <span className="trusted__label reveal">Connecting Talent with Leading Companies Through AI</span>
        <div className="marquee reveal" aria-hidden="true">
          <div className="marquee__track">
            {[...trustedLogos, ...trustedLogos].map((item, i) => (
              <span className={`marquee__item ${item.invert ? 'marquee__item--invert' : ''}`} key={i}>
                <img src={item.src} alt="" loading="lazy" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <FeaturedRoles onApply={onSignupCandidate} />

      <WalkInDrives onApply={onSignupCandidate} />
      <EventsAndHackathons onApply={onSignupCandidate} />

      <section className="why-section">
        <SectionHead
          eyebrow="Why Surwive"
          title="Everything You Need to Build Your Career"
          sub="An AI-powered career platform with smart job matching, verified opportunities, internships, walk-in drives, hackathons, and career events—all in one place."
        />
        <div className="why-bento">
          {whyFeatures.map((f, i) => (
            <div className={`why-tile ${f.size ? `why-tile--${f.size}` : ''} reveal`} key={f.title} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <span className="why-tile__watermark" aria-hidden="true">{f.icon}</span>
              <span className="why-tile__icon">{f.icon}</span>
              <h3 className="why-tile__title">{f.title}</h3>
              <p className="why-tile__body">{f.body}</p>
              {f.size === 'hero' && (
                <div className="why-tile__meters" aria-hidden="true">
                  {matchSignals.map((s) => (
                    <div className="why-meter" key={s.label}>
                      <span className="why-meter__label">{s.label}</span>
                      <span className="why-meter__track"><i style={{ width: `${s.value}%` }} /></span>
                      <span className="why-meter__value">{s.value}%</span>
                    </div>
                  ))}
                </div>
              )}
              {f.size === 'wide' && (
                <div className="why-tile__salary" aria-hidden="true">
                  <div className="why-tile__salary-bar">
                    <span className="why-tile__salary-median" style={{ left: '54%' }}>₹26L median</span>
                  </div>
                  <div className="why-tile__salary-ends">
                    <span>₹12L</span>
                    <span>₹45L</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="copilot" id="copilot">
        <div className="copilot__copy reveal">
          <span className="eyebrow eyebrow--left">AI Hishi</span>
          <h2>Your job search, with a brain behind it</h2>
          <p>
            Ask Hishi in plain language. Our AI analyzes every job, matches your skills and career goals, and explains why each opportunity is the right fit for you.
          </p>
          <ul className="copilot__points">
            <li>
              <strong>Natural-language search</strong>
              <span>No boolean filters. Just say what you want the way you'd tell a friend.</span>
            </li>
            <li>
              <strong>Transparent reasoning</strong>
              <span>Every match comes with the "why" — the exact signals that earned its score.</span>
            </li>
            <li>
              <strong>Learns as you go</strong>
              <span>Save or skip jobs, and Hishi continuously learns your preferences to deliver smarter, more personalized job recommendations.</span>
            </li>
          </ul>
        </div>
        <div className="copilot__panel reveal reveal--panel" style={{ transitionDelay: '120ms' }} aria-hidden="true">
          <span className="copilot__panel-live">Live</span>
          <div className="copilot__panel-bar"><span /><span /><span /></div>
          <div className="copilot__panel-query">"Find me senior frontend roles, remote, ₹140k+"</div>
          <div className="copilot__panel-match">
            <div className="copilot__panel-match-head">
              <span className="copilot__panel-avatar">C</span>
              <div>
                <strong>Senior Frontend Engineer</strong>
                <span>Cobalt · Remote · ₹140k–₹180k</span>
              </div>
              <span className="copilot__panel-score">96% match</span>
            </div>
            <div className="copilot__signals">
              {matchSignals.map((s) => (
                <div className="copilot__signal" key={s.label}>
                  <span>{s.label}</span>
                  <span className="copilot__meter"><i style={{ width: `${s.value}%` }} /></span>
                  <b>{s.value}%</b>
                </div>
              ))}
            </div>
          </div>
          <div className="copilot__panel-foot">
            <span className="chatcard__input-icon"><IconSpark /></span>
            <span>Why did this one make the list?</span>
            <span className="chatcard__send"><IconSend /></span>
          </div>
        </div>
      </section>

      <section className="verify" id="verified-skills">
        <div className="verify__copy reveal">
          <span className="eyebrow eyebrow--left">AI Hishi skill graph</span>
          <h2>Showcase Verified Skills with Confidence</h2>
          <p>
            Every Surwive profile showcases verified skills, certifications, projects, and achievements helping employers hire with confidence and trust every candidate.
          </p>
          <ul className="checklist">
            {verificationChecks.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="verify__note">
            Your Surwive profile updates automatically as you add new projects, certifications, portfolios, and achievements keeping your skills verified and recruiter-ready.
          </p>
        </div>

        <div className="verify__panel reveal reveal--panel" style={{ transitionDelay: '120ms' }} aria-hidden="true">
          <div className="verify__panel-head">
            <span className="verify__engine"><i /> Verification engine</span>
            <span className="verify__pass">Pass 3 of 3 · complete</span>
          </div>

          <div className="verify__person">
            <span className="verify__avatar">AI</span>
            <div className="verify__who">
              <strong>Ananya Iyer <em>Verified</em></strong>
              <span>Frontend Engineer · Bengaluru</span>
            </div>
          </div>

          <div className="verify__score">
            <span className="verify__ring"><b>91</b><small>/100</small></span>
            <div className="verify__score-copy">
              <span className="verify__score-label">Verification score</span>
              <span className="verify__score-note">Top 4% of verified frontend engineers on Surwive</span>
            </div>
          </div>

          <div className="verify__skills">
            {skillGraph.map((s, i) => (
              <div className="verify__skill" key={s.label}>
                <div className="verify__skill-row">
                  <strong>{s.label}</strong>
                  <span className={`verify__status ${s.low ? 'verify__status--low' : ''}`}>{s.status}</span>
                </div>
                <span className="verify__track">
                  <i
                    className={s.low ? 'verify__fill--low' : ''}
                    style={{ width: `${s.value}%`, transitionDelay: `${250 + i * 120}ms` }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="clarity">
        <SectionHead
          eyebrow="Both sides of the table"
          title="Two sides. One source of truth."
          sub="Candidates and companies work from the same verified data. So nobody wastes an application or a call."
        />
        <div className="clarity-grid">
          {clarityCards.map((card, i) => (
            <article
              className={`clarity-card clarity-card--${card.tone} reveal`}
              key={card.tone}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <span className="clarity-card__eyebrow">{card.eyebrow}</span>
              <h3>{card.title} <span className="clarity-card__accent">{card.accent}</span></h3>
              <ul className="clarity-card__points">
                {card.points.map((p, n) => (
                  <li key={p}><i>{String(n + 1).padStart(2, '0')}</i> {p}</li>
                ))}
              </ul>
              <div className="clarity-card__cta">
                <button
                  type="button"
                  className={`btn ${card.tone === 'candidate' ? 'btn--solid' : 'btn--outline'}`}
                  onClick={card.tone === 'candidate' ? onSignupCandidate : onSignupEmployer}
                >
                  {card.cta} <IconArrowUpRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="statsband reveal">
        <div className="statsband__inner">
          {statBand.map((s) => (
            <div className="statsband__item" key={s.label}>
              <span className="statsband__value">{s.value}</span>
              <span className="statsband__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="journey" id="how" aria-label="How Surwive works">
        <SectionHead eyebrow="How it works" title="Three steps to your next role" />
        <ol className="journey__grid">
          {journeySteps.map((step, i) => (
            <li className="journey__step reveal" key={step.id} style={{ transitionDelay: `${i * 130}ms` }}>
              <span className="journey__node">{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="journey__cta reveal">
          <button type="button" className="btn btn--solid" onClick={onSignupCandidate}>
            Create your profile <IconArrowUpRight />
          </button>
        </div>
      </section>

      <section className="testimonials">
        <SectionHead eyebrow="Loved by professionals" title="People who found their fit" />
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <figure className="testimonial-card reveal" key={t.name} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="testimonial-card__stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, idx) => <IconStar key={idx} />)}
              </div>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="testimonial-card__avatar">{initials(t.name)}</span>
                <span className="testimonial-card__who">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="recruiter" id="recruiters">
        <div className="recruiter__panel reveal reveal--panel">
          <div className="recruiter__copy">
            <span className="eyebrow eyebrow--ink">For recruiters</span>
            <h2>Smarter Job Recommendations. Better Career Opportunities.</h2>
            <p>
              Skip manual screening. Hishi AI matches candidates based on skills, experience, and job requirements, helping you discover the best-fit talent faster.
            </p>
            <ul className="checklist checklist--ink">
              <li>Reach AI-matched candidates actively seeking your role.</li>
              <li>Shortlist talent using verified skills and matching scores.</li>
              <li>Reduce hiring time with faster, smarter recruitment.</li>
            </ul>
            <div className="recruiter__ctas">
              <button type="button" className="btn btn--ink" onClick={onSignupEmployer}>
                Post a job <IconArrowUpRight />
              </button>
              <a className="btn btn--outline-ink" href="#/pricing" onClick={onCompanyPricing}>
                See pricing
              </a>
            </div>
          </div>
          <div className="recruiter__stats">
            {recruiterStats.map((s) => (
              <div className="recruiter__stat" key={s.label}>
                <span>{s.value}</span>
                <small>{s.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="appsection">
        <div className="appsection__copy reveal">
          <span className="eyebrow eyebrow--left">Mobile app</span>
          <h2>Your job search, in your pocket</h2>
          <p>
            Get instant AI job alerts, apply with one tap, and connect with recruiters anytime. Your complete AI job search, now on mobile.
          </p>
          <ul className="checklist">
            <li>Instant match alerts, the moment a role opens</li>
            <li>Apply in one tap from anywhere</li>
            <li>Message recruiters on the go</li>
          </ul>
          <div className="appsection__stores">
            <button type="button" className="store-btn" onClick={onSignupCandidate}>
              <IconApple />
              <span><small>Download on the</small>App Store</span>
            </button>
            <button type="button" className="store-btn" onClick={onSignupCandidate}>
              <IconPlayStore />
              <span><small>Get it on</small>Google Play</span>
            </button>
          </div>
        </div>
        <div className="appsection__phone reveal reveal--panel" style={{ transitionDelay: '120ms' }} aria-hidden="true">
          <div className="phone">
            <div className="phone__screen phone__screen--shot">
              <img src={appPic} alt="" className="phone__shot" />
              <span className="phone__pill"><IconSpark /> Match alert</span>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter reveal">
        <h2>Get matched roles in your inbox</h2>
        <p>One curated email a week. The best roles for your profile — no noise, no spam.</p>
        <NewsletterForm />
        <span className="newsletter__note">Join 120,000+ professionals. Unsubscribe anytime.</span>
      </section>
    </>
  )
}
