export type PaginationItem = number | 'ellipsis'

/**
 * Windowed page list with ellipses, e.g. for page 7 of 20: [1, '…', 6, 7, 8, '…', 20].
 * Always keeps the first/last page and a sibling on each side of the current page visible.
 */
export function paginationRange(current: number, total: number, siblingCount = 1): PaginationItem[] {
  const totalSlots = siblingCount * 2 + 5

  if (total <= totalSlots) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(current - siblingCount, 1)
  const rightSibling = Math.min(current + siblingCount, total)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + siblingCount * 2
    return [...Array.from({ length: leftCount }, (_, i) => i + 1), 'ellipsis', total]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + siblingCount * 2
    return [1, 'ellipsis', ...Array.from({ length: rightCount }, (_, i) => total - rightCount + i + 1)]
  }

  return [
    1,
    'ellipsis',
    ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i),
    'ellipsis',
    total,
  ]
}
