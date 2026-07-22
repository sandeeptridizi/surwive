import type { ReactNode } from 'react'

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'center',
  action,
}: {
  eyebrow: string
  title: string
  sub?: string
  align?: 'center' | 'left' | 'split'
  action?: ReactNode
}) {
  return (
    <div className={`section-head reveal ${align === 'left' ? 'section-head--left' : ''} ${align === 'split' ? 'section-head--split' : ''}`}>
      <div className="section-head__main">
        <span className={`eyebrow ${align === 'center' ? 'eyebrow--center' : 'eyebrow--left'}`}>{eyebrow}</span>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {action && <div className="section-head__action">{action}</div>}
    </div>
  )
}
