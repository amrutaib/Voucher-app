import React, { useState, useEffect, useRef } from 'react';
import "../style.css";
import axios from 'axios';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import { DataTable } from 'primereact/datatable';
import { BASE_URL, TOKEN } from '../../config/api';
import { InputSwitch } from 'primereact/inputswitch';
import { FaExclamationTriangle } from "react-icons/fa";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Navbar, ActionBody, Header, Loader } from '../../components/index';
//icons 
import ReceiptIcon from '@mui/icons-material/Receipt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export default function Userlist() {
    const navigate = useNavigate();

    // refs
    const dt = useRef(null);
    const toast = useRef(null);

    // states
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [statusMap, setStatusMap] = useState({}); // State for storing individual user statuses

    // fetch users data
    async function fetchUsers() {
        const clientId = localStorage.getItem("clientId");
        const URL = `${BASE_URL}/allUsers/`;
        try {
            const response = await axios.get(URL, {
                headers: {
                    'clientid': clientId,
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                },
            });
            const result = response.data;
            setUsers(result);
            // Initialize statusMap with user statuses
            const initialStatusMap = result.reduce((acc, user) => {
                acc[user.userId] = user.userStatus === "1"; // Assuming "1" means active, "0" means inactive
                return acc;
            }, {});
            setStatusMap(initialStatusMap);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } finally {
            setLoading(false);
        }
    }

    // update user status
    async function updateUserStatus(id, status) {
        const body = JSON.stringify({ userstatus: !status });
        console.log(body)
        const URL = `${BASE_URL}/userdata/userstatus/`;
        const headers = {
            'userid': id,
            'Authorization': TOKEN,
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.put(URL, body, { headers });
            const data = response.data;
            if (data.status === 200) {
              toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "User status updated successfully",
                life: 2000,
              });
              fetchUsers();
            } else {
              toast.current.show({
                severity: "error",
                summary: "Error",
                detail: data.message || "Failed to update user status",
                life: 3000,
              });
            }
          } catch (error) {
            console.error('Error updating user status:', error);
            toast.current.show({ severity: "error", summary: "Error", detail: error.message || "An error occurred", life: 3000 });
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const userStatus = ({ rowData }) => {
        const id = rowData.userId;
        const currentStatus = statusMap[id];
        console.log(id, currentStatus);

        const handleToggleChange = async () => {
            const newStatus = !currentStatus;

            setStatusMap(prevState => ({
                ...prevState,
                [id]: newStatus
            }));

            try {
                await updateUserStatus(id, currentStatus); 
            } catch (error) {
                setStatusMap(prevState => ({
                    ...prevState,
                    [id]: currentStatus
                }));
            }
        };

        return (
            <InputSwitch
                tooltip="User Status"
                checked={currentStatus} 
                tooltipOptions={{ position: 'bottom' }}
                onChange={handleToggleChange}
            />
        );
    };

    // Action buttons for each user
    const actionBodyTemplate = (data) => {
        return (
            <>
                <ActionBody
                    arialabel="vouchers"
                    icon={<ReceiptIcon />}
                    tooltip="View Vouchers"
                    handleClick={() => navigate(`/uservouchers/${data.userId}`, {
                        state: { id: data.userId, name: data.userName }
                    })}
                />
                <ActionBody
                    arialabel="payment"
                    icon={<RequestQuoteIcon />}
                    tooltip="Payment Summary"
                    handleClick={() => navigate('/userpayment', {
                        state: { id: data.userId, name: data.userName }
                    })}
                />
                {data.userStatus === "1" && (
                    <ActionBody
                        arialabel="edit"
                        icon={<ModeEditIcon />}
                        tooltip="Edit User"
                        handleClick={() => navigate(`/editUser/${data.userId}`)}
                    />
                )}
            </>
        );
    };

    // Add New User button
    const AddNewUser = () => (
        <div className="addbtn">
            <Button
                label="Add User"
                className="button"
                onClick={() => navigate('/adduser')}
            />
        </div>
    );

    // Null state when no users are available
    const NullComponent = () => {
        return (
            <Box sx={{
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <FaExclamationTriangle size={140} />
                <Typography variant="h6" sx={{ mt: 3 }}>
                    No Users Available
                </Typography>
                <Typography variant="body2" color="textSecondary" my={2}>
                    No users have been created yet, Click on the add button to create a new user.
                </Typography>
                <AddNewUser />
            </Box>
        );
    };

    // Search functionality
    function handleSearch(searchValue) {
        setGlobalFilter(searchValue);
    }

    const updatedUsers = [];
    users.map((item, index) => {
        updatedUsers.push({ sr: index + 1, ...item });
    });

    return (
        <Box sx={{ p: 3, mt: 10, flexGrow: 1, display: 'flex' }}>
            <Navbar HeaderTitle="User Management" />
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
                                    resizableColumns
                                    value={updatedUsers}
                                    globalFilter={globalFilter}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    header={<Header title={'Manage users'} onSearch={handleSearch} />}
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                >
                                    <Column field="sr" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                                    <Column field="userName" header="Name" style={{ minWidth: '8rem' }} />
                                    <Column field="Mobile" header="Mobile" />
                                    <Column field="email" header="Email" style={{ minWidth: '8rem' }} />
                                    <Column field="registration_date" header="Registration Date" style={{ minWidth: '8rem' }} />
                                    <Column field="Userstatus" header="User Status" body={(data) => userStatus({ rowData: data })} style={{ minWidth: '6rem' }} />
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
