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
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { BASE_URL, TOKEN } from '../../config/api';
import { PiWarningOctagonThin } from "react-icons/pi";
import { ActionBody, Header } from '../../components/index';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//icons 
import ReceiptIcon from '@mui/icons-material/Receipt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function PendingVouchers() {

    //ref
    const dt = useRef(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    //states
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    async function fetchVouchers() {
        const id = localStorage.getItem('clientId')
        const URL = `${BASE_URL}/voucher/pendingvoucherlist/`
        try {
            const response = await axios.get(URL, {
                headers: {
                    'clientid': id,
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data, "DATA")
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
                    label="Export CSV"
                    className='button'
                    onClick={() => { }}
                />
            </div>
        )
    };

    const actionBodyTemplate = (data) => {
        return (
            <>
                <ActionBody
                    arialabel='edit'
                    icon={<ModeEditIcon />}
                    tooltip='Edit voucher'
                    handleClick={() => { navigate(`/editVoucher/${data.voucher_no}`) }}
                />
                <ActionBody
                    arialabel='view'
                    icon={<ReceiptIcon />}
                    tooltip='View voucher'
                    handleClick={() => { }}
                />
                <ActionBody
                    color={"error"}
                    arialabel='delete'
                    tooltip='Delete voucher'
                    icon={<DeleteOutlineOutlinedIcon />}
                    handleClick={() => setDeleteProductDialog(true)}
                />
            </>
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

    const updatedPendingVouchers = []
    vouchers.map((item, index) => {
        updatedPendingVouchers.push({ sr: index + 1, ...item });
    });

    return (
        <Box>
            <div>
                <Toast ref={toast} />
                {vouchers.length > 0 && <Export />}
                <div className="card">
                    <DataTable
                        ref={dt}
                        paginator
                        rows={10}
                        dataKey="id"
                        globalFilter={globalFilter}
                        value={updatedPendingVouchers}
                        rowsPerPageOptions={[5, 10, 25]}
                        header={<Header title={'Manage pending vouchers'} onSearch={handleSearch} />}
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vouchers"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    >
                        <Column field="sr" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                        <Column field="voucher_no" header="Voucher No" style={{ minWidth: '8rem' }} />
                        <Column field="userName" header="Name" style={{ minWidth: '8rem' }} />
                        <Column field="Shipper" header="Shipper" />
                        <Column field="destination" header="Destination" style={{ minWidth: '4rem' }} />
                        <Column field="job_no" header="Job No" style={{ minWidth: '4rem' }} />
                        <Column field="total_amount" header="Requested amount" style={{ minWidth: '4rem' }} />
                        <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '8rem' }} />
                    </DataTable>
                </div>
                <DeleteVoucherDialog />
            </div>
        </Box>
    );
}
