import { useEffect, useState } from 'react'
import { IconSpark } from './icons'

const announcements = [
  '25,000+ new jobs added this month — powered by AI matching',
  '1,500+ internships live right now — apply before they close',
  'CodeStorm 48-Hour Hackathon kicks off 19 Jul — ₹5L prize pool',
  'Walk-in drives every week across India — no referrals needed',
]

export function AnnounceBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % announcements.length), 4500)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="announce">
      <IconSpark />
      <span key={index} className="announce__text">{announcements[index]}</span>
    </div>
  )
}
