import { SectionHead } from '../components/SectionHead'
import {
  IconArrowUpRight,
  IconCheck,
  IconCrown,
  IconGrad,
  IconShieldCheck,
  IconUsers,
} from '../components/icons'
import { pricingPlans, type PricingAudience } from '../data/pricing'

export function PricingPage({
  audience,
  onAudienceChange,
  onSelectPlan,
}: {
  audience: PricingAudience
  onAudienceChange: (audience: PricingAudience) => void
  onSelectPlan: (audience: PricingAudience) => void
}) {
  return (
    <section className="pricing" id="pricing">
      <SectionHead
        eyebrow="Pricing"
        title="Simple plans for every side of the table"
        sub="Whether you're landing a role or filling one — pick a plan, and only pay for what moves you forward."
      />

      <div className="pricing__toggle-wrap reveal">
        <div
          className={`pricing-toggle ${audience === 'company' ? 'pricing-toggle--company' : ''}`}
          role="tablist"
          aria-label="Pricing for"
        >
          <span className="pricing-toggle__thumb" aria-hidden="true" />
          <button
            type="button"
            role="tab"
            aria-selected={audience === 'student'}
            className={`pricing-toggle__btn ${audience === 'student' ? 'is-active' : ''}`}
            onClick={() => onAudienceChange('student')}
          >
            <IconGrad /> For Students
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={audience === 'company'}
            className={`pricing-toggle__btn ${audience === 'company' ? 'is-active' : ''}`}
            onClick={() => onAudienceChange('company')}
          >
            <IconUsers /> For Companies
          </button>
        </div>
      </div>

      <div className="pricing__grid" key={audience}>
        {pricingPlans[audience].map((plan, i) => (
          <article
            className={`plan-card ${plan.featured ? 'plan-card--featured' : ''}`}
            key={plan.name}
            style={{ animationDelay: `${i * 110}ms` }}
          >
            {plan.badge && <span className="plan-card__badge">{plan.badge}</span>}

            <div className="plan-card__head">
              <span className="plan-card__icon">{plan.featured ? <IconCrown /> : <IconShieldCheck />}</span>
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
              onClick={() => onSelectPlan(audience)}
            >
              {plan.cta} <IconArrowUpRight />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
