export function buildFibTree(n, id="") {
  const nodeId = id || `F(${n})`
  const node = { id: nodeId, label: `F(${n})`, children: [] }
  if (n <= 1) return node
  node.children.push(buildFibTree(n-1, `${nodeId}-L`))
  node.children.push(buildFibTree(n-2, `${nodeId}-R`))
  return node
}

// simple layout: inorder for x, depth for y
export function layoutTree(root) {
  const nodes = []
  const edges = []
  let xCursor = 0
  function dfs(n, depth) {
    if (!n) return
    if (n.children[0]) dfs(n.children[0], depth+1)
    const x = xCursor++
    nodes.push({ ...n, x, y: depth })
    for (const ch of n.children) edges.push({ from: n.id, to: ch.id })
    for (let k=1;k<n.children.length;k++) dfs(n.children[k], depth+1)
  }
  dfs(root, 0)
  return { nodes, edges }
}
