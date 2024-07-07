import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import { ReactElement, FC, useContext } from "react"
import { ColorModeContext } from "../utils/ColorModeContext"
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

interface Props {
    title: string
}

const Header: FC<Props> = ({ title }): ReactElement => {

  const { themeMode, setThemeMode } = useContext(ColorModeContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {title}
          </Typography>

          <IconButton
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            color="inherit"
            aria-label="mode">
            {themeMode === 'light' ? <LightModeIcon/> : <DarkModeIcon/>}
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header