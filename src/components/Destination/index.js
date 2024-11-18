import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import axios from 'axios';
import Navbar from '../Navbar';
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
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import Typography from "@mui/material/Typography";
import { PiWarningOctagonThin } from 'react-icons/pi';
import { BASE_URL, api_routes } from '../../config/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function Destination() {

    const navigate = useNavigate();
    const URL = `${BASE_URL}${api_routes.destination}`

    //states
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateError, setUpdateError] = useState('');
    const [destination, setDestination] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    //new destination
    const [addNewDialog, setAddNewDialog] = useState(false)
    const [addNewDestination, setAddNewDestination] = useState('')

    //update destination
    const [updateDialog, setUpdateDialog] = useState(false)
    const [updateDestination, setUpdateDestination] = useState('')

    //delete destination 
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [deleteDestinationDialog, setDeleteDestinationDialog] = useState(false)

    //ref
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        fetchDestination()
    }, [addNewDestination, selectedIndex]);

    const fetchDestination = async () => {
        try {
            const response = await axios.get(URL, {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            setDestination(response.data);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } finally {
            setLoading(false);
        }
    }

    const header = (
        <div className="header">
            <h4 className="m-0">Manage Destinations</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );

    const formActions = (data) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => {
                        setUpdateDialog(true)
                        setSelectedIndex(data)
                        setUpdateDestination(data.DestinationName)
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => {
                        setSelectedIndex(data)
                        setDeleteDestinationDialog(true)
                    }}
                />
            </React.Fragment>
        );
    };

    // add new destination 

    const AddNew = () => (
        <div className='addbtn'>
            <Button
                label="Add New"
                className='button'
                onClick={() => setAddNewDialog(true)}
            />
        </div>
    )

    const addNewDestinationFooter = (
        <React.Fragment>
            <Button
                outlined
                label="Cancel"
                severity='danger'
                onClick={() => {
                    setError('')
                    setAddNewDialog(false)
                }}
            />
            <Button label="Save" severity='success' onClick={addNewDest} />
        </React.Fragment>
    );

    async function addNewDest() {
        setError('')
        let isValid = true

        if (!addNewDestination) {
            isValid = false
            setError('Please add destination name')
        }

        if (isValid) {
            try {
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ DestinationName: addNewDestination })
                })
                const result = await response.json()
                if (result.status === 1) {
                    navigate('#')
                    toast.current.show({ severity: 'success', summary: 'Success', detail: result.message, life: 2000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 2000 });
                }
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
            } finally {
                setError('')
                setAddNewDialog(false)
                setAddNewDestination('')
            }
        }
    }

    //edit destination 

    const hideUpdateDestination = () => {
        setUpdateDialog(false);
    };

    const updateDestinationFooter = (
        <React.Fragment>
            <Button label="Cancel" severity='secondary' outlined onClick={hideUpdateDestination} />
            <Button label="Save" severity="danger" onClick={updateDest} />
        </React.Fragment>
    );

    async function updateDest() {
        setUpdateError('')
        let isValid = true

        if (!updateDestination) {
            isValid = false
            setUpdateError('Please add destination name')
        }
        if (isValid) {
            try {
                const response = await fetch(`${URL}/${selectedIndex.DestinationId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ DestinationName: updateDestination })
                })
                const result = await response.json()
                if (result.status === 1) {
                    navigate('#')
                    toast.current.show({ severity: 'success', summary: 'Success', detail: result.message, life: 2000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 2000 });
                }
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
            } finally {
                setUpdateError('')
                setSelectedIndex(null)
                setUpdateDialog(false)
                setUpdateDestination('')
            }
        }
    }

    // delete destination 

    const hideDeleteDestination = () => {
        setDeleteDestinationDialog(false);
    };

    const deleteDestinationFooter = (
        <React.Fragment>
            <Button label="Cancel" severity='secondary' outlined onClick={hideDeleteDestination} />
            <Button label="OK" severity="danger" onClick={deleteDestination} />
        </React.Fragment>
    );

    async function deleteDestination() {
        try {
            const response = await fetch(`${URL}/${selectedIndex.DestinationId}`, {
                method: 'DELETE',
            })
            const result = await response.json()
            if (result.status === 1) {
                navigate('#')
                toast.current.show({ severity: 'success', summary: 'Success', detail: result.message, life: 2000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 2000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } finally {
            setSelectedIndex(null)
            setDeleteDestinationDialog(false)
        }
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
            <Navbar HeaderTitle='Destination Management' />
            <Typography variant="body1" gutterBottom sx={{ width: '100vw' }}>
                <div>
                    <Toast ref={toast} />
                    <div className="card">
                        <AddNew />
                        <DataTable
                            ref={dt}
                            paginator
                            rows={10}
                            dataKey="id"
                            header={header}
                            value={destination}
                            globalFilter={globalFilter}
                            rowsPerPageOptions={[5, 10, 25]}
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        >
                            <Column field="DestinationId" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                            <Column field="DestinationName" header="Name" style={{ minWidth: '8rem' }} />
                            <Column header="Action" body={formActions} style={{ minWidth: '12rem' }} />
                        </DataTable>
                    </div>

                    {/* add destination dialog */}

                    <Dialog
                        modal
                        className="p-fluid"
                        visible={addNewDialog}
                        header="Add Destination"
                        style={{ width: '32rem' }}
                        footer={addNewDestinationFooter}
                        onHide={() => setAddNewDialog(false)}
                        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    >
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Destination Name
                            </label>
                            <InputText
                                id="name"
                                required
                                autoFocus
                                value={addNewDestination}
                                placeholder='Add destination name'
                                onChange={(e) => setAddNewDestination(e.target.value)}
                            />
                            {error && <Typography variant='subtitle2' mt={2} color={'red'}>{error}</Typography>}
                        </div>
                    </Dialog>

                    {/* edit destination dialog */}

                    <Dialog
                        modal
                        className="p-fluid"
                        visible={updateDialog}
                        header={'Update Destination'}
                        style={{ width: '32rem' }}
                        footer={updateDestinationFooter}
                        onHide={hideUpdateDestination}
                        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    >
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Destination Name
                            </label>
                            <InputText
                                id="name"
                                required
                                autoFocus
                                value={updateDestination}
                                placeholder='Update destination name'
                                onChange={(e) => setUpdateDestination(e.target.value)}
                            />
                            {updateError && <Typography variant='subtitle2' mt={2} color={'red'}>{updateError}</Typography>}
                        </div>
                    </Dialog>

                    {/* Delete destination dialog */}

                    <Dialog
                        modal
                        style={{ width: '32rem' }}
                        visible={deleteDestinationDialog}
                        onHide={hideDeleteDestination}
                        footer={deleteDestinationFooter}
                        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    >
                        <div className="delete-dialog">
                            <PiWarningOctagonThin size={80} elevation={3} color='#CC0000' />
                            <h3>Are you sure?</h3>
                            <span>Once deleted, you will not be able to recover record!</span>
                        </div>
                    </Dialog>
                </div>
            </Typography>
        </Box>
    );
}
