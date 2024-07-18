import {FC, ReactElement, useEffect, useState } from 'react'
import {Container, Button } from '@mui/material'



const GlobalButton: FC = (): ReactElement => {
  const [counter, setCounter] = useState(undefined)

  useEffect(() => {
    (async () => {
      const response = await fetch('https://europe-west1-sigma-tractor-429314-n0.cloudfunctions.net/simplecounter')
      const jsonResponse = await response.json()
      const { counter } = jsonResponse
      setCounter(counter)
    })()
  }, [])

  const incrementCounter = async () => {
    const response = await fetch('https://europe-west1-sigma-tractor-429314-n0.cloudfunctions.net/incrementsimplecounter')
    const jsonResponse = await response.json()
    const { counter } = jsonResponse
    setCounter(counter)
  }

  return (
    <Container>
      <Button variant="contained" onClick={incrementCounter}>{counter}</Button>
    </Container>
  )
}

export default GlobalButton