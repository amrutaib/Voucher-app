import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import Navbar from '../Navbar';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Box from "@mui/material/Box";
import ActionBody from './ActionBody';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import Typography from "@mui/material/Typography";
import { ProductService } from '../../service/ProductService';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function UserVoucherList() {

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //states
    const [products, setProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        ProductService
            .getProducts()
            .then((data) => setProducts(data));
    }, []);

    const mobileBodyTemplate = (rowData) => {
        return (rowData.Mobile);
    };

    const usertypeBodyTemplate = (rowData) => {
        return (rowData.Usertype);
    };

    const balancetypeBodyTemplate = (rowData) => {
        return (rowData.Balance);
    };

    const emailtypeBodyTemplate = (rowData) => {
        return (rowData.Email);
    };

    const regitrationdatetypeBodyTemplate = (rowData) => {
        return (rowData.Regitrsationdate);
    };

    const actionBodyTemplate = () => {
        return (
            <React.Fragment>
                <ActionBody iconName='receipt' tooltip='View Voucher PDF' handleClick={() => { }} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="header">
            <h4 className="m-0">Manage user vouchers</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search vouchers" />
            </IconField>
        </div>
    );

    const Export = () => (
        <div className='addbtn'>
            <Button
                label="Export Excel"
                severity="secondary"
                onClick={() => { }}
            />
        </div>
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
            <Navbar HeaderTitle='User Vouchers' />
            <Typography variant="body1" gutterBottom sx={{ width: '100vw' }}>
                <div>
                    <Toast ref={toast} />
                    <div className="card">
                        <Export />
                        <DataTable
                            ref={dt}
                            paginator
                            rows={10}
                            dataKey="id"
                            header={header}
                            value={products}
                            globalFilter={globalFilter}
                            rowsPerPageOptions={[5, 10, 25]}
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vouchers"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        >
                            <Column field="id" header="Voucher no." style={{ minWidth: '4rem' }} />
                            <Column field="Voucherno" header="Shipper name" body={regitrationdatetypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column field="Seller" header="Seller" body={mobileBodyTemplate} />
                            <Column field="S/B" header="S/b" body={emailtypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column field="Job No" header="Job no" body={usertypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column field="Approved" header="Approved amount" body={balancetypeBodyTemplate} style={{ minWidth: '3rem' }} />
                            <Column field="Approved" header="Approved date" body={regitrationdatetypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column field="Approved" header="Added date" body={regitrationdatetypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '3rem' }} />
                        </DataTable>
                    </div>
                </div>
            </Typography>
        </Box>
    );
}
