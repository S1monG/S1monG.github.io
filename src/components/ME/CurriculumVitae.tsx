import { FC, ReactElement, useContext } from 'react'
import { Paper } from '@mui/material'
import { ColorModeContext } from '../../utils/ColorModeContext'

const CurriculumVitae: FC = (): ReactElement => {

  const { themeMode, setThemeMode } = useContext(ColorModeContext)
  
  return (
    <Paper elevation={3}>
      {themeMode === 'light' ?
          <img src="/cv.jpg" alt="Curriculum Vitae" style={{maxWidth: '100%', height: 'auto'}}></img>
        : <img src="/cv_black.jpg" alt="Curriculum Vitae" style={{maxWidth: '100%', height: 'auto'}}></img>
      }
    </Paper>
  )
}

export default CurriculumVitae