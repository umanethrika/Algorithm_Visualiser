# Algorithm Visualizer

An interactive visualization tool for **Pathfinding Algorithms, Maze Generators, and Recursion Trees**.

##  Features
- Pathfinding Algorithms: BFS, DFS, Dijkstra, A*
- Maze Algorithms: Recursive Division, Binary Tree
- Recursion Trees: Fibonacci (SVG layout)

## Tech Stack
- React + Vite
- TailwindCSS
- Framer Motion (optional for future animations)
- D3.js (installed; not required for current SVG tree)

## Getting Started
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### Controls
- **Pathfinding**: choose algorithm, drag/click to toggle walls. **Shift+Click** to set Start, **Alt+Click** to set End. Click **Run**.
- **Mazes**: pick generator → **Generate Maze**. Use **Clear Walls** to reset.
- **Recursion Trees**: pick `n` for Fibonacci → **Build Tree**.

---
Made with love for learning algorithms interactively.
