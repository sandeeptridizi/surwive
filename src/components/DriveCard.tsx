import type { DriveEvent } from '../data/drives'
import { IconArrowUpRight, IconClock, IconPin, IconSpark } from './icons'
import { initials } from '../lib/utils'

export function DriveCard({ item, index, onApply }: { item: DriveEvent; index: number; onApply: () => void }) {
  return (
    <article className="drive-card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="drive-card__head">
        <span className="drive-card__logo" aria-hidden="true">{initials(item.host)}</span>
        <div className="drive-card__host">
          <strong>{item.host}</strong>
          <span><IconPin /> {item.location}</span>
        </div>
        <span className="drive-card__type">{item.type}</span>
      </div>
      <h3 className="drive-card__title">{item.title}</h3>
      <div className="drive-card__meta">
        <span className="drive-card__daypill">{item.day} {item.month}</span>
        <span className="drive-card__time"><IconClock /> {item.time}</span>
      </div>
      <div className="drive-card__tags">
        <span className="job-tag job-tag--mode">{item.mode}</span>
        {item.tags.map((tag) => (
          <span className="job-tag" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="drive-card__foot">
        <span className="drive-card__perk"><IconSpark /> {item.perk}</span>
        <button type="button" className="btn btn--solid btn--sm drive-card__cta" onClick={onApply}>
          Register <IconArrowUpRight />
        </button>
      </div>
    </article>
  )
}
