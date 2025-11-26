import { neighbors, resetVisits } from '../../utils/helpers'

export function runBFS(grid, rows, cols, start, goal) {
  resetVisits(grid)
  const q = [start]
  const order = []
  start.visited = true
  while (q.length) {
    const cur = q.shift()
    order.push(cur.id)
    if (cur.id === goal.id) break
    for (const nb of neighbors(cur, grid, rows, cols)) {
      if (!nb.visited) {
        nb.visited = true
        nb.prev = cur.id
        q.push(nb)
      }
    }
  }
  return { order, endId: goal.id }
}
