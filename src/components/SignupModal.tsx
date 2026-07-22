import { useEffect, useState, type FormEvent } from 'react'
import { GOOGLE_SCRIPT_URL, submitToGoogleSheet } from '../lib/sheets'
import { IconArrowUpRight, IconClose } from './icons'

export type SignupRole = 'candidate' | 'employer'
type ExperienceLevel = 'fresher' | 'experienced'

export function SignupModal({
  role,
  onRoleChange,
  onClose,
}: {
  role: SignupRole
  onRoleChange: (role: SignupRole) => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('fresher')
  const [yearsOfExperience, setYearsOfExperience] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobPosition, setJobPosition] = useState('')
  const [openPositions, setOpenPositions] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function resetFields() {
    setName('')
    setEmail('')
    setPhone('')
    setJobTitle('')
    setExperienceLevel('fresher')
    setYearsOfExperience('')
    setCompanyName('')
    setJobPosition('')
    setOpenPositions('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const phoneDigits = phone.replace(/\D/g, '')
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      setStatus('error')
      setErrorText('Please enter a valid phone number with 10 to 13 digits.')
      return
    }
    setStatus('submitting')
    try {
      const data: Record<string, string> =
        role === 'candidate'
          ? {
              role,
              name,
              email,
              phone,
              jobTitle,
              experienceLevel,
              yearsOfExperience: experienceLevel === 'experienced' ? yearsOfExperience : '',
            }
          : {
              role,
              companyName,
              name,
              email,
              phone,
              jobPosition,
              openPositions,
            }
      await submitToGoogleSheet({ ...data, submittedAt: new Date().toISOString() })
      setStatus('success')
      resetFields()
    } catch {
      setStatus('error')
      setErrorText(
        GOOGLE_SCRIPT_URL
          ? "Something went wrong sending that — please try again."
          : "Signups aren't connected yet. Set VITE_GOOGLE_SCRIPT_URL to your Google Apps Script endpoint."
      )
    }
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="signup-modal-title">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          <IconClose />
        </button>

        <span className="eyebrow eyebrow--left">Get started</span>
        <h2 id="signup-modal-title">Join Surwive</h2>
        <p>Tell us a little about you and we'll be in touch with matches worth your time.</p>

        <div className="modal__role-toggle" role="radiogroup" aria-label="I am">
          <label className={`modal__role-btn ${role === 'candidate' ? 'is-active' : ''}`}>
            <input
              type="radio"
              name="signup-audience"
              value="candidate"
              checked={role === 'candidate'}
              onChange={() => onRoleChange('candidate')}
            />
            Looking for a job
          </label>
          <label className={`modal__role-btn ${role === 'employer' ? 'is-active' : ''}`}>
            <input
              type="radio"
              name="signup-audience"
              value="employer"
              checked={role === 'employer'}
              onChange={() => onRoleChange('employer')}
            />
            Looking to hire
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          {role === 'employer' && (
            <div className="modal__field">
              <label htmlFor="signup-company">Company name</label>
              <input
                id="signup-company"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
          )}

          <div className="modal__field">
            <label htmlFor="signup-name">Full name</label>
            <input
              id="signup-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
            />
          </div>

          <div className="modal__field">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@email.com"
            />
          </div>

          <div className="modal__field">
            <label htmlFor="signup-phone">Phone number</label>
            <input
              id="signup-phone"
              type="tel"
              required
              inputMode="tel"
              maxLength={18}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>

          {role === 'candidate' ? (
            <>
              <div className="modal__field">
                <label htmlFor="signup-job-title">Job title</label>
                <input
                  id="signup-job-title"
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Frontend engineer"
                />
              </div>

              <div className="modal__field">
                <label>Experience level</label>
                <div className="modal__role-toggle modal__role-toggle--sub" role="radiogroup" aria-label="Experience level">
                  <label className={`modal__role-btn ${experienceLevel === 'fresher' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="signup-experience-level"
                      value="fresher"
                      checked={experienceLevel === 'fresher'}
                      onChange={() => setExperienceLevel('fresher')}
                    />
                    Fresher
                  </label>
                  <label className={`modal__role-btn ${experienceLevel === 'experienced' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="signup-experience-level"
                      value="experienced"
                      checked={experienceLevel === 'experienced'}
                      onChange={() => setExperienceLevel('experienced')}
                    />
                    Experienced
                  </label>
                </div>
              </div>

              {experienceLevel === 'experienced' && (
                <div className="modal__field">
                  <label htmlFor="signup-years">Years of experience</label>
                  <input
                    id="signup-years"
                    type="number"
                    min={0}
                    step="0.5"
                    required
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    placeholder="e.g. 3"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="modal__field">
                <label htmlFor="signup-job-position">Job position</label>
                <input
                  id="signup-job-position"
                  type="text"
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  placeholder="e.g. Backend engineer"
                />
              </div>

              <div className="modal__field">
                <label htmlFor="signup-open-positions">Number of open positions</label>
                <input
                  id="signup-open-positions"
                  type="number"
                  min={1}
                  step="1"
                  required
                  value={openPositions}
                  onChange={(e) => setOpenPositions(e.target.value)}
                  placeholder="e.g. 2"
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn--solid modal__submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Submit'} <IconArrowUpRight />
          </button>

          {status === 'success' && (
            <p className="modal__status modal__status--success">Thanks — we'll be in touch soon.</p>
          )}
          {status === 'error' && <p className="modal__status modal__status--error">{errorText}</p>}
        </form>
      </div>
    </div>
  )
}
