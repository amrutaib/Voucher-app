import React from 'react';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Tab } from '@mui/base/Tab';
import Box from "@mui/material/Box";
import { Tabs } from '@mui/base/Tabs';
import 'primereact/resources/primereact.css';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Navbar } from '../../components/index';
import Typography from "@mui/material/Typography";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//voucher screens
import PendingVouchers from './PendingVouchers';
import ApprovedVouchers from './ApprovedVouchers';

export default function Voucher() {
    return (
        <Box
            sx={{
                p: 3,
                mt: 10,
                flexGrow: 1,
                display: 'flex'
            }}
        >
            <Navbar />
            <Typography variant="body1" gutterBottom sx={{ width: '100vw' }}>
                <Tabs defaultValue={1}>
                    <TabsList className='tablist' style={{ padding: '10px', marginBottom: '20px', borderRadius: '10px' }}>
                        <Tab value={1} className='tabview'>
                            <Typography variant='subtitle1'>Pending(36)</Typography>
                        </Tab>
                        <Tab value={2} className='tabview'>
                            <Typography variant='subtitle1' sx={{ marginLeft: '10px' }}>Approved(12)</Typography>
                        </Tab>
                    </TabsList>

                    <TabPanel value={1}>
                        <PendingVouchers />
                    </TabPanel>
                    <TabPanel value={2}>
                        <ApprovedVouchers />
                    </TabPanel>
                </Tabs>
            </Typography>
        </Box>
    );
}
