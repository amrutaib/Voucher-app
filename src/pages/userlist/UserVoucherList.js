import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Box from "@mui/material/Box";
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { useLocation } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import Typography from "@mui/material/Typography";
import { FaExclamationTriangle } from 'react-icons/fa';
import { Navbar, ActionBody } from '../../components/index';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function UserVoucherList() {

    //user params
    const location = useLocation();
    const { id, name } = location.state

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //states
    const [vouchers, setVouchers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    async function fetchUserVouchers() {

    }

    useEffect(() => {
        fetchUserVouchers();
    }, []);

    const actionView = () => <ActionBody iconName='receipt' tooltip='View Voucher PDF' handleClick={() => { }} />

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

    const NullView = () => (
        <Box
            sx={{
                display: 'flex',
                height: '70vh',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <FaExclamationTriangle size={140} elevation={3} />
            <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                No vouchers available
            </Typography>
            <Typography variant="body2" color="textSecondary" my={2}>
                No vouchers have been created yet for {name}
            </Typography>
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
            <Navbar HeaderTitle='User Vouchers' />
            <Typography variant="body1" gutterBottom sx={{ width: '100vw' }}>
                <div>
                    <Toast ref={toast} />
                    {vouchers.length < 1 ? <NullView /> :
                        <div className="card">
                            <Export />
                            <DataTable
                                ref={dt}
                                paginator
                                rows={10}
                                dataKey="id"
                                header={header}
                                value={vouchers}
                                globalFilter={globalFilter}
                                rowsPerPageOptions={[5, 10, 25]}
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vouchers"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            >
                                <Column field="id" header="Voucher no." style={{ minWidth: '4rem' }} />
                                <Column field="Voucherno" header="Shipper name" style={{ minWidth: '8rem' }} />
                                <Column field="Seller" header="Seller" />
                                <Column field="S/B" header="S/b" style={{ minWidth: '8rem' }} />
                                <Column field="Job No" header="Job no" style={{ minWidth: '8rem' }} />
                                <Column field="Approved" header="Approved amount" style={{ minWidth: '3rem' }} />
                                <Column field="Approved" header="Approved date" style={{ minWidth: '8rem' }} />
                                <Column field="Approved" header="Added date" style={{ minWidth: '8rem' }} />
                                <Column header="Action" body={actionView} style={{ minWidth: '3rem' }} />
                            </DataTable>
                        </div>
                    }
                </div>
            </Typography>
        </Box>
    );
}
