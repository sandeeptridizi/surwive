export function initials(name: string) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('')
}

export function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}
