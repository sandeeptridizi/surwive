import { paginationRange } from '../lib/pagination'

export function Pagination({
  page,
  totalPages,
  onChange,
  label,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
  label: string
}) {
  if (totalPages <= 1) return null

  return (
    <nav className="blog__pagination" aria-label={label}>
      <button type="button" onClick={() => onChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      {paginationRange(page, totalPages).map((item, i) =>
        item === 'ellipsis' ? (
          <span className="blog__pagination-ellipsis" key={`ellipsis-${i}`} aria-hidden="true">
            &hellip;
          </span>
        ) : (
          <button
            type="button"
            key={item}
            className={page === item ? 'is-active' : ''}
            aria-current={page === item ? 'page' : undefined}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        )
      )}
      <button type="button" onClick={() => onChange(page + 1)} disabled={page === totalPages}>
        Next
      </button>
    </nav>
  )
}
