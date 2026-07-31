import { useState } from 'react'
import { getCdnUrl } from '../lib/media'

/**
 * Renders an uploaded company logo on a white tile, falling back to the
 * company's initial letter (on the caller's own colored/gradient background)
 * when no logo is set or the image fails to load.
 */
export function CompanyLogo({
  logo,
  name,
  initial,
  className,
}: {
  logo?: string
  name: string
  initial: string
  className: string
}) {
  const [failed, setFailed] = useState(false)
  const showLogo = Boolean(logo) && !failed

  return (
    <span
      className={className}
      aria-hidden="true"
      style={showLogo ? { background: '#ffffff', boxShadow: '0 8px 18px rgba(15, 23, 42, 0.12)' } : undefined}
    >
      {showLogo ? (
        <img
          src={getCdnUrl(logo)}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6, borderRadius: 'inherit' }}
          onError={() => setFailed(true)}
        />
      ) : (
        initial
      )}
    </span>
  )
}
