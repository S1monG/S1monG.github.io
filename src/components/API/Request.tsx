import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { FC, ReactElement, useState } from 'react'
import ParamTable, { Param } from './ParamTable';

export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Props {
    sendRequest: (method: RESTMethod, url: string) => void
}

const Request: FC<Props> = ({ sendRequest }: Props): ReactElement => {
    const [method, setMethod] = useState<RESTMethod>('GET')
    const [url, setUrl] = useState('')

    const [headerParams, setHeaderParams] = useState<Param[]>([{ key: '', value: '' }]);
    const [queryParams, setQueryParams] = useState<Param[]>([{ key: '', value: '' }]);

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

            {/* Make titles clickable which reveals the Paramtable */}
            <h2>Header Parameters</h2>
            <ParamTable params={headerParams} setParams={setHeaderParams} />
            <h2>Query Parameters</h2>
            <ParamTable params={queryParams} setParams={setQueryParams} />
        </>
    )
}

export default Request