import { Box, Button, TextField, Tooltip, Typography } from '@mui/material'
import { FC, ReactElement, useState } from 'react'
import { Graph } from './D3Graph'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

interface Props {
  graph: Graph
}

const DijkstrasResult: FC<Props> = ({ graph }): ReactElement => {

  const [startNode, setStartNode] = useState<string>('')
  const [result, setResult] = useState<{[node: string]: number}>({})

  const runDijkstras = () => {
    if (!startNode) return
    const distances = dijkstra(graph, startNode)
    setResult(distances)
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' marginTop='15px'>
        <Box display='flex'>
          <Button variant="contained" color='secondary' size='small' onClick={runDijkstras}>Run</Button>
          <TextField
            id='start-node'
            label='Start Node'
            variant='outlined'
            sx={{ maxWidth: 100 }}
            size='small'
            style={{ flexGrow: 1 }}
            value={startNode}
            onChange={(event) => setStartNode(event.target.value)}
          />
        </Box>
        <Tooltip
          title={
            <Typography fontSize='large'>
              Run Dijkstras Algorithm in two different enviorments and compare their parse and runtime.
              The first one is run client side on the host machine and the second one is run in a serverless function.
              TODO: specify specs of the serverless solution.
            </Typography>}
        >
          <InfoOutlinedIcon fontSize='large'/>
        </Tooltip>
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Dijkstra Result:</Typography>
        {Object.entries(result).map(([node, distance]) => (
          <Typography key={node}>{`${node}: ${distance}`}</Typography>
        ))}
      </Box>
    </>
  )
}

export default DijkstrasResult

const dijkstra = (graph: Graph, start: string) => {
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
  
  // Return the shortest distance from the start node to all nodes
  return distances
}
  