import { neighbors, resetVisits, PriorityQueue } from '../../utils/helpers'

export function runDijkstra(grid, rows, cols, start, goal) {
  resetVisits(grid)
  const pq = new PriorityQueue(x => x.distance)
  start.distance = 0
  pq.push(start)
  const order = []
  while (pq.length) {
    const cur = pq.pop()
    if (cur.visited) continue
    cur.visited = true
    order.push(cur.id)
    if (cur.id === goal.id) break
    for (const nb of neighbors(cur, grid, rows, cols)) {
      const alt = cur.distance + 1
      if (alt < nb.distance) {
        nb.distance = alt
        nb.prev = cur.id
        pq.push(nb)
      }
    }
  }
  return { order, endId: goal.id }
}
