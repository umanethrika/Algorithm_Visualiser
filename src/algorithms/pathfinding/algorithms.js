// Pathfinding algorithms: BFS, DFS, Dijkstra, A*
export function bfs(grid, start, end) {
  const visited = []
  const q = []
  const cameFrom = {}
  q.push(start)
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]]
  while (q.length) {
    const [r,c] = q.shift()
    if (visited.find(v => v.row===r && v.col===c)) continue
    visited.push({row:r,col:c})
    if (r===end[0] && c===end[1]) break
    for (let [dr,dc] of dirs) {
      const nr=r+dr,nc=c+dc
      if(nr>=0&&nc>=0&&nr<grid.length&&nc<grid[0].length){
        if(!visited.find(v=>v.row===nr&&v.col===nc)){
          q.push([nr,nc])
          cameFrom[`${nr},${nc}`]=[r,c]
        }
      }
    }
  }
  return [visited, reconstructPath(cameFrom,start,end)]
}

export function dfs(grid,start,end){
  const visited=[]
  const stack=[start]
  const cameFrom={}
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]]
  while(stack.length){
    const [r,c]=stack.pop()
    if(visited.find(v=>v.row===r&&v.col===c)) continue
    visited.push({row:r,col:c})
    if(r===end[0]&&c===end[1]) break
    for(let [dr,dc] of dirs){
      const nr=r+dr,nc=c+dc
      if(nr>=0&&nc>=0&&nr<grid.length&&nc<grid[0].length){
        if(!visited.find(v=>v.row===nr&&v.col===nc)){
          stack.push([nr,nc])
          cameFrom[`${nr},${nc}`]=[r,c]
        }
      }
    }
  }
  return [visited,reconstructPath(cameFrom,start,end)]
}

export function dijkstra(grid,start,end){
  const visited=[]
  const dist={}
  const pq=[[0,start]]
  const cameFrom={}
  const key=(x,y)=>`${x},${y}`
  dist[key(start[0],start[1])]=0
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]]
  while(pq.length){
    pq.sort((a,b)=>a[0]-b[0])
    const [d,[r,c]]=pq.shift()
    if(visited.find(v=>v.row===r&&v.col===c)) continue
    visited.push({row:r,col:c})
    if(r===end[0]&&c===end[1]) break
    for(let [dr,dc] of dirs){
      const nr=r+dr,nc=c+dc
      if(nr>=0&&nc>=0&&nr<grid.length&&nc<grid[0].length){
        const nd=d+1
        if(dist[key(nr,nc)]===undefined||nd<dist[key(nr,nc)]){
          dist[key(nr,nc)]=nd
          pq.push([nd,[nr,nc]])
          cameFrom[key(nr,nc)]=[r,c]
        }
      }
    }
  }
  return [visited,reconstructPath(cameFrom,start,end)]
}

export function astar(grid,start,end){
  const visited=[]
  const open=[[0,start]]
  const cameFrom={}
  const gScore={}
  const key=(x,y)=>`${x},${y}`
  gScore[key(start[0],start[1])]=0
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]]
  const h=(r,c)=>Math.abs(r-end[0])+Math.abs(c-end[1])
  while(open.length){
    open.sort((a,b)=>a[0]-b[0])
    const [f,[r,c]]=open.shift()
    if(visited.find(v=>v.row===r&&v.col===c)) continue
    visited.push({row:r,col:c})
    if(r===end[0]&&c===end[1]) break
    for(let [dr,dc] of dirs){
      const nr=r+dr,nc=c+dc
      if(nr>=0&&nc>=0&&nr<grid.length&&nc<grid[0].length){
        const tentative=gScore[key(r,c)]+1
        if(gScore[key(nr,nc)]===undefined||tentative<gScore[key(nr,nc)]){
          gScore[key(nr,nc)]=tentative
          const fscore=tentative+h(nr,nc)
          open.push([fscore,[nr,nc]])
          cameFrom[key(nr,nc)]=[r,c]
        }
      }
    }
  }
  return [visited,reconstructPath(cameFrom,start,end)]
}

function reconstructPath(cameFrom,start,end){
  const path=[]
  let curr=end
  const key=(x,y)=>`${x},${y}`
  while(key(curr[0],curr[1]) in cameFrom){
    path.unshift({row:curr[0],col:curr[1]})
    curr=cameFrom[key(curr[0],curr[1])]
  }
  return path
}
