import { Box, Container, Divider } from '@mui/material'
import { FC, ReactElement, useState } from 'react'
import Request from '../components/API/Request'
import { RequestData } from '../types/APIInterfaces'

const sendRequest = async (data: RequestData) => {
  const headers = new Headers()
  data.headers.forEach(header => header.key && headers.append(header.key, header.value))

  const query = new URLSearchParams()
  data.queries.forEach(param => param.key && query.append(param.key, param.value))

  try {
    const response = await fetch(`${data.url}?${query.toString()}`, 
      { 
        method: data.method,
        headers,
      })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const jsonResponse = await response.json()
    return jsonResponse
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'An unknown error occurred'}
  }
}

const API: FC = (): ReactElement => {
  const [responseData, setResponseData] = useState<string | undefined>(undefined)

  const handleSendRequest = async (data: RequestData) => {
    const response = await sendRequest(data)
    setResponseData(response)
  }

  return (
    <Box display='flex' width='100%' height='100vh'>
      <Container sx={{ width: '65%' }}>
        <Request sendRequest={handleSendRequest}/>
      </Container>

      <Divider orientation='vertical' flexItem />

      <Container sx={{ width: '35%' }}>
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      </Container>
    </Box>
  )
}

export default API