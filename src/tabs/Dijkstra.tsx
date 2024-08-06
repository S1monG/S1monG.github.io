import { FC, ReactElement, useState } from 'react'
import { Container, Divider, Stack } from '@mui/material'
import DijkstrasResult from '../components/Dijkstras/DijkstrasResult'
import GraphVisual from '../components/Dijkstras/GraphVisual'

const Dijkstra: FC = (): ReactElement => {

  const [selectedData, setSelectedData] = useState<string>('/graph_10_nodes.in')

  return (
    <Stack direction='row' height='100vh'>
      <Container sx={{ width: '40%' }}>
        <GraphVisual selectedData={selectedData} setSelectedData={setSelectedData}/>
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

export default Dijkstra