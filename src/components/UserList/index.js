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
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/primereact.css';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import Typography from "@mui/material/Typography";
import { InputSwitch } from 'primereact/inputswitch';
import { ProductService } from '../../service/ProductService';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function Userlist() {

    const navigate = useNavigate()

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //states
    const [products, setProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [addUserModal, setAddUserModal] = useState(false)
    const [userActiveStatus, setUserActiveStatus] = useState(true);

    //new user form states 
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [selectedUserTypes, setSelectedUserTypes] = useState(null);
    const usertypes = [
        { name: 'Import', },
        { name: 'Export' }
    ];

    const hideAdduserModal = () => {
        setAddUserModal(false)
    }

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
                <ActionBody iconName='ticket' tooltip='View Voucher' handleClick={() => navigate('/UserVoucher')} />
                <ActionBody iconName='dollar' tooltip='Payment Summary' handleClick={() => { }} />
                <ActionBody iconName='pencil' tooltip='Edit User' handleClick={() => setAddUserModal(true)} />
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
                onClick={() => setAddUserModal(true)}
            />
        </div>
    )

    const NewUserFooter = (
        <React.Fragment>
            <Button label="Cancel" color='#CC0000' outlined severity='danger' onClick={hideAdduserModal} />
            <Button label="Save" severity='success' onClick={() => { }} />
        </React.Fragment>
    );

    const FormLabel = ({ value, html }) => <label htmlFor={html} className="font-bold">{value}</label>

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
                            <Column field="Usertype" header="User type" body={usertypeBodyTemplate} style={{ minWidth: '6rem' }} />
                            <Column field="Balance" header="Balance" body={balancetypeBodyTemplate} sortable style={{ minWidth: '8rem' }} />
                            <Column field="Registrationdate" header="Registration Date" body={regitrationdatetypeBodyTemplate} style={{ minWidth: '8rem' }} />
                            <Column field="Userstatus" header="User Status" body={userStatusBodyTemplate} style={{ minWidth: '6rem' }} />
                            <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '14rem' }} />
                        </DataTable>
                    </div>
                </div>
            </Typography>

            <Dialog
                modal
                className="p-fluid"
                visible={addUserModal}
                footer={NewUserFooter}
                header="Add New User"
                onHide={hideAdduserModal}
                style={{ width: '50rem', marginTop: '20px' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            >
                <div className="field">
                    <FormLabel html="name" value="Name" />
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-user"> </InputIcon>
                        <InputText
                            id="name"
                            required
                            autoFocus
                            value={name}
                            variant='outlined'
                            placeholder='Add name'
                            onChange={(e) => setName(e.target.value)}
                            className="p-inputtext-sm"
                        />
                    </IconField>
                </div>

                <div className="field">
                    <FormLabel html="password" value="Password" />
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-lock"> </InputIcon>
                        <Password
                            required
                            autoFocus
                            toggleMask
                            id="password"
                            value={password}
                            variant='outlined'
                            placeholder='Add user password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </IconField>
                </div>
                <div className="field">
                    <FormLabel html="name" value="Mobile No." />
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-mobile"> </InputIcon>
                        <InputText
                            id="Mobile"
                            required
                            autoFocus
                            variant='outlined'
                            value={mobileNumber}
                            placeholder='Add mobile number'
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </IconField>
                </div>
                <div className="field">
                    <FormLabel html="email" value="Email" />
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-envelope"> </InputIcon>
                        <InputText
                            type='email'
                            required
                            value={email}
                            id="email"
                            variant='outlined'
                            placeholder='Add email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </IconField>
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">Select User Type</label>
                    <Dropdown
                        options={usertypes}
                        optionLabel="name"
                        value={selectedUserTypes}
                        placeholder="Select User Type"
                        className="w-full md:w-14rem"
                        onChange={(e) => setSelectedUserTypes(e.value)}
                    />
                </div>
            </Dialog>
        </Box>
    );
}
