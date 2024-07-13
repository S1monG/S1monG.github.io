import { FC, ReactElement, useMemo, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import CenteredTabs from './tabs/CenteredTabs';

import { PaletteTheme } from './utils/Theme';
import { getDesignTokens } from './utils/Theme';
import { ColorModeContext } from './utils/ColorModeContext';

const App: FC = (): ReactElement => {

  const [themeMode, setThemeMode] = useState<PaletteTheme>('light') 

  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ColorModeContext.Provider value={{ themeMode, setThemeMode }}>
        <Header title="Okayy lets go" />
      </ColorModeContext.Provider>
      <CenteredTabs />
    </ThemeProvider>
  )
}

export default App;
