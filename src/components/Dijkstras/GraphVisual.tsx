import { FC, ReactElement, useState, useEffect } from 'react'
import { Select, MenuItem } from '@mui/material'
import { Graph, fetchGraphData, parseGraph } from '../../utils/DijkstrasAlgorithm'
import D3Graph from './D3Graph'

interface Props {
    selectedData: string
    setSelectedData: (data: string) => void
}

const GraphVisual: FC<Props> = ({selectedData, setSelectedData }): ReactElement => {
    
  
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
    <>
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
    </>
  )
}

export default GraphVisual