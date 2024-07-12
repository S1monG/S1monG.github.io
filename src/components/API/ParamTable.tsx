import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { FC, ReactElement } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Parameter } from '../../types/APIInterfaces';

interface Props {
    params: Parameter[]
    setParams: (params: Parameter[]) => void
}

const ParamTable: FC<Props> = ({ params, setParams}: Props): ReactElement => {

    const handleDelete = (index: number) => {
        const newParams = [...params];
        newParams.splice(index, 1);
        setParams(newParams);
    }

    const handleAdd = () => {
        const newParams = [...params];
        newParams.push({ key: '', value: '' });
        setParams(newParams);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label='Parameters table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Key</TableCell>
                            <TableCell align='left'>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {params.map((param, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id={`param-key-${index}`}
                                        variant='outlined'
                                        value={param.key}
                                        onChange={(event) => {
                                            const newParams = [...params];
                                            newParams[index].key = event.target.value;
                                            setParams(newParams);
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                            fullWidth
                                            size='small'
                                            id={`param-value-${index}`}
                                            variant='outlined'
                                            value={param.value}
                                            onChange={(event) => {
                                                const newParams = [...params];
                                                newParams[index].value = event.target.value;
                                                setParams(newParams);
                                            }}
                                    />
                                </TableCell>
                                <TableCell width='12px'>
                                    <DeleteIcon 
                                        onClick={() => handleDelete(index)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button onClick={handleAdd} color='inherit' variant='outlined' sx={{ marginX: '5px', marginY: '10px'}}>
                <AddCircleOutlineIcon fontSize='large'/>
                Add Parameter
            </Button>
        </>
    )

}

export default ParamTable