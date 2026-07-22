import { useState, type FormEvent } from 'react'
import { submitToGoogleSheet } from '../lib/sheets'
import { IconArrowUpRight, IconMail } from './icons'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await submitToGoogleSheet({ role: 'newsletter', email, submittedAt: new Date().toISOString() })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="newsletter__form" onSubmit={handleSubmit}>
      <span className="newsletter__icon"><IconMail /></span>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
      />
      <button type="submit" className="btn btn--solid" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Joining…' : 'Subscribe'} <IconArrowUpRight />
      </button>
      {status === 'success' && <span className="newsletter__status newsletter__status--success">You're on the list!</span>}
      {status === 'error' && <span className="newsletter__status newsletter__status--error">Something went wrong.</span>}
    </form>
  )
}
