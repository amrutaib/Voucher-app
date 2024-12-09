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

export default function Voucher() {

    const toast = useRef(null)

    const [count, setCount] = useState({
        pending: null,
        approved: null
    })
    const [loading, setLoading] = useState(true)

    async function fetchVoucherCount() {

        const TOKEN = localStorage.getItem('token')
        const clientId = localStorage.getItem('clientId')
        const URL = `${BASE_URL}/voucher/vouchercount/${clientId}`

        fetch(URL, {
            method: "get",
            headers: {
                Authorization: TOKEN,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
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
