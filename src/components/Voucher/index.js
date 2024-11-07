import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Tab } from '@mui/base/Tab';
import Box from "@mui/material/Box";
import { Tabs } from '@mui/base/Tabs';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import Typography from "@mui/material/Typography";
import { DataTable } from 'primereact/datatable';
import { ProductService } from '../../service/ProductService';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function Voucher() {

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

    const Export = () => {
        return (
            <div className='addbtn'>
                <Button
                    label="Export Excel"
                    severity="secondary"
                    onClick={() => { }}
                />
            </div>
        )
    };

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

    const actionBodyTemplate = () => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" tooltip='Edit voucher' tooltipOptions={{ position: 'bottom' }} />
                <Button icon="pi pi-receipt" rounded outlined className="mr-2" tooltip='View voucher' tooltipOptions={{ position: 'bottom' }} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" tooltip='Delete voucher' tooltipOptions={{ position: 'bottom' }} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage vouchers</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );

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
                        <Tab value={1} className='tabview'><Typography variant='subtitle1'>Pending(36)</Typography></Tab>
                        <Tab value={2} className='tabview'><Typography variant='subtitle1' sx={{ marginLeft: '10px' }}>Approved(12)</Typography></Tab>
                    </TabsList>

                    <TabPanel value={1}>
                        <div>
                            <Toast ref={toast} />
                            <Export />
                            <div className="card">
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
                                    <Column field="id" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                                    <Column field="Voucherno" body={mobileBodyTemplate} header="Voucher No" style={{ minWidth: '8rem' }} />
                                    <Column field="name" header="Name" style={{ minWidth: '8rem' }} />
                                    <Column field="Seller" header="Seller" body={mobileBodyTemplate} />
                                    <Column field="S/B" header="S/b" body={emailtypeBodyTemplate} style={{ minWidth: '8rem' }} />
                                    <Column field="Job No" header="User type" body={usertypeBodyTemplate} style={{ minWidth: '8rem' }} />
                                    <Column field="Approved" header="Approved amount" body={balancetypeBodyTemplate} style={{ minWidth: '8rem' }} />
                                    <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />
                                </DataTable>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={2}>
                        <div>
                            <Toast ref={toast} />
                            <Export />
                            <div className="card">
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
                                    <Column field="id" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                                    <Column field="Voucherno" body={mobileBodyTemplate} header="Voucher No" style={{ minWidth: '8rem' }} />
                                    <Column field="name" header="Name" style={{ minWidth: '8rem' }} />
                                    <Column field="Seller" header="Seller" body={mobileBodyTemplate} />
                                    <Column field="S/B" header="S/b" body={emailtypeBodyTemplate} style={{ minWidth: '8rem' }} />
                                    <Column field="Job No" header="User type" body={usertypeBodyTemplate} style={{ minWidth: '8rem' }} />
                                    <Column field="Approved" header="Approved amount" body={balancetypeBodyTemplate} style={{ minWidth: '8rem' }} />
                                    <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />
                                </DataTable>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </Typography>
        </Box>
    );
}
