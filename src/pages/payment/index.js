import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Box } from "@mui/material";
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.css';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import Typography from "@mui/material/Typography";
import { FaExclamationTriangle } from 'react-icons/fa';
import { Navbar, Loader } from '../../components/index';
import { api_routes, BASE_URL, TOKEN } from '../../config/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function Payment() {

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //states 
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [paymentSummary, setPaymentSummary] = useState([])

    const fetchUserPaymentSummary = async () => {
        try {
            const URL = `${BASE_URL}${api_routes.add_user_payment}`
            const response = await axios.get(URL, {
                headers: {
                    'Authorization': TOKEN,
                    "ngrok-skip-browser-warning": "69420",
                    'Content-Type': 'application/json',
                },
            });
            setPaymentSummary(response.data);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserPaymentSummary();
    }, []);

    const Export = () => (
        <div className='addbtn'>
            <Button
                label="Export Excel"
                severity="secondary"
                onClick={() => { }}
            />
        </div>
    )

    const header = (
        <div className="header">
            <h4 className="m-0">Manage Payments</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search Users" />
            </IconField>
        </div>
    );

    const NullComponent = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70vh'
                }}
            >
                <FaExclamationTriangle size={140} elevation={3} />
                <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                    Sorry, we couldnt find any payment summary
                </Typography>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                p: 3,
                mt: 10,
                flexGrow: 1,
                display: 'flex'
            }}
        >
            <Navbar HeaderTitle='User Payment Summary' />

            <Typography variant="body1" gutterBottom sx={{ width: '100vw' }}>
                <div>
                    <Toast ref={toast} />
                    <div className="card">
                        {
                            loading ? (
                                <Loader />
                            ) : paymentSummary.length < 1 ? (
                                <NullComponent />
                            ) : (
                                <>
                                    <Export />
                                    <DataTable
                                        ref={dt}
                                        paginator
                                        rows={10}
                                        dataKey="id"
                                        header={header}
                                        value={paymentSummary}
                                        globalFilter={globalFilter}
                                        rowsPerPageOptions={[5, 10, 25]}
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} payments"
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    >
                                        <Column field="paymentId" header="Sr no." sortable style={{ minWidth: '4rem' }} />
                                        <Column field="userName" header="Username" style={{ minWidth: '4rem' }} />
                                        <Column field="amount" header="Amount" style={{ minWidth: '4rem' }} />
                                        <Column field="PaymentMode" header="Mode of payment" style={{ minWidth: '8rem' }} />
                                        <Column field="PaymentDate" header="Payment Date" />
                                    </DataTable>
                                </>
                            )
                        }
                    </div>
                </div>
            </Typography>
        </Box>
    );
}
