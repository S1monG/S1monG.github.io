import { Box, Button, Tab, Tabs } from '@mui/material'
import { FC, ReactElement, useState } from 'react'

let nbrOfTabs = 0

const DynamicTabs: FC = (): ReactElement => {
  const [tabs, setTabs] = useState<ReactElement[]>([])
  const [tabIndex, setTabIndex] = useState(0)

  const addTab = () => {
    nbrOfTabs += 1
    setTabs([...tabs, <Tab key={nbrOfTabs} label={`Tab ${nbrOfTabs}`} />])
  }

  const removeTab = () => {
    if (tabs.length > 0) {
      const newTabs = tabs.slice(0, tabs.length - 1)
      setTabs(newTabs)
    }
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
      >
        {tabs}
      </Tabs>
      <Button onClick={addTab}>Add Tab</Button>
      <Button onClick={removeTab}>Remove Tab</Button>
    </Box>
  )
}

export default DynamicTabs
