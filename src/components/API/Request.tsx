import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, Stack } from '@mui/material';
import { FC, ReactElement, useState } from 'react'
import ParamTable, { Param } from './ParamTable'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Props {
    sendRequest: (method: RESTMethod, url: string) => void
}

const Request: FC<Props> = ({ sendRequest }: Props): ReactElement => {
    const [method, setMethod] = useState<RESTMethod>('GET')
    const [url, setUrl] = useState('')

    const [headerParams, setHeaderParams] = useState<Param[]>([{ key: '', value: '' }]);
    const [showHeaderParams, setShowHeaderParams] = useState<boolean>(false);

    const [queryParams, setQueryParams] = useState<Param[]>([{ key: '', value: '' }]);
    const [showQueryParams, setShowQueryParams] = useState<boolean>(false);

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
                    onClick={() => sendRequest(method, url)}
                >Send</Button>
            </Box>

            <Box display='flex' flexDirection='column' alignItems='start'>
                <Button
                    sx={{marginTop: '40px'}}
                    onClick={() => setShowHeaderParams(!showHeaderParams)}
                    endIcon={showHeaderParams ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    color='secondary'
                >
                    Header Parameters
                </Button>
                {showHeaderParams && <ParamTable params={headerParams} setParams={setHeaderParams} />}

                <Button
                    sx={{marginTop: '40px'}}
                    onClick={() => setShowQueryParams(!showQueryParams)}
                    endIcon={showQueryParams ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    color='secondary'
                >
                    Query Parameters
                </Button>
                {showQueryParams && <ParamTable params={queryParams} setParams={setQueryParams} />}
            </Box> 
        </>
    )
}

export default Request