import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Box from "@mui/material/Box";
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

export default function Payment() {

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

    const usertypeBodyTemplate = (rowData) => {
        return (rowData.Usertype);
    };

    const balancetypeBodyTemplate = (rowData) => {
        return (rowData.Balance);
    };

    const regitrationdatetypeBodyTemplate = (rowData) => {
        return (rowData.Regitrsationdate);
    };

    const header = (
        <div className="header">
            <h4 className="m-0">Manage Payments</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search Users" />
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
            <Navbar HeaderTitle='Payment Summary' />
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
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        >
                            <Column field="id" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                            <Column field="name" header="Name" style={{ minWidth: '4rem' }} />
                            <Column field="Amount" header="Amount" body={balancetypeBodyTemplate} sortable />
                            <Column field="Usertype" header="Mode of Payment" body={usertypeBodyTemplate} style={{ minWidth: '2rem' }} />
                            <Column field="Date" header=" Date" body={regitrationdatetypeBodyTemplate} style={{ minWidth: '4rem' }} />
                            <Column field="Added Date" header="Added Date" body={regitrationdatetypeBodyTemplate} style={{ minWidth: '5rem' }} />
                        </DataTable>
                    </div>
                </div>
            </Typography>
        </Box>
    );
}
