import { key } from '../../utils/helpers'

export function binaryTreeMaze(grid, rows, cols) {
  for (const id in grid) if (!grid[id].start && !grid[id].end) grid[id].wall = true
  for (let r=1;r<rows;r+=2) {
    for (let c=1;c<cols;c+=2) {
      const cell = grid[key(r,c)]
      cell.wall = false
      if (r === 1 && c === cols - 2) continue
      if (r === 1) {
        if (c + 1 < cols) grid[key(r, c + 1)].wall = false
      } else if (c === cols - 2) {
        if (r - 1 >= 0) grid[key(r - 1, c)].wall = false
      } else {
        if (Math.random() < 0.5) grid[key(r - 1, c)].wall = false
        else grid[key(r, c + 1)].wall = false
      }
    }
  }
}
