import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import axios from 'axios';
import Loader from '../Loader';
import Navbar from '../Navbar';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { FaExclamationTriangle } from 'react-icons/fa';
import { api_routes, BASE_URL } from '../../config/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Box, Typography, FormLabel, Stack, FormControl } from '@mui/material';

export default function UserPayment() {

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //user params
    const location = useLocation();
    const { id, name } = location.state

    //states
    const [date, setDate] = useState(null);
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(true)
    const [paymentSummary, setPaymentSummary] = useState([])
    const [selectedPaymentModes, setSelectedPaymentModes] = useState(null);
    const paymentModes = [
        { name: 'Cash', },
        { name: 'Bank Transfer' }
    ];

    const fetchUserPaymentSummary = async () => {
        try {
            const URL = `${BASE_URL}${api_routes.add_user_payment}/${id}`
            const response = await axios.get(URL, {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
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

    const onSubmitPayment = (e) => {
        e.preventDefault();
    };

    const header = (
        <div className="header">
            <h4 className="m-0">Manage {name}'s payment summary</h4>
        </div>
    );

    const Label = ({ value, html }) => <FormLabel htmlFor={html} required className='font-bold mb-2'>{value}</FormLabel>

    const NullComponent = () => {
        return (
            <Box
                sx={{
                    mt: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FaExclamationTriangle size={100} elevation={3} />
                <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                    Sorry, we couldnt find any payment history for {name}
                </Typography>
            </Box>
        )
    }

    const AddPayment = () => (
        <form onSubmit={onSubmitPayment}>
            <Box
                sx={{
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    alignItems: 'center',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                }}>
                <Stack spacing={3} direction={"row"} mb={3}>

                    {/* amount */}
                    <FormControl fullWidth>
                        <Label html="name" value="Amount" />
                        <InputText
                            required
                            value={amount}
                            placeholder="Enter amount"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </FormControl>

                    {/* payemt methods */}
                    <FormControl fullWidth>
                        <Label html="name" value="Select payment mode" />
                        <Dropdown
                            optionLabel="name"
                            options={paymentModes}
                            value={selectedPaymentModes}
                            placeholder="Select payment mode"
                            onChange={(e) => setSelectedPaymentModes(e.value)}
                        />
                    </FormControl>

                    {/* date  */}
                    <FormControl fullWidth>
                        <Label html="date" value="Date" />
                        <Calendar
                            required
                            showIcon
                            value={date}
                            placeholder='Add date'
                            onChange={(e) => setDate(e.value)}
                        />
                    </FormControl>
                </Stack>
                <Button label="Add Payment" type='submit' className='button' />
            </Box>
        </form>
    )

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
                    <AddPayment />
                    <div className="card">
                        {
                            loading ? (
                                <Loader />
                            ) : paymentSummary.length < 1 ? (
                                <NullComponent />
                            ) : (
                                <DataTable
                                    ref={dt}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    header={header}
                                    value={paymentSummary}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} payments"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                >
                                    <Column field="paymentId" header="Sr no." sortable style={{ minWidth: '4rem' }} />
                                    <Column field="amount" header="Amount" style={{ minWidth: '4rem' }} />
                                    <Column field="PaymentMode" header="Mode of payment" style={{ minWidth: '8rem' }} />
                                    <Column field="PaymentDate" header="Date" />
                                </DataTable>
                            )
                        }
                    </div>
                </div>
            </Typography>
        </Box>
    );
}
