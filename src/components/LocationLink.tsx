import { mapsUrl } from '../lib/utils'

export function LocationLink({ location, online }: { location: string; online?: boolean }) {
  if (online) return <>{location}</>
  return (
    <a
      className="loc-link"
      href={mapsUrl(location)}
      target="_blank"
      rel="noreferrer"
      title={`Open ${location} in Google Maps`}
    >
      {location}
    </a>
  )
}
