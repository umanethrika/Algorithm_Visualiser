export const key = (r, c) => `${r}-${c}`

export function makeGrid(rows, cols) {
  const g = {}
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const id = key(r, c)
      g[id] = {
        id, r, c,
        wall: false,
        start: false,
        end: false,
        visited: false,
        inPath: false,
        prev: null,
        distance: Infinity,
        g: Infinity,
        h: 0,
        f: Infinity,
      }
    }
  }
  return g
}

export const DIRS = [[1,0],[-1,0],[0,1],[0,-1]]

export function neighbors(cell, grid, rows, cols) {
  const out = []
  for (const [dr,dc] of DIRS) {
    const nr = cell.r + dr, nc = cell.c + dc
    if (nr>=0 && nr<rows && nc>=0 && nc<cols) {
      const nb = grid[key(nr,nc)]
      if (!nb.wall) out.push(nb)
    }
  }
  return out
}

export function resetVisits(grid) {
  for (const id in grid) {
    grid[id].visited = false
    grid[id].inPath = false
    grid[id].prev = null
    grid[id].distance = Infinity
    grid[id].g = Infinity
    grid[id].h = 0
    grid[id].f = Infinity
  }
}

export function manhattan(a, b) { return Math.abs(a.r - b.r) + Math.abs(a.c - b.c) }

export class PriorityQueue {
  constructor(score) { this.arr = []; this.score = score }
  push(x) { this.arr.push(x); this.arr.sort((a,b)=>this.score(a)-this.score(b)) }
  pop() { return this.arr.shift() }
  get length() { return this.arr.length }
}
