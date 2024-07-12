import { FC, ReactElement, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import CenteredTabs from './tabs/CenteredTabs';
import Me from './tabs/Me';
import API from './tabs/API';
import { PaletteTheme } from './utils/Theme';
import { getDesignTokens } from './utils/Theme';
import { ColorModeContext } from './utils/ColorModeContext';

const App: FC = (): ReactElement => {

  const [themeMode, setThemeMode] = useState<PaletteTheme>('light') 

  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>

        <ColorModeContext.Provider value={{ themeMode, setThemeMode }}>
          <Header title="Okayy lets go" />
        </ColorModeContext.Provider>
        <CenteredTabs />

        <Routes>
          <Route path="/" element={<Me/>} />
          <Route path="/api" element={<API/>} />
          <Route path="/cache" element={<div>to be continued</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
