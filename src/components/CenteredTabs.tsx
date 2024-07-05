import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

const CenteredTabs: FC = (): ReactElement => {
    const [tab, setTab] = useState(0)
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    }

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs 
                value={tab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary" 
                centered
            >
                <Tab label="Me" to="/" component={Link}/>
                <Tab label="API Platform" to="/api" component={Link} />
                <Tab label="to be continued" to="/cache" component={Link} disabled />
                <Tab label="funky behavior" to="/funky" component={Link} />
            </Tabs>
        </Box>
    
    )
}

export default CenteredTabs