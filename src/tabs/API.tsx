import { Box, Container, Divider } from '@mui/material';
import { FC, ReactElement, useState } from 'react';
import Request from '../components/Request';

const sendRequest = async (method: string, url: string) => {
  try {
    const response = await fetch(url, { method });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An unknown error occurred"};
  }
};

const API: FC = (): ReactElement => {
  const [responseData, setResponseData] = useState<string | undefined>(undefined);

  const handleSendRequest = async (method: string, url: string) => {
    const data = await sendRequest(method, url);
    setResponseData(data);
  };

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
  );
}

export default API