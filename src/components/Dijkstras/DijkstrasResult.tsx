import { Box, Button, TextField, Tooltip, Typography } from '@mui/material'
import { FC, ReactElement, useState } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { dijkstra, fetchGraphData, parseGraph } from '../../utils/DijkstrasAlgorithm'
import TimeResultVisual from './TimeResultVisual'

interface Props {
  graphDataFile: string
}

interface ResultType {
  result: {[node: string]: number}
}

interface TimeType {
  parseTime: number
  runTime: number
  sendToServer?: number
}

const DijkstrasResult: FC<Props> = ({ graphDataFile }): ReactElement => {

  const [startNode, setStartNode] = useState<string>('')
  const [result, setResult] = useState<ResultType>({} as ResultType)
  const [serverResult, setServerResult] = useState<TimeType>({} as TimeType)
  const [clientResult, setClientResult] = useState<TimeType>({} as TimeType)
  const [showResult, setShowResult] = useState<boolean>(false)

  const runDijkstras = async () => {
    if (!startNode) return
    const rawData = await fetchGraphData(graphDataFile)
    const { graph, parseTime } = parseGraph(rawData)
    const { distances, runTime } = dijkstra(graph, startNode)
    setResult({
      result: distances
    })
    setClientResult({
      parseTime,
      runTime
    })

    const serverStartTime = Date.now()
    const response = await fetch(`https://europe-west1-sigma-tractor-429314-n0.cloudfunctions.net/dijkstra?startNode=${encodeURIComponent(startNode)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rawData)
    })
    const serverResult = await response.json()
    const serverEndTime = Date.now()
    setServerResult({
      parseTime: serverResult.parseTime,
      runTime: serverResult.runTime,
      sendToServer: serverEndTime - serverStartTime,
    })
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
              NOTE: Running with smaller data sets will not produce good results.
              TODO: specify specs of the cloud enviorment.
            </Typography>}
        >
          <InfoOutlinedIcon fontSize='large'/>
        </Tooltip>
      </Box>
      {(clientResult || serverResult) && 
        <>
          <Box display='flex' flexDirection='row'>
            <TimeResultVisual parseTime={clientResult.parseTime} runTime={clientResult.runTime} showLabels={false}/>
            <TimeResultVisual parseTime={serverResult.parseTime} runTime={serverResult.runTime} showLabels={true}/>
          </Box>
          <Button
            sx={{marginTop: '40px'}}
            onClick={() => setShowResult(!showResult)}
            endIcon={showResult ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            color='secondary'
          >
                    Result
          </Button>
          {showResult && 
            <Box>
              <Typography>Shortest Distance from Start Node to:</Typography>
              <ul>
                {Object.entries(result.result).map(([node, distance]) => (
                  <li key={node}>{node}: {distance}</li>
                ))}
              </ul>
            </Box>
          }
        </>
      }
    </>
  )
}

export default DijkstrasResult