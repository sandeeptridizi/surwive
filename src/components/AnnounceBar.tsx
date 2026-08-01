import { IconSpark } from './icons'

const announcements = [
  '25,000+ new jobs added this month — powered by AI matching',
  '1,500+ internships live right now — apply before they close',
  'CodeStorm 48-Hour Hackathon kicks off 19 Jul — ₹5L prize pool',
  'Walk-in drives every week across India — no referrals needed',
]

function AnnounceTrack({ hidden }: { hidden?: boolean }) {
  return (
    <div className="announce__track" aria-hidden={hidden || undefined}>
      {announcements.map((text, i) => (
        <span className="announce__item" key={i}>
          <IconSpark />
          {text}
        </span>
      ))}
    </div>
  )
}

export function AnnounceBar() {
  return (
    <div className="announce">
      <div className="announce__marquee">
        <AnnounceTrack />
        <AnnounceTrack hidden />
      </div>
    </div>
  )
}
