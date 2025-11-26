import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Grid from './components/Grid'
import RecursionTree from './components/RecursionTree'

export default function App() {
  const [view, setView] = useState('pathfinding')
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar view={view} setView={setView} />
      <div className="max-w-6xl mx-auto p-4">
        {view === 'pathfinding' && <Grid mode="pathfinding" />}
        {view === 'mazes' && <Grid mode="mazes" />}
        {view === 'recursion' && <RecursionTree />}
      </div>
    </div>
  )
}
