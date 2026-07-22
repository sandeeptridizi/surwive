import { useState, type CSSProperties } from 'react'
import { SectionHead } from '../components/SectionHead'
import { IconArrowUpRight, IconMail, IconSpark } from '../components/icons'
import { faqCategories, faqCategoryOf, faqs } from '../data/faqs'

export function FaqPage({ onSignup }: { onSignup: () => void }) {
  const [category, setCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const visible = category === 'All' ? faqs : faqs.filter((f) => f.category === category)

  const pickCategory = (name: string) => {
    setCategory(name)
    setOpenIndex(0)
  }

  return (
    <section className="blog faq-page">
      <SectionHead
        eyebrow="Help center"
        title="Frequently asked questions"
        sub="Everything about matching, plans, hiring, and events — answered straight. Can't find yours? We're one message away."
      />

      <div className="blog__filters reveal" role="tablist" aria-label="FAQ categories">
        <button
          type="button"
          role="tab"
          aria-selected={category === 'All'}
          className={`blog-pill ${category === 'All' ? 'is-active' : ''}`}
          style={{ '--blog-accent': 'var(--accent)' } as CSSProperties}
          onClick={() => pickCategory('All')}
        >
          <IconSpark /> All <span className="blog-pill__count">{faqs.length}</span>
        </button>
        {faqCategories.map((cat) => {
          const Icon = cat.icon
          const count = faqs.filter((f) => f.category === cat.name).length
          return (
            <button
              type="button"
              role="tab"
              aria-selected={category === cat.name}
              key={cat.name}
              className={`blog-pill ${category === cat.name ? 'is-active' : ''}`}
              style={{ '--blog-accent': cat.color } as CSSProperties}
              onClick={() => pickCategory(cat.name)}
            >
              <Icon /> {cat.name} <span className="blog-pill__count">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="faq-list" key={category}>
        {visible.map((faq, i) => {
          const cat = faqCategoryOf(faq)
          const Icon = cat.icon
          const isOpen = openIndex === i
          return (
            <div
              className={`faq-item ${isOpen ? 'is-open' : ''}`}
              key={faq.q}
              style={{ '--faq-accent': cat.color, animationDelay: `${i * 45}ms` } as CSSProperties}
            >
              <button
                type="button"
                className="faq-item__question"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="faq-item__icon" aria-hidden="true"><Icon /></span>
                <span className="faq-item__text">
                  {faq.q}
                  <small>{faq.category}</small>
                </span>
                <span className="faq-item__toggle" aria-hidden="true" />
              </button>
              <div className="faq-item__body">
                <div className="faq-item__answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="faq-cta reveal">
        <span className="faq-cta__icon"><IconMail /></span>
        <h2>Still have questions?</h2>
        <p>Our team reads every message and replies within one business day.</p>
        <div className="faq-cta__actions">
          <a href="mailto:support@surwive.com" className="btn btn--outline">Contact support</a>
          <button type="button" className="btn btn--solid" onClick={onSignup}>
            Join Surwive <IconArrowUpRight />
          </button>
        </div>
      </div>
    </section>
  )
}
