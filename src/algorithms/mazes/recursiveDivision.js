import { key } from '../../utils/helpers'

function addOuterWalls(grid, rows, cols) {
  for (let r=0;r<rows;r++) for (let c=0;c<cols;c++) {
    if (r===0||c===0||r===rows-1||c===cols-1) {
      const cell = grid[key(r,c)]
      if (!cell.start && !cell.end) cell.wall = true
    }
  }
}

export function recursiveDivision(grid, rows, cols) {
  for (const id in grid) grid[id].wall = false
  addOuterWalls(grid, rows, cols)

  function divide(r0, c0, r1, c1) {
    const width = c1 - c0, height = r1 - r0
    if (width < 2 || height < 2) return
    const horizontal = height > width

    if (horizontal) {
      const hr = r0 + (Math.floor(Math.random() * (height / 2)) * 2) + 1
      for (let c = c0; c <= c1; c++) {
        const cell = grid[key(hr, c)]
        if (!cell.start && !cell.end) cell.wall = true
      }
      const gap = c0 + Math.floor(Math.random() * (width / 2)) * 2 + 1
      grid[key(hr, gap)].wall = false
      divide(r0, c0, hr - 1, c1)
      divide(hr + 1, c0, r1, c1)
    } else {
      const hc = c0 + (Math.floor(Math.random() * (width / 2)) * 2) + 1
      for (let r = r0; r <= r1; r++) {
        const cell = grid[key(r, hc)]
        if (!cell.start && !cell.end) cell.wall = true
      }
      const gap = r0 + Math.floor(Math.random() * (height / 2)) * 2 + 1
      grid[key(gap, hc)].wall = false
      divide(r0, c0, r1, hc - 1)
      divide(r0, hc + 1, r1, c1)
    }
  }
  divide(1,1, rows-2, cols-2)
}
