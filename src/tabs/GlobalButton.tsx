import { FC, ReactElement, useEffect, useState } from 'react'
import { Button, Typography, Box } from '@mui/material'



const GlobalButton: FC = (): ReactElement => {
  const [counter, setCounter] = useState(undefined)

  useEffect(() => {
    const fetchCounter = async () => {
      const response = await fetch('https://europe-west1-sigma-tractor-429314-n0.cloudfunctions.net/simplecounter')
      const jsonResponse = await response.json()
      const { counter } = jsonResponse
      setCounter(counter)
    }

    fetchCounter()

    const intervalId = setInterval(() => {
      fetchCounter()
    }, 5000)

    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [])

  const incrementCounter = async () => {
    const response = await fetch('https://europe-west1-sigma-tractor-429314-n0.cloudfunctions.net/incrementsimplecounter')
    const jsonResponse = await response.json()
    const { counter } = jsonResponse
    setCounter(counter)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="60vh"
    >
      <Box 
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection={{xs: 'column', sm: 'column', md: 'row'}}
        marginBottom={{xs: '15px', sm: '30px'}}
        gap={{xs: '10px', sm: '20px'}}
      >
        <Typography fontWeight='bold' fontSize={{xs: '1.5rem', sm: '2rem', md: '2.5rem'}}>This button has been clicked</Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '4rem',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            MozBackgroundClip: 'text',
            MozTextFillColor: 'transparent',
            filter: 'drop-shadow(2px 2px 2px #222)',
            textAlign: 'center'
          }}
        >
          {counter}
        </Typography>
        <Typography fontWeight='bold' fontSize={{xs: '1.5rem', sm: '2rem', md: '2.5rem'}}>times</Typography>
      </Box>
      <Button 
        variant="contained"
        onClick={incrementCounter}
        size='large'
      >
        Signifier
      </Button>
    </Box>
  )
}

export default GlobalButton