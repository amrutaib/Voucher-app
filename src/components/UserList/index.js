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
import { InputSwitch } from 'primereact/inputswitch';
import { ProductService } from '../../service/ProductService';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function Userlist() {

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //states
    const [products, setProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [userActiveStatus, setUserActiveStatus] = useState(true);

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

    const userStatusBodyTemplate = () => {
        return (
            <InputSwitch
                tooltip='User Status'
                checked={userActiveStatus}
                tooltipOptions={{ position: 'bottom' }}
                onChange={(e) => setUserActiveStatus(e.value)}
            />
        )
    };

    const actionBodyTemplate = () => {
        return (
            <React.Fragment>
                <ActionBody iconName='ticket' tooltip='View Voucher' handleClick={() => { }} />
                <ActionBody iconName='dollar' tooltip='Payment Summary' handleClick={() => { }} />
                <ActionBody iconName='pencil' tooltip='Edit User' handleClick={() => { }} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="header">
            <h4 className="m-0">Manage Users</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search Users" />
            </IconField>
        </div>
    );

    const AddNewUser = () => (
        <div className='addbtn'>
            <Button
                iconPos='right'
                label="Add User"
                icon="pi pi-plus"
                severity="success"
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
            <Navbar HeaderTitle='User Management' />
            <Typography variant="body1" gutterBottom sx={{ width: '100vw' }}>
                <div>
                    <Toast ref={toast} />
                    <div className="card">
                        <AddNewUser />
                        <DataTable
                            ref={dt}
                            paginator
                            rows={10}
                            dataKey="id"
                            header={header}
                            value={products}
                            globalFilter={globalFilter}
                            rowsPerPageOptions={[5, 10, 25]}
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        >
                            <Column field="id" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                            <Column field="name" header="Name" style={{ minWidth: '8rem' }} />
                            <Column field="Mobile" header="Mobile" body={mobileBodyTemplate} />
                            <Column field="Email" header="Email" body={emailtypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column field="Usertype" header="User type" body={usertypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column field="Balance" header="Balance" body={balancetypeBodyTemplate} sortable style={{ minWidth: '8rem' }} />
                            <Column field="Registrationdate" header="Registration Date" body={regitrationdatetypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column field="Userstatus" header="User Status" body={userStatusBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }} />
                        </DataTable>
                    </div>
                </div>
            </Typography>
        </Box>
    );
}
