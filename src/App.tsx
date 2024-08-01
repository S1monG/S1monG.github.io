import { FC, ReactElement, useMemo, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CenteredTabs from './tabs/CenteredTabs'
import Me from './tabs/Me'
import API from './tabs/API'
import GlobalButton from './tabs/GlobalButton'
import DijkstrasAlgo from './tabs/DijkstrasAlgo'

import { PaletteTheme } from './utils/Theme'
import { getDesignTokens } from './utils/Theme'
import { ColorModeContext } from './utils/ColorModeContext'

const App: FC = (): ReactElement => {

  const [themeMode, setThemeMode] = useState<PaletteTheme>('light') 

  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ColorModeContext.Provider value={{ themeMode, setThemeMode }}>
          <Header title="Okayy lets go" />
          <CenteredTabs />
          <Routes>
            <Route path="/" element={<Me/>} />
            <Route path="/api" element={<API/>} />
            <Route path="/simple-button" element={<GlobalButton/>} />
            <Route path="/dijkstras-algorithm" element={<DijkstrasAlgo/>} />
            <Route path="/cache" element={<div>to be continued</div>} />
          </Routes>
        </ColorModeContext.Provider>
      </Router>
    </ThemeProvider>
  )
}

export default App
