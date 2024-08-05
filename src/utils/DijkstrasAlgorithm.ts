
export interface Graph {
  [node: string]: {
    [connectedNode: string]: number;
  };
}

export const parseGraph = (rawdata: string) => {
  const startTime = performance.now()

  const graph: Graph = {}
  const lines = rawdata.split('\n')
  for (const line of lines) {
    const [node, connectedNode, weight] = line.split(' ')
    if (!graph[node]) graph[node] = {}
    graph[node][connectedNode] = parseInt(weight)
  }

  const endTime = performance.now()
  const parseTime = endTime - startTime
  return { graph, parseTime }
}

export const dijkstra = (graph: Graph, start: string) => {
  const startTime = performance.now()

  // Create an object to store the shortest distance from the start node to every other node
  const distances: {[node: string]: number} = {}
  
  // A set to keep track of all visited nodes
  const visited = new Set()
  
  // Get all the nodes of the graph
  const nodes = Object.keys(graph)
  
  // Initially, set the shortest distance to every node as Infinity
  for (const node of nodes) {
    distances[node] = Infinity
  }
      
  // The distance from the start node to itself is 0
  distances[start] = 0
  
  // Loop until all nodes are visited
  while (nodes.length) {
    // Sort nodes by distance and pick the closest unvisited node
    nodes.sort((a, b) => distances[a] - distances[b])
    // closestNode will never be undefined because the loop runs a maximum of nodes.length times
    const closestNode = nodes.shift() as string
  
    // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
    if (distances[closestNode] === Infinity) break
  
    // Mark the chosen node as visited
    visited.add(closestNode)
  
    // For each neighboring node of the current node
    for (const neighbor in graph[closestNode]) {
      // If the neighbor hasn't been visited yet
      if (!visited.has(neighbor)) {
        // Calculate tentative distance to the neighboring node
        const newDistance = distances[closestNode] + graph[closestNode][neighbor]
                  
        // If the newly calculated distance is shorter than the previously known distance to this neighbor
        if (newDistance < distances[neighbor]) {
          // Update the shortest distance to this neighbor
          distances[neighbor] = newDistance
        }
      }
    }
  }

  const endTime = performance.now()
  const runTime = endTime - startTime
  return { distances, runTime } // Return the shortest distance from the start node to all nodes
}

export const fetchGraphData = async (graph_data_file: string) => {
  const rawFile = await fetch(graph_data_file)
  const rawData = await rawFile.text()
  return rawData
}
  