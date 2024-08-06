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
    if (selectedData === '/graph_2000_nodes.in' || selectedData === '/graph_10000_nodes.in') return
    featchData(selectedData)
  }, [selectedData])

  return (
    <>
      <Select size='small' value={selectedData} onChange={(event) => setSelectedData(event.target.value)}>
        <MenuItem value='/graph_10_nodes.in'>Small Graph</MenuItem>
        <MenuItem value='/graph_50_nodes.in'>Medium Graph</MenuItem>
        <MenuItem value='/graph_2000_nodes.in'>Large Graph</MenuItem>
        <MenuItem value='/graph_10000_nodes.in'>Mega Graph</MenuItem>
      </Select>
      {!graph ? (
        <p>Loading...</p>
      ) : selectedData === '/graph_2000_nodes.in' || selectedData === '/graph_10000_nodes.in' ? (
        <p> too big</p> 
      ) : (
        <D3Graph graph={graph} />
      )
      }
    </>
  )
}

export default GraphVisual