import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import "../style.css"
import axios from 'axios';
import Navbar from '../Navbar';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import ActionBody from '../ActionBody';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { BASE_URL } from '../../config/api';
import 'primereact/resources/primereact.css';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import Typography from "@mui/material/Typography";
import { InputSwitch } from 'primereact/inputswitch';
import { Box, CircularProgress } from "@mui/material";
import { FaExclamationTriangle } from "react-icons/fa";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//icons 
import ReceiptIcon from '@mui/icons-material/Receipt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export default function Userlist() {

    const navigate = useNavigate()

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //states
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [globalFilter, setGlobalFilter] = useState(null);
    const [userActiveStatus, setUserActiveStatus] = useState(true);

    async function fetchUsers() {
        try {
            const response = await axios.get(BASE_URL, {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            setUsers(response.data);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const userStatus = (rowData) => {
        const status = rowData.userStatus
        function checkStatus() {
            if (status === 'active') {
                setUserActiveStatus(true)
            }
        }
        return (
            <InputSwitch
                tooltip='User Status'
                onChange={checkStatus}
                checked={userActiveStatus}
                tooltipOptions={{ position: 'bottom' }}
            />
        )
    };

    const actionBodyTemplate = (data) => {
        return (
            <>
                <ActionBody
                    arialabel='vouchers'
                    icon={<ReceiptIcon />}
                    tooltip='View Vouchers'
                    handleClick={() => navigate('/uservouchers', {
                        state: {
                            id: data.userId,
                            name: data.userName
                        }
                    })}
                />
                <ActionBody
                    arialabel='payment'
                    icon={<RequestQuoteIcon />}
                    tooltip='Payment Summary'
                    handleClick={() => navigate('/userpayment', {
                        state: {
                            id: data.userId,
                            name: data.userName
                        }
                    })}
                />
                <ActionBody
                    arialabel='edit'
                    icon={<ModeEditIcon />}
                    tooltip='Edit User'
                    handleClick={() => navigate(`/editUser/${data.userId}`)}
                />

            </>
        );
    };

    const header = (
        <div className="header">
            <h4 className="m-0">Manage Users</h4>
            <IconField iconPosition="left" style={{ marginLeft: '20px' }}>
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search Users" />
            </IconField>
        </div>
    );

    const AddNewUser = () => (
        <div className='addbtn'>
            <Button
                label="Add User"
                className='button'
                onClick={() => navigate('/adduser')}
            />
        </div>
    )

    const Loader = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <CircularProgress />
        </div>
    )

    const NullComponent = () => {
        return (
            <Box
                sx={{
                    height: '70vh',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <FaExclamationTriangle size={140} elevation={3} />
                <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                    No Users Available
                </Typography>
                <Typography variant="body2" color="textSecondary" my={2}>
                    No users have been created yet, Click on the add button to create a new user.
                </Typography>
                <AddNewUser />
            </Box >
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
            <Navbar HeaderTitle='User Management' />
            <Typography variant="body1" gutterBottom sx={{ width: '100vw' }}>
                <div>
                    <Toast ref={toast} />
                    <div className="card">
                        {loading ? (
                            <Loader />
                        ) : users.length < 1 ? (
                            <NullComponent />
                        ) : (
                            <>
                                {users.length > 0 && <AddNewUser />}
                                <DataTable
                                    ref={dt}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    value={users}
                                    header={header}
                                    globalFilter={globalFilter}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                >
                                    <Column field="userId" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                                    <Column field="userName" header="Name" style={{ minWidth: '8rem' }} />
                                    <Column field="Mobile" header="Mobile" />
                                    <Column field="email" header="Email" style={{ minWidth: '8rem' }} />
                                    <Column field="userType" header="User type" style={{ minWidth: '6rem' }} />
                                    <Column field="registration_date" header="Registration Date" style={{ minWidth: '8rem' }} />
                                    <Column field="Userstatus" header="User Status" body={userStatus} style={{ minWidth: '6rem' }} />
                                    <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '14rem' }} />
                                </DataTable>
                            </>
                        )}
                    </div>
                </div>
            </Typography>
        </Box>
    );
}