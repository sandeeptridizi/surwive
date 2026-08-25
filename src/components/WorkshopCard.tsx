import type { WorkshopInfo } from '../data/workshops'
import { IconArrowUpRight, IconClock, IconGrad, IconPin } from './icons'

export function WorkshopCard({
  item,
  index,
  onRegister,
}: {
  item: WorkshopInfo
  index: number
  onRegister: (item: WorkshopInfo) => void
}) {
  const closed = item.registrationClosed || item.seatsLeft <= 0

  return (
    <article className="drive-card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="drive-card__head">
        <span className="drive-card__logo" aria-hidden="true">
          {item.logo ? <img src={item.logo} alt="" /> : <IconGrad />}
        </span>
        <div className="drive-card__host">
          <span><IconPin /> {item.location}</span>
        </div>
        <span className="drive-card__type">Workshop</span>
      </div>
      <h3 className="drive-card__title">{item.title}</h3>
      <div className="drive-card__meta">
        {item.day && <span className="drive-card__daypill">{item.day} {item.month}</span>}
        {item.duration && <span className="drive-card__time"><IconClock /> {item.duration}</span>}
      </div>
      <div className="drive-card__foot">
        <span className="drive-card__perk">{item.isFree ? 'Free' : `₹${item.price}`}</span>
        <button
          type="button"
          className="btn btn--solid btn--sm drive-card__cta"
          onClick={() => onRegister(item)}
          disabled={closed}
        >
          Register <IconArrowUpRight />
        </button>
      </div>
    </article>
  )
}
