import { FC, ReactElement, useState, useEffect } from 'react'
import D3Graph from '../components/Dijkstras/D3Graph'
import { Container, Divider, MenuItem, Select, Stack } from '@mui/material'
import DijkstrasResult from '../components/Dijkstras/DijkstrasResult'
import { Graph, parseGraph, fetchGraphData } from '../utils/DijkstrasAlgorithm'

const DijkstrasGraph: FC = (): ReactElement => {

  const [selectedData, setSelectedData] = useState<string>('/small_graph_raw_data.in')
  const [graph, setGraph] = useState<Graph>({})

  const featchData = async (graph_url: string) => {
    const rawData = await fetchGraphData(graph_url)
    const { graph } = parseGraph(rawData)
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
          <MenuItem value='/mega_graph_raw_data.in'>Mega Graph</MenuItem>
        </Select>
        {!graph ? (
          <p>Loading...</p>
        ) : selectedData === '/mega_graph_raw_data.in' ? (
          <p> too big</p> 
        ) : (
          <D3Graph graph={graph} />
        )
        }
      </Container>

      <Divider orientation='vertical' flexItem />

      <Container sx={{ width: '60%' }}>
        <DijkstrasResult graphDataFile={selectedData} />
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

export default DijkstrasGraph