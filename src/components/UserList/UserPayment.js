import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import Navbar from '../Navbar';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Box from "@mui/material/Box";
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import Typography from "@mui/material/Typography";
import { ProductService } from '../../service/ProductService';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function UserPayment() {

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //states
    const [products, setProducts] = useState(null);
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(null)
    const [selectedPaymentModes, setSelectedPaymentModes] = useState(null);
    const paymentModes = [
        { name: 'Cash', },
        { name: 'Bank Transfer' }
    ];

    useEffect(() => {
        ProductService
            .getProducts()
            .then((data) => setProducts(data));
    }, []);

    const mobileBodyTemplate = (rowData) => {
        return (rowData.Mobile);
    };

    const regitrationdatetypeBodyTemplate = (rowData) => {
        return (rowData.Regitrsationdate);
    };

    const header = (
        <div className="header">
            <h4 className="m-0">Manage user payment summary</h4>
        </div>
    );

    const FormLabel = ({ value, html }) => <label htmlFor={html} className="font-bold block mb-2">{value}</label>

    const AddPayment = () => (
        <Box sx={{
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            flexDirection: 'column',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        }}>
            <div className="flex-auto mb-2">
                <FormLabel html="name" value="Amount" />
                <InputText
                    id="name"
                    required
                    autoFocus
                    value={amount}
                    variant='outlined'
                    placeholder='Add amount'
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div className="flex-auto mb-2">
                <FormLabel html="name" value="Select payment mode" />
                <Dropdown
                    options={paymentModes}
                    optionLabel="name"
                    value={selectedPaymentModes}
                    placeholder="Select mode"
                    className="w-full md:w-14rem"
                    onChange={(e) => setSelectedPaymentModes(e.value)}
                />
            </div>
            <div className="flex-auto mb-2">
                <FormLabel html="name" value="Date" />
                <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon placeholder='Add date' />
            </div>
            <Button
                label="Add payment"
                severity="success"
                onClick={() => { }}
                style={{ marginTop: '10px' }}
            />
        </Box>
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
                    <div className="card">
                        <AddPayment />
                        <DataTable
                            ref={dt}
                            paginator
                            rows={10}
                            dataKey="id"
                            header={header}
                            value={products}
                            rowsPerPageOptions={[5, 10, 25]}
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} payments"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        >
                            <Column field="id" header="Sr no." sortable style={{ minWidth: '4rem' }} />
                            <Column field="id" header="Amount" style={{ minWidth: '4rem' }} />
                            <Column field="Voucherno" header="Mode of payment" body={regitrationdatetypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column field="Seller" header="Date" body={mobileBodyTemplate} />
                            <Column field="Approved" header="Added date" body={regitrationdatetypeBodyTemplate} style={{ minWidth: '8rem' }} />
                        </DataTable>
                    </div>
                </div>
            </Typography>
        </Box>
    );
}
