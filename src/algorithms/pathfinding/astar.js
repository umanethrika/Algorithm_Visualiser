import { neighbors, resetVisits, PriorityQueue, manhattan } from '../../utils/helpers'

export function runAStar(grid, rows, cols, start, goal) {
  resetVisits(grid)
  start.g = 0
  start.h = manhattan(start, goal)
  start.f = start.h
  const open = new PriorityQueue(x => x.f)
  open.push(start)
  const order = []
  while (open.length) {
    const cur = open.pop()
    if (cur.visited) continue
    cur.visited = true
    order.push(cur.id)
    if (cur.id === goal.id) break
    for (const nb of neighbors(cur, grid, rows, cols)) {
      const tentative = cur.g + 1
      if (tentative < nb.g) {
        nb.prev = cur.id
        nb.g = tentative
        nb.h = manhattan(nb, goal)
        nb.f = nb.g + nb.h
        open.push(nb)
      }
    }
  }
  return { order, endId: goal.id }
}
