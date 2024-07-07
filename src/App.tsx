import { FC, ReactElement, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from "./components/Header";
import CenteredTabs from "./components/CenteredTabs";
import Me from "./tabs/Me";
import { PaletteTheme } from './utils/Theme';
import { getDesignTokens } from './utils/Theme';
import { ColorModeContext } from './utils/ColorModeContext';

const App: FC = (): ReactElement => {

  const [themeMode, setThemeMode] = useState<PaletteTheme>('light') 

  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode])

  return (
    <ColorModeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>

          <Header title="Okayy lets go" />
          <CenteredTabs />

          <Routes>
            <Route path="/" element={<Me/>} />
            <Route path="/api" element={<div>API stuff WIP</div>} />
            <Route path="/cache" element={<div>to be continued</div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
