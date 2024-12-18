import React, { useState, useEffect, useRef } from 'react';
import '../style.css'
import axios from 'axios';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Box from "@mui/material/Box";
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import Typography from "@mui/material/Typography";
import { BASE_URL, TOKEN } from '../../config/api';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Navbar, Header, ActionBody } from '../../components/index';
//icons 
import ReceiptIcon from '@mui/icons-material/Receipt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function UserVoucherList() {

    //user params
    const location = useLocation();
    const { id, name } = location.state
    const navigate = useNavigate();

    //ref
    const dt = useRef(null);
    const toast = useRef(null);

    //states
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState(null);

    async function fetchUserVouchers() {
        const URL = `${BASE_URL}/voucher/uservoucherslist/`
        try {
            const response = await axios.get(URL, {
                headers: {
                    'userid': id,
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                },
            });
            const result = response.data;
            setVouchers(result);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserVouchers();
    }, []);

    const actionBodyTemplate = (data) => {
        return (
            <>
                {
                    data.voucherStatus === "Pending" && (
                        <ActionBody
                            arialabel='edit'
                            icon={<ModeEditIcon />}
                            tooltip='Edit voucher'
                            handleClick={() => { navigate(`/editVoucher/${data.voucher_no}`) }}
                        />
                    )
                }
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
                    handleClick={() => { }}
                />
            </>
        );
    };


    const Export = () => (
        <div className='addbtn'>
            <Button
                label="Export CSV"
                className='button'
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

    function handleSearch(searchValue) {
        setGlobalFilter(searchValue);
    }

    const updatedVouchers = []
    vouchers.map((item, index) => {
        updatedVouchers.push({ sr: index + 1, ...item });
    });

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
                                value={updatedVouchers}
                                globalFilter={globalFilter}
                                rowsPerPageOptions={[5, 10, 25]}
                                header={<Header title={`Manage ${name}'s vouchers`} onSearch={handleSearch} />}
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vouchers"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            >
                                <Column field="sr" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                                <Column field="voucher_no" header="Voucher No" style={{ minWidth: '8rem' }} />
                                <Column field="voucherStatus" header="Status" style={{ minWidth: '8rem' }} />
                                <Column field="seller" header="Seller" />
                                <Column field="sb_no" header="S/b" style={{ minWidth: '4rem' }} />
                                <Column field="job_no" header="Job No" style={{ minWidth: '4rem' }} />
                                <Column field="approvedAmnt" header="Approved amount" style={{ minWidth: '4rem' }} />
                                <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '8rem' }} />
                            </DataTable>
                        </div>
                    }
                </div>
            </Typography>
        </Box>
    );
}
