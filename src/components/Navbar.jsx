import React from 'react'

export default function Navbar({ view, setView }) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-900 shadow">
      <h1 className="text-xl font-bold">Algorithm Visualizer</h1>
      <div className="space-x-2">
        <button onClick={() => setView('pathfinding')} className={view==='pathfinding' ? 'bg-emerald-600' : ''}>Pathfinding</button>
        <button onClick={() => setView('mazes')} className={view==='mazes' ? 'bg-emerald-600' : ''}>Mazes</button>
        <button onClick={() => setView('recursion')} className={view==='recursion' ? 'bg-emerald-600' : ''}>Recursion Trees</button>
      </div>
    </div>
  )
}
