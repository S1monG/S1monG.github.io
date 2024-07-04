import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"
import { ReactElement, FC } from "react"

interface Props {
    title: string
}

const Header: FC<Props> = ({ title }): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: 'lightgray'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header