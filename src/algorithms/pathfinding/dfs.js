import { neighbors, resetVisits } from '../../utils/helpers'

export function runDFS(grid, rows, cols, start, goal) {
  resetVisits(grid)
  const st = [start]
  const order = []
  start.visited = true
  while (st.length) {
    const cur = st.pop()
    order.push(cur.id)
    if (cur.id === goal.id) break
    for (const nb of neighbors(cur, grid, rows, cols)) {
      if (!nb.visited) {
        nb.visited = true
        nb.prev = cur.id
        st.push(nb)
      }
    }
  }
  return { order, endId: goal.id }
}
