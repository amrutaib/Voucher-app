import React, { useEffect, useRef, useState } from 'react';
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
import { BASE_URL } from '../../config/api';
import PendingVouchers from './PendingVouchers';
import ApprovedVouchers from './ApprovedVouchers';
import { getCookie } from '../../components/common/utils';

export default function Voucher() {

    const toast = useRef(null)

    const [count, setCount] = useState({
        pending: null,
        approved: null
    })
    const [loading, setLoading] = useState(true)
    
    const NullView = () => (
        <Box
          sx={{
            display: "flex",
            height: "70vh",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* <FaExclamationTriangle size={140} elevation={3} /> */}
          <Typography variant="h6" component="div" sx={{ mt: 3 }}>
            No vouchers available
          </Typography>
          <Typography variant="body2" color="textSecondary" my={2}>
            No vouchers have been created yet
          </Typography>
        </Box>
      );
    

    async function fetchVoucherCount() {

        const TOKEN = getCookie('token')
        const clientId = getCookie('clientId')
        const URL = `${BASE_URL}/voucher/vouchercount/`

        fetch(URL, {
            method: "get",
            headers: {
                'clientid': clientId,
                'Authorization': TOKEN,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCount({
                    pending: data.Pendingcount,
                    approved: data.Approvedcount
                });
            })
            .catch((err) =>
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: err.message,
                    life: 3000,
                })
            )
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchVoucherCount()
    }, [])

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
                            <Typography variant='subtitle1'>Pending({count.pending})</Typography>
                        </Tab>
                        <Tab value={2} className='tabview'>
                            <Typography variant='subtitle1' sx={{ marginLeft: '10px' }}>Approved({count.approved})</Typography>
                        </Tab>
                    </TabsList>

                    <TabPanel value={1}>
                        {count.pending === 0 ? <NullView/> :
                        <PendingVouchers />
}
                    </TabPanel>
                    <TabPanel value={2}>
                        {
                            count.approved === 0 ? <NullView/> :
                        
                        <ApprovedVouchers />
}
                    </TabPanel>
                </Tabs>
            </Typography>
        </Box>
    );
}
