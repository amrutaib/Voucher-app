import React, { useState, useEffect, useRef } from 'react';
import '../style.css';
import axios from 'axios';
import 'primeflex/primeflex.css';
import { format } from 'date-fns';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { useLocation } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { BASE_URL, TOKEN } from '../../config/api';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Navbar, Loader, Header } from '../../components/index';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Box, Typography, FormLabel, Stack, FormControl } from '@mui/material';

export default function UserPayment() {

    //client ID
    const clientId = localStorage.getItem('clientId')

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
    const [globalFilter, setGlobalFilter] = useState(null);
    const [paymentSummary, setPaymentSummary] = useState([])
    const [selectedPaymentModes, setSelectedPaymentModes] = useState(null);
    const paymentModes = [
        { name: 'Cash', },
        { name: 'Bank Transfer' }
    ];

    // Error states for form fields
    const [amountError, setAmountError] = useState('');
    const [paymentModeError, setPaymentModeError] = useState('');
    const [dateError, setDateError] = useState('');

    // Fetch user payment summary
    const fetchUserPaymentSummary = async () => {
        try {
            const URL = `${BASE_URL}/payment/userpayment/`
            const response = await axios.get(URL, {
                headers: {
                    'userid': id,
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data)
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

    // Submit payment form
    const onSubmitPayment = async (e) => {
        e.preventDefault();

        let valid = true;
        const URL = `${BASE_URL}/payment`;

        // Clear previous errors
        setAmountError('');
        setPaymentModeError('');
        setDateError('');

        // Validation checks
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setAmountError('Please enter a valid amount.');
            valid = false;
        }
        if (!selectedPaymentModes) {
            setPaymentModeError('Please select a payment mode.');
            valid = false;
        }
        if (!date) {
            setDateError('Please select a date.');
            valid = false;
        }

        // Proceed if valid
        if (valid) {
            const formattedDate = format(date, 'dd-MM-yyyy');
            const requestBody = JSON.stringify({
                amount: amount,
                userId: id,
                clientId: clientId,
                paymentAdddate: formattedDate,
                paymentMode: selectedPaymentModes.name
            });

            try {
                const response = await fetch(`${BASE_URL}/payment/userpayment/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': TOKEN,
                        'Content-Type': 'application/json',
                    },
                    body: requestBody
                });
                const result = await response.json();
                if (result.status === 1) {
                    toast.current.show({ severity: 'success', summary: 'Success', detail: result.message, life: 2000 });
                    fetchUserPaymentSummary();
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 2000 });
                }
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 2000 });
            } finally {
                // Reset the form
                setAmount('');
                setSelectedPaymentModes(null);
                setDate(null);
            }
        }
    };

    // Handlers to clear errors on value change
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        if (e.target.value && !isNaN(e.target.value) && parseFloat(e.target.value) > 0) {
            setAmountError('');
        }
    };

    const handlePaymentModeChange = (e) => {
        setSelectedPaymentModes(e.value);
        if (e.value) {
            setPaymentModeError('');
        }
    };

    const handleDateChange = (e) => {
        setDate(e.value);
        if (e.value) {
            setDateError('');
        }
    };


    const Label = ({ value, html }) => <FormLabel htmlFor={html} required className='font-bold mb-2'>{value}</FormLabel>


    function handleSearch(searchValue) {
        setGlobalFilter(searchValue);
    }

    const Export = () => (
        <div className='addbtn'>
            <Button
                label="Export CSV"
                className='button'
                onClick={() => { }}
            />
        </div>
    )

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

                    {/* Amount Field */}
                    <FormControl fullWidth error={!!amountError}>
                        <Label html="name" value="Amount" />
                        <InputText
                            value={amount}
                            placeholder="Enter amount"
                            onChange={handleAmountChange}
                        />
                        {amountError && <span style={{ color: 'red', marginTop: 10 }}>{amountError}</span>}
                    </FormControl>

                    {/* Payment Modes */}
                    <FormControl fullWidth error={!!paymentModeError}>
                        <Label html="name" value="Select payment mode" />
                        <Dropdown
                            optionLabel="name"
                            options={paymentModes}
                            value={selectedPaymentModes}
                            placeholder="Select payment mode"
                            onChange={handlePaymentModeChange}
                        />
                        {paymentModeError && <span style={{ color: 'red', marginTop: 10 }}>{paymentModeError}</span>}
                    </FormControl>

                    {/* Date Field */}
                    <FormControl fullWidth error={!!dateError}>
                        <Label html="date" value="Date" />
                        <Calendar
                            showIcon
                            value={date}
                            placeholder="Add date"
                            onChange={handleDateChange}
                        />
                        {dateError && <span style={{ color: 'red', marginTop: 10 }}>{dateError}</span>}
                    </FormControl>
                </Stack>

                <Button label="Add Payment" type="submit" className="button" />
            </Box>
        </form>
    )

    const updatedPaymentSummary = []
    paymentSummary.map((item, index) => {
        paymentSummary.push({ sr: index + 1, ...item });
    });

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
                                <>
                                    <Export />

                                    <DataTable
                                        ref={dt}
                                        paginator
                                        rows={10}
                                        dataKey="id"
                                        value={updatedPaymentSummary}
                                        globalFilter={globalFilter}
                                        rowsPerPageOptions={[5, 10, 25]}
                                        header={<Header title={`Manage ${name}'s payment summary`} onSearch={handleSearch} />}
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} payments"
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    >
                                        <Column field="sr" header="Sr no." sortable style={{ minWidth: '4rem' }} />
                                        <Column field="amount" header="Amount" style={{ minWidth: '4rem' }} />
                                        <Column field="PaymentMode" header="Mode of payment" style={{ minWidth: '8rem' }} />
                                        <Column field="PaymentDate" header="Date" />
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
