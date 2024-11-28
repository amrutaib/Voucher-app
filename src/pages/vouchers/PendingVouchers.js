import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Box from "@mui/material/Box";
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { Header } from '../../components/index';
import { DataTable } from 'primereact/datatable';
import { BASE_URL, TOKEN } from '../../config/api';
import { PiWarningOctagonThin } from "react-icons/pi";
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function PendingVouchers() {

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //states
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    async function fetchVouchers() {
        const id = localStorage.getItem('clientId')
        const URL = `${BASE_URL}/voucher/${id}`
        try {
            const response = await axios.get(URL, {
                headers: {
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            setVouchers(response.data);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVouchers();
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

    const actionBodyTemplate = () => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" tooltip='Edit voucher' tooltipOptions={{ position: 'bottom' }} />
                <Button icon="pi pi-receipt" rounded outlined className="mr-2" tooltip='View voucher' tooltipOptions={{ position: 'bottom' }} />
                <Button
                    icon="pi pi-trash"
                    rounded outlined
                    severity="danger"
                    tooltip='Delete voucher'
                    tooltipOptions={{ position: 'bottom' }}
                    onClick={() => setDeleteProductDialog(true)}
                />
            </React.Fragment>
        );
    };

    function handleSearch(searchValue) {
        setGlobalFilter(searchValue);
    }

    function hideDeleteProductDialog() {
        setDeleteProductDialog(false);
    };

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" severity='secondary' outlined onClick={hideDeleteProductDialog} />
            <Button label="OK" severity="danger" onClick={hideDeleteProductDialog} />
        </React.Fragment>
    );

    const DeleteVoucherDialog = () => (
        <Dialog
            modal
            style={{ width: '32rem' }}
            visible={deleteProductDialog}
            onHide={hideDeleteProductDialog}
            footer={deleteProductDialogFooter}
            breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        >
            <div className="delete-dialog">
                <PiWarningOctagonThin size={80} elevation={3} color='#CC0000' />
                <h3>Are you sure?</h3>
                <span>Once deleted, you will not be able to recover record!</span>
            </div>
        </Dialog>
    )

    return (
        <Box>
            <div>
                <Toast ref={toast} />
                <Export />
                <div className="card">
                    <DataTable
                        ref={dt}
                        paginator
                        rows={10}
                        dataKey="id"
                        value={vouchers}
                        globalFilter={globalFilter}
                        rowsPerPageOptions={[5, 10, 25]}
                        header={<Header title={'Manage pending vouchers'} onSearch={handleSearch} />}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vouchers"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    >
                        <Column field="voucherId" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                        <Column field="voucher_no" header="Voucher No" style={{ minWidth: '8rem' }} />
                        <Column field="userName" header="Name" style={{ minWidth: '8rem' }} />
                        <Column field="seller" header="Seller" />
                        <Column field="sb_no" header="S/b" style={{ minWidth: '4rem' }} />
                        <Column field="job_no" header="Job No" style={{ minWidth: '4rem' }} />
                        <Column field="approvedAmnt" header="Approved amount" style={{ minWidth: '4rem' }} />
                        <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '8rem' }} />
                    </DataTable>
                </div>
                <DeleteVoucherDialog />
            </div>
        </Box>
    );
}
