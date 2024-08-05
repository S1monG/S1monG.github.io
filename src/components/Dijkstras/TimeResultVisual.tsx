import { FC, ReactElement } from 'react'
import { PieChart } from '@mui/x-charts'

interface Props {
  parseTime: number
  runTime: number
  showLabels: boolean
  sendToServer?: number
  sendToClient?: number
}

const TimeResultVisual: FC<Props> = (times): ReactElement => {

  const data = times.showLabels ? [
    { id: 0, value: times.parseTime, label: 'Parse Time (ms)' },
    { id: 1, value: times.runTime, label: 'Run Time (ms)' },
    { id: 2, value: times.sendToServer || 0, label: 'Send to Server (ms)' },
    { id: 3, value: times.sendToClient || 0, label: 'Send to Client (ms)' }
  ] : [
    { id: 0, value: times.parseTime },
    { id: 1, value: times.runTime },
    { id: 2, value: times.sendToServer || 0 },
    { id: 3, value: times.sendToClient || 0 }
  ]

  return (
    <PieChart 
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlight: 'item'},
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
        }
      ]}
      width={600}
      height={300}
    />
  )
}

export default TimeResultVisual