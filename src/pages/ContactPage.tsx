import { useEffect, useRef, useState } from 'react'
import { AgentChatPanel } from '../components/AgentChatPanel'
import { IconArrowUpRight, IconClock, IconMail, IconUsers } from '../components/icons'
import { SectionHead } from '../components/SectionHead'
import { loadChatSession } from '../lib/agentChat'

export function ContactPage() {
  // Returning visitors with an open conversation land straight back in it.
  const [chatOpen, setChatOpen] = useState(() => loadChatSession() !== null)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatOpen) chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [chatOpen])

  return (
    <section className="blog contact-page">
      <SectionHead
        eyebrow="Contact us"
        title="Talk to a real person"
        sub="Questions about matching, plans, hiring, or your account — email us or chat with an agent right here."
      />

      <div className="contact-grid">
        <div className="contact-card reveal">
          <span className="contact-card__icon"><IconMail /></span>
          <h3>Email support</h3>
          <p>Write to us any time and we'll reply within one business day.</p>
          <a className="contact-card__link" href="mailto:Support@surwive.com">Support@surwive.com</a>
        </div>

        <div className="contact-card reveal">
          <span className="contact-card__icon"><IconUsers /></span>
          <h3>Live agent chat</h3>
          <p>Start a conversation with our support team without leaving this page.</p>
          <button type="button" className="btn btn--solid" onClick={() => setChatOpen(true)}>
            Connect with an agent <IconArrowUpRight />
          </button>
        </div>
      </div>

      <p className="contact-hours reveal">
        <IconClock /> Agents are online Monday to Saturday, 9:00–19:00 IST. Outside those hours,
        leave a message — it reaches the same inbox as <a href="mailto:Support@surwive.com">Support@surwive.com</a>.
      </p>

      {/* No `reveal` here — this mounts on click, after useScrollReveal has
          already scanned the page, so it would never be marked visible. */}
      {chatOpen && (
        <div ref={chatRef} className="contact-chat">
          <AgentChatPanel />
        </div>
      )}
    </section>
  )
}
