import { FC, ReactElement, useState, useEffect } from 'react'
import D3Graph, { Graph } from '../components/Dijkstras/D3Graph'
import { Container, Divider, MenuItem, Select, Stack } from '@mui/material'
import DijkstrasResult from '../components/Dijkstras/DijkstrasResult'

const DijkstrasAlgo: FC = (): ReactElement => {

  const [selectedData, setSelectedData] = useState<string>('/small_graph_raw_data.in')
  const [graph, setGraph] = useState<Graph>({})

  const featchData = async (graph_url: string) => {
    const rawFile = await fetch(graph_url)
    const rawData = await rawFile.text()
    const graph = parseGraph(rawData)
    setGraph(graph)
  }

  useEffect(() => {
    featchData(selectedData)
  }, [selectedData])

  return (
    <Stack direction='row' height='100vh'>
      <Container sx={{ width: '40%' }}>
        <Select size='small' value={selectedData} onChange={(event) => setSelectedData(event.target.value)}>
          <MenuItem value='/small_graph_raw_data.in'>Small Graph</MenuItem>
          <MenuItem value='/medium_graph_raw_data.in'>Medium Graph</MenuItem>
          <MenuItem value='/large_graph_raw_data.in'>Large Graph</MenuItem>
        </Select>
        {!graph ? <p>Loading...</p> : <D3Graph graph={graph} />}
      </Container>

      <Divider orientation='vertical' flexItem />

      <Container sx={{ width: '60%' }}>
        <DijkstrasResult graph={graph} />
      </Container>
    </Stack>
  )
}

/* const graph = {
  A: { B: 1, C: 4 },       // Node A is connected to Node B with a weight of 1 and Node C with a weight of 4
  B: { A: 1, C: 2, D: 5 }, // ... and so on for other nodes
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 }
} */

const parseGraph = (rawdata: string) => {
  const graph: Graph = {}
  const lines = rawdata.split('\n')
  for (const line of lines) {
    const [node, connectedNode, weight] = line.split(' ')
    if (!graph[node]) graph[node] = {}
    graph[node][connectedNode] = parseInt(weight)
  }
  return graph
}

export default DijkstrasAlgo