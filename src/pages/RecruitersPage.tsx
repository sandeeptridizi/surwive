import type { ReactNode } from 'react'
import { Link } from '../components/Link'
import { SectionHead } from '../components/SectionHead'
import {
  IconArrowUpRight,
  IconCheck,
  IconDoc,
  IconGear,
  IconPin,
  IconShieldCheck,
  IconStar,
  IconTrophy,
  IconUsers,
} from '../components/icons'
import { recruiterStats, statBand, testimonials, trustedLogos } from '../data/home'
import { pricingPlans } from '../data/pricing'

const SOLUTIONS: { icon: ReactNode; title: string; body: string }[] = [
  { icon: <IconDoc />, title: 'Job & internship postings', body: 'List full-time roles, internships, and freelance gigs in minutes and start receiving applications the same day.' },
  { icon: <IconGear />, title: 'AI candidate matching', body: 'Hishi AI ranks every applicant against your requirement, so your shortlist is relevant from the first response.' },
  { icon: <IconPin />, title: 'Walk-in drives', body: 'Run walk-in hiring drives with a live event page, RSVP tracking, and an on-the-spot applicant list.' },
  { icon: <IconTrophy />, title: 'Campus events & hackathons', body: 'Host hackathons and campus challenges to spot builders early and pipeline them for future roles.' },
  { icon: <IconShieldCheck />, title: 'Verified profiles', body: 'Every candidate profile is screened before it reaches you, so you spend time on real, qualified applicants.' },
  { icon: <IconUsers />, title: 'Direct candidate chat', body: 'Message shortlisted candidates inside Surwive and move from shortlist to interview without leaving the platform.' },
]

const STEPS = [
  { id: '01', title: 'Post your requirement', body: 'Describe the role, skills, and experience you need — a job, an internship, or a walk-in drive.' },
  { id: '02', title: 'Get an AI-ranked shortlist', body: 'Hishi AI scores every applicant against your requirement, so the best fits rise to the top automatically.' },
  { id: '03', title: 'Chat, interview, hire', body: 'Message candidates directly, schedule interviews, and close roles faster with fewer unqualified applications.' },
]

const WHY_SURWIVE = [
  'Reach AI-matched candidates actively looking for your kind of role.',
  'Shortlist using verified skills and match scores, not just resumes.',
  'Run job posts, internships, and walk-in drives from one dashboard.',
  'Chat with candidates directly — no back-and-forth over email.',
]

export function RecruitersPage({
  onSignupEmployer,
  onCompanyPricing,
}: {
  onSignupEmployer: () => void
  onCompanyPricing: () => void
}) {
  const recruiterTestimonial = testimonials.find((t) => /talent|recruit|hr/i.test(t.role)) ?? testimonials[testimonials.length - 1]
  const companyPlans = pricingPlans.company

  return (
    <>
      <section className="recruiters-hero">
        <div className="recruiters-hero__copy">
          <span className="eyebrow eyebrow--left reveal">For recruiters</span>
          <h1 className="reveal" style={{ transitionDelay: '60ms' }}>
            Post once. Meet candidates AI already matched to you.
          </h1>
          <p className="reveal" style={{ transitionDelay: '110ms' }}>
            Surwive replaces manual sourcing with AI-ranked shortlists — for full-time jobs, internships,
            walk-in drives, and campus hackathons, all from one dashboard.
          </p>
          <div className="recruiters-hero__ctas reveal" style={{ transitionDelay: '160ms' }}>
            <button type="button" className="btn btn--solid" onClick={onSignupEmployer}>
              Post a job <IconArrowUpRight />
            </button>
            <Link className="btn btn--outline" href="/contact">Talk to sales</Link>
          </div>
        </div>
        <div className="recruiters-hero__stats reveal reveal--panel" style={{ transitionDelay: '200ms' }}>
          {statBand.map((s) => (
            <div className="recruiters-hero__stat" key={s.label}>
              <span>{s.value}</span>
              <small>{s.label}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="trusted">
        <span className="trusted__label reveal">Hiring teams already on Surwive</span>
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

      <section className="solutions" id="solutions">
        <SectionHead
          eyebrow="Hiring solutions"
          title="Everything you need to hire, in one place"
          sub="Whatever shape your hiring takes this quarter, it runs through the same dashboard."
        />
        <div className="solutions-grid">
          {SOLUTIONS.map((s, i) => (
            <div className="solution-card reveal" key={s.title} style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="solution-card__icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="journey" id="how-recruiters" aria-label="How hiring on Surwive works">
        <SectionHead eyebrow="How it works" title="From requirement to hire, in three steps" />
        <ol className="journey__grid">
          {STEPS.map((step, i) => (
            <li className="journey__step reveal" key={step.id} style={{ transitionDelay: `${i * 130}ms` }}>
              <span className="journey__node">{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="recruiter" id="why-recruiters">
        <div className="recruiter__panel reveal reveal--panel">
          <div className="recruiter__copy">
            <span className="eyebrow eyebrow--ink">Why Surwive</span>
            <h2>Hire on quality, not on volume.</h2>
            <ul className="checklist checklist--ink">
              {WHY_SURWIVE.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="recruiter__ctas">
              <button type="button" className="btn btn--ink" onClick={onSignupEmployer}>
                Post a job <IconArrowUpRight />
              </button>
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

      {recruiterTestimonial && (
        <section className="quote-band">
          <div className="quote-band__card reveal reveal--panel">
            <div className="quote-band__stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, idx) => <IconStar key={idx} />)}
            </div>
            <blockquote>&ldquo;{recruiterTestimonial.quote}&rdquo;</blockquote>
            <p className="quote-band__who">
              <strong>{recruiterTestimonial.name}</strong> — {recruiterTestimonial.role}
            </p>
          </div>
        </section>
      )}

      <section className="recruiters-pricing" id="recruiters-pricing">
        <SectionHead
          eyebrow="Pricing"
          title="Plans built for how you're hiring"
          sub="Pay per posting, no subscriptions or lock-in — internships and full-time jobs are priced separately."
          align="split"
          action={
            <Link className="btn btn--outline" href="/pricing" onClick={onCompanyPricing}>
              See full pricing <IconArrowUpRight />
            </Link>
          }
        />
        <div className="pricing__grid">
          {companyPlans.map((plan, i) => (
            <article
              className={`plan-card ${plan.featured ? 'plan-card--featured' : ''}`}
              key={plan.name}
              style={{ animationDelay: `${i * 110}ms` }}
            >
              {plan.badge && <span className="plan-card__badge">{plan.badge}</span>}
              <div className="plan-card__head">
                <span className="plan-card__icon">{plan.featured ? <IconTrophy /> : <IconShieldCheck />}</span>
                <div className="plan-card__id">
                  <h3>{plan.name}</h3>
                  <span>{plan.tagline}</span>
                </div>
              </div>
              <div className="plan-card__price">
                <span className="plan-card__currency">₹</span>
                <span className="plan-card__amount">{plan.price}</span>
                <span className="plan-card__period">/ {plan.period}</span>
              </div>
              <ul className="plan-card__features">
                {plan.features.map((f) => (
                  <li key={f.title}>
                    <span className="plan-card__check"><IconCheck /></span>
                    <span className="plan-card__feature">
                      <strong>{f.title}</strong>
                      <span>{f.sub}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`btn ${plan.featured ? 'btn--solid' : 'btn--outline'} plan-card__cta`}
                onClick={onSignupEmployer}
              >
                {plan.cta} <IconArrowUpRight />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="recruiters-cta reveal">
        <h2>Ready to hire smarter?</h2>
        <p>Post your first job free and see your AI-ranked shortlist within minutes.</p>
        <div className="recruiters-cta__actions">
          <button type="button" className="btn btn--solid" onClick={onSignupEmployer}>
            Post a job <IconArrowUpRight />
          </button>
          <Link className="btn btn--outline" href="/faqs">Read FAQs</Link>
        </div>
      </section>
    </>
  )
}
