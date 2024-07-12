import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { FC, ReactElement, useState } from 'react'
import ParamTable from './ParamTable'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Parameter, RequestData, RESTMethod } from '../../types/APIInterfaces';

interface Props {
    sendRequest: (data: RequestData) => void
}

const Request: FC<Props> = ({ sendRequest }: Props): ReactElement => {
    const [method, setMethod] = useState<RESTMethod>('GET')
    const [url, setUrl] = useState('')

    const [headers, setHeaders] = useState<Parameter[]>([{ key: '', value: '' }]);
    const [showHeaders, setShowHeaders] = useState(false);

    const [queries, setQueries] = useState<Parameter[]>([{ key: '', value: '' }]);
    const [showQueries, setShowQueries] = useState(false);

    return (
        <>

            <Box display='flex'>
                <FormControl style={{ minWidth: 120 }}>
                    <InputLabel id="select-REST-method-label">REST Method</InputLabel>
                    <Select
                    labelId="select-REST-method-label"
                    id="select-REST-method"
                    value={method}
                    label="REST Method"
                    onChange={(event) => setMethod(event.target.value as RESTMethod)}
                    >
                        <MenuItem value={'GET'}>GET</MenuItem>
                        <MenuItem value={'POST'}>POST</MenuItem>
                        <MenuItem value={'PUT'}>PUT</MenuItem>
                        <MenuItem value={'DELETE'}>DELETE</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField
                    id='URL-Input'
                    label='URL'
                    variant='outlined'
                    style={{ flexGrow: 1 }}
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                />

                <Button 
                    variant='contained' 
                    color='secondary' 
                    style={{ minWidth: 120 }}
                    onClick={() => sendRequest({
                        method, 
                        url,
                        headers,
                        queries,
                        body: ''
                    })}
                >Send</Button>
            </Box>

            <Box display='flex' flexDirection='column' alignItems='start'>
                <Button
                    sx={{marginTop: '40px'}}
                    onClick={() => setShowHeaders(!showHeaders)}
                    endIcon={showHeaders ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    color='secondary'
                >
                    Header Parameters
                </Button>
                {showHeaders && <ParamTable params={headers} setParams={setHeaders} />}

                <Button
                    sx={{marginTop: '40px'}}
                    onClick={() => setShowQueries(!showQueries)}
                    endIcon={showQueries ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    color='secondary'
                >
                    Query Parameters
                </Button>
                {showQueries && <ParamTable params={queries} setParams={setQueries} />}
            </Box> 
        </>
    )
}

export default Request