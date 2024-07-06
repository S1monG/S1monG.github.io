import { FC, ReactElement } from 'react'
import { Paper, Stack } from '@mui/material'

const CurriculumVitae: FC = (): ReactElement => {
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {/* First page */}
            <Paper elevation={3}>
                <img src="/cvPart1.jpg" alt="Curriculum Vitae" style={{maxWidth: '100%', height: 'auto'}}></img>
            </Paper>
            {/* Second Page */}
            <Paper elevation={3}>
                <img src="/cvPart2.jpg" alt="Curriculum Vitae" style={{maxWidth: '100%', height: 'auto'}}></img>
            </Paper>
        </Stack>
    )
}

export default CurriculumVitae