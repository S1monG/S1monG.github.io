import { FC, ReactElement } from 'react'
import CurriculumVitae from '../components/ME/CurriculumVitae'
import DownloadCV from '../components/ME/DownloadCV'
import { Box, Container, Typography } from '@mui/material'

const Me: FC = (): ReactElement => {
    return (
        <Container>
            <Typography variant="h3"  fontFamily='monospace' marginY='10px'>Hello! I'm Simon</Typography>
            <Typography variant="body1" fontFamily='monospace'>
                A Computer Science and Engineering student at LTH.<br/>
                <br/>
                This is my Portfolio Website together with some features I occasionally use and kind of a playground for me<br/>
                to try out new technologies/things. If you want to get in touch, my contact information can be found in the CV below.
            </Typography>
            <Box display='flex' justifyContent='flex-end'>
                <DownloadCV />
            </Box>
            <CurriculumVitae />
        </Container>
    )
}

export default Me