export type WorkshopInfo = {
  slug: string
  title: string
  location: string
  duration: string
  day: string
  month: string
  /** Banner image uploaded by the admin when creating the workshop; falls back to a graduation-cap icon when absent. */
  image?: string
  /** Organizer/company logo uploaded by the admin; shown as the card badge when present. */
  logo?: string
  seatsLeft: number
  maxCapacity: number
  registrationClosed: boolean
  isFree: boolean
  price: number
}
