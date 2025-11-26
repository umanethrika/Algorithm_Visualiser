import React, { useEffect, useMemo, useState } from 'react'
import { makeGrid, key, resetVisits } from '../utils/helpers'
import { runBFS } from '../algorithms/pathfinding/bfs'
import { runDFS } from '../algorithms/pathfinding/dfs'
import { runDijkstra } from '../algorithms/pathfinding/dijkstra'
import { runAStar } from '../algorithms/pathfinding/astar'
import { recursiveDivision } from '../algorithms/mazes/recursiveDivision'
import { binaryTreeMaze } from '../algorithms/mazes/binaryTree'

export default function Grid({ mode='pathfinding' }) {
  const [rows, setRows] = useState(21)
  const [cols, setCols] = useState(41)
  const [grid, setGrid] = useState(()=> makeGrid(21,41))
  const [algo, setAlgo] = useState('BFS')
  const [mazeAlgo, setMazeAlgo] = useState('Recursive Division')
  const [startId, setStartId] = useState(key(10,5))
  const [endId, setEndId] = useState(key(10,35))
  const [speed, setSpeed] = useState(15)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(()=>{
    setGrid(g=>{
      const ng = { ...g }
      for (const id in ng) { ng[id] = { ...ng[id], start:false, end:false } }
      if (ng[startId]) ng[startId] = { ...ng[startId], start:true, wall:false }
      if (ng[endId]) ng[endId] = { ...ng[endId], end:true, wall:false }
      return ng
    })
  }, [startId, endId])

  const arr = useMemo(()=>{
    const out = []
    for (let r=0;r<rows;r++){
      const row = []
      for (let c=0;c<cols;c++) row.push(grid[key(r,c)])
      out.push(row)
    }
    return out
  }, [grid, rows, cols])

  function reconstructPath(g, end) {
    const path = []
    let cur = end
    while (cur) { path.push(cur); cur = g[cur].prev }
    path.reverse().forEach(id => { g[id].inPath = true })
    return path
  }

  function animate(order, endId) {
    setIsRunning(true)
    let i = 0
    const ids = [...order]
    const timer = setInterval(()=>{
      setGrid(g=>{
        const ng = { ...g }
        if (i < ids.length) {
          const id = ids[i++]
          if (!ng[id].start && !ng[id].end) ng[id] = { ...ng[id], visited: true }
          return ng
        }
        reconstructPath(ng, endId)
        clearInterval(timer)
        setIsRunning(false)
        return { ...ng }
      })
    }, Math.max(2, speed))
  }

  const run = () => {
    if (isRunning) return
    const s = grid[startId], t = grid[endId]
    if (!s || !t) return
    let result
    const copy = JSON.parse(JSON.stringify(grid))
    switch(algo){
      case 'BFS': result = runBFS(copy, rows, cols, copy[startId], copy[endId]); break;
      case 'DFS': result = runDFS(copy, rows, cols, copy[startId], copy[endId]); break;
      case 'Dijkstra': result = runDijkstra(copy, rows, cols, copy[startId], copy[endId]); break;
      case 'A*': result = runAStar(copy, rows, cols, copy[startId], copy[endId]); break;
      default: result = runBFS(copy, rows, cols, copy[startId], copy[endId])
    }
    setGrid(g=>{ const ng={...g}; resetVisits(ng); return ng })
    animate(result.order, result.endId)
  }

  const clearAll = () => {
    setIsRunning(false)
    setGrid(g=>{
      const ng = { ...g }
      for (const id in ng) {
        ng[id] = { ...ng[id], visited:false, inPath:false, prev:null, distance:Infinity, g:Infinity, f:Infinity, h:0 }
      }
      return ng
    })
  }

  const clearWalls = () => {
    setGrid(g=>{ const ng={...g}; for (const id in ng) ng[id] = { ...ng[id], wall:false }; return ng })
  }

  const buildMaze = () => {
    if (isRunning) return
    setGrid(g=>{
      const copy = {}
      for (const id in g) copy[id] = { ...g[id], visited:false, inPath:false, prev:null }
      if (mazeAlgo === 'Recursive Division') recursiveDivision(copy, rows, cols)
      else binaryTreeMaze(copy, rows, cols)
      return copy
    })
  }

  function onCellClick(e, cell) {
    e.preventDefault()
    setGrid(g=>{
      const ng = { ...g }
      if (e.shiftKey) setStartId(cell.id)
      else if (e.altKey) setEndId(cell.id)
      else if (!cell.start && !cell.end) ng[cell.id] = { ...ng[cell.id], wall: !ng[cell.id].wall }
      return ng
    })
  }

  return (
    <div className="space-y-3">
      {mode==='pathfinding' && (
        <div className="panel flex flex-wrap items-center gap-2">
          <select value={algo} onChange={e=>setAlgo(e.target.value)}>
            <option>BFS</option>
            <option>DFS</option>
            <option>Dijkstra</option>
            <option>A*</option>
          </select>
          <label className="text-sm">Speed</label>
          <input type="range" min={1} max={60} value={speed} onChange={e=>setSpeed(parseInt(e.target.value))} />
          <button onClick={run} disabled={isRunning}>Run</button>
          <button onClick={clearAll}>Reset</button>
          <button onClick={clearWalls}>Clear Walls</button>
          <div className="text-xs text-slate-600">Tip: Click to toggle walls. Shift+Click = Start, Alt+Click = End.</div>
        </div>
      )}
      {mode==='mazes' && (
        <div className="panel flex flex-wrap items-center gap-2">
          <select value={mazeAlgo} onChange={e=>setMazeAlgo(e.target.value)}>
            <option>Recursive Division</option>
            <option>Binary Tree</option>
          </select>
          <button onClick={buildMaze}>Generate Maze</button>
          <button onClick={clearWalls}>Clear Walls</button>
        </div>
      )}
      <div className="panel">
        <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`}}>
          {arr.flat().map(cell => (
            <div key={cell?.id}
              onClick={(e)=>onCellClick(e, cell)}
              title={`${cell?.r},${cell?.c}`}
              className={
                'aspect-square rounded-sm border ' +
                (cell?.start ? 'bg-green-500 border-green-600' :
                 cell?.end ? 'bg-rose-500 border-rose-600' :
                 cell?.inPath ? 'bg-amber-400 border-amber-500' :
                 cell?.visited ? 'bg-sky-300 border-sky-400' :
                 cell?.wall ? 'bg-slate-800 border-slate-900' :
                 'bg-white border-slate-200')
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
