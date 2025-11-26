import React, { useState } from 'react'
import { buildFibTree, layoutTree } from '../algorithms/dp/fibonacci'

function TreeSVG({ nodes, edges }) {
  const scaleX = 110, scaleY = 80, pad = 40
  const maxX = Math.max(...nodes.map(n=>n.x)), maxY = Math.max(...nodes.map(n=>n.y))
  const width = (maxX+1)*scaleX + pad*2
  const height = (maxY+1)*scaleY + pad*2
  const pos = {}
  nodes.forEach(n => pos[n.id] = { x: n.x*scaleX+pad, y: n.y*scaleY+pad, label: n.label })

  return (
    <svg width={width} height={height} className="w-full h-auto">
      {edges.map(e => (
        <line key={e.from+'-'+e.to} x1={pos[e.from].x} y1={pos[e.from].y} x2={pos[e.to].x} y2={pos[e.to].y} stroke="#94a3b8" strokeWidth="2" />
      ))}
      {nodes.map(n => (
        <g key={n.id}>
          <circle cx={pos[n.id].x} cy={pos[n.id].y} r="18" fill="#0ea5e9" opacity="0.9" />
          <text x={pos[n.id].x} y={pos[n.id].y+4} textAnchor="middle" fontSize="10" fill="white">{pos[n.id].label}</text>
        </g>
      ))}
    </svg>
  )
}

export default function RecursionTree(){
  const [n, setN] = useState(6)
  const [tree, setTree] = useState(null)

  const build = () => {
    const root = buildFibTree(Math.max(0, Math.min(12, n)))
    setTree(layoutTree(root))
  }

  return (
    <div className="space-y-3">
      <div className="panel flex items-center gap-3">
        <label className="text-sm">Fibonacci n</label>
        <input type="number" value={n} onChange={e=>setN(parseInt(e.target.value))} />
        <button onClick={build}>Build Tree</button>
        <span className="text-xs text-slate-600">Tip: keep n ≤ 12 for readability.</span>
      </div>
      <div className="panel overflow-auto">
        {tree ? <TreeSVG nodes={tree.nodes} edges={tree.edges} /> : <div className="text-sm text-slate-600">Build the Fibonacci recursion tree to preview here.</div>}
      </div>
    </div>
  )
}
