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
import { InputText } from 'primereact/inputtext';
import Typography from "@mui/material/Typography";
import { PiWarningOctagonThin } from 'react-icons/pi';
import { BASE_URL, api_routes, TOKEN } from '../../config/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Navbar, ActionBody, Header } from '../../components/index';
//icons  
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { getCookie } from '../../components/common/utils';

export default function Scheme() {

    const navigate = useNavigate();
    const clientId = getCookie('clientId')

    // states
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateError, setUpdateError] = useState('');
    const [scheme, setScheme] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);

    // new scheme
    const [addNewDialog, setAddNewDialog] = useState(false);
    const [addNewScheme, setAddNewScheme] = useState('');

    // update scheme
    const [updateDialog, setUpdateDialog] = useState(false);
    const [updateScheme, setUpdateScheme] = useState('');

    // delete scheme
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [deleteSchemeDialog, setDeleteSchemeDialog] = useState(false);

    // refs
    const dt = useRef(null);
    const toast = useRef(null);

    useEffect(() => {
        fetchScheme();
    }, [addNewScheme, selectedIndex]);

    const fetchScheme = async () => {
        const allSchemeUrl = `${BASE_URL}/scheme/`;
        try {
            const response = await axios.get(allSchemeUrl, {
                headers: {
                    'clientid': clientId,
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data, "SCHEME")
            setScheme(response.data);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } finally {
            setLoading(false);
        }
    }

    const formActions = (data) => {
        return (
            <>
                <ActionBody
                    arialabel='name'
                    tooltip='Edit Scheme'
                    icon={<ModeEditIcon />}
                    handleClick={() => {
                        setUpdateDialog(true);
                        setSelectedIndex(data);
                        setUpdateScheme(data.schemename);
                    }}
                />
                <ActionBody
                    color={'error'}
                    arialabel='delete'
                    tooltip='Delete Scheme'
                    icon={<DeleteIcon />}
                    handleClick={() => {
                        setSelectedIndex(data);
                        setDeleteSchemeDialog(true);
                    }}
                />
            </>
        );
    };

    // add new scheme
    const AddNew = () => (
        <div className='addbtn'>
            <Button
                label="Add New"
                className='button'
                onClick={() => setAddNewDialog(true)}
            />
        </div>
    )

    const addNewSchemeFooter = (
        <>
            <Button
                outlined
                label="Cancel"
                severity='danger'
                onClick={() => {
                    setError('');
                    setAddNewDialog(false);
                }}
            />
            <Button label="Save" severity='success' onClick={addNewSchemeFn} />
        </>
    );

    async function addNewSchemeFn() {
        const addSchemeUrl = `${BASE_URL}/scheme/`;

        setError('');
        let isValid = true;

        if (!addNewScheme) {
            isValid = false;
            setError('Please add scheme name');
        }

        if (isValid) {
            try {
                const response = await fetch(addSchemeUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': TOKEN,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ schemename: addNewScheme, clientid: clientId })
                });
                const result = await response.json();
                if (result.status === 200) {
                    navigate('#');
                    toast.current.show({ severity: 'success', summary: 'Success', detail: result.message, life: 2000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 2000 });
                }
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
            } finally {
                setError('');
                setAddNewDialog(false);
                setAddNewScheme('');
            }
        }
    }

    // edit scheme
    const hideUpdateScheme = () => {
        setUpdateDialog(false);
    };

    const updateSchemeFooter = (
        <React.Fragment>
            <Button label="Cancel" severity='secondary' outlined onClick={hideUpdateScheme} />
            <Button label="Save" severity="danger" onClick={updateSchemeFn} />
        </React.Fragment>
    );

    async function updateSchemeFn() {
        setUpdateError('');
        let isValid = true;

        if (!updateScheme) {
            isValid = false;
            setUpdateError('Please add scheme name');
        }
        if (isValid) {
            try {
                const response = await fetch(`${BASE_URL}/scheme/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': TOKEN,
                        'Content-Type': 'application/json',
                        'schemeid': selectedIndex.schemeid,
                    },
                    body: JSON.stringify({ schemename: updateScheme, clientid: clientId })
                });
                const result = await response.json();
                if (result.status === 1) {
                    navigate('#');
                    toast.current.show({ severity: 'success', summary: 'Success', detail: result.message, life: 2000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 2000 });
                }
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
            } finally {
                setUpdateError('');
                setSelectedIndex(null);
                setUpdateDialog(false);
                setUpdateScheme('');
            }
        }
    }

    // delete scheme
    const hideDeleteScheme = () => {
        setDeleteSchemeDialog(false);
    };

    const deleteSchemeFooter = (
        <React.Fragment>
            <Button label="Cancel" severity='secondary' outlined onClick={hideDeleteScheme} />
            <Button label="OK" severity="danger" onClick={deleteSchemeFn} />
        </React.Fragment>
    );

    async function deleteSchemeFn() {
        try {
            const response = await fetch(`${BASE_URL}/scheme/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json',
                    'schemeid': selectedIndex.schemeid,
                }
            });
            const result = await response.json();
            if (result.status === 1) {
                navigate('#');
                toast.current.show({ severity: 'success', summary: 'Success', detail: result.message, life: 2000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: result.message, life: 2000 });
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        } finally {
            setSelectedIndex(null);
            setDeleteSchemeDialog(false);
        }
    }

    function handleSearch(searchValue) {
        setGlobalFilter(searchValue);
    }

    const NullView = () => (
        <Box
          sx={{
            display: "flex",
            height: "70vh",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* <FaExclamationTriangle size={140} elevation={3} /> */}
          <Typography variant="h6" component="div" sx={{ mt: 3 }}>
            No schemes available
          </Typography>
          <Typography variant="body2" color="textSecondary" my={2}>
            No schemes have been created yet
          </Typography>
        </Box>
      );
    

    return (
        <Box
            sx={{
                p: 3,
                mt: 10,
                flexGrow: 1,
                display: 'flex'
            }}
        >
            <Navbar HeaderTitle='Scheme Management' />
            <Typography variant="body1" gutterBottom sx={{ width: '100vw' }}>
                <div>
                    <Toast ref={toast} />
                     {scheme === 0 ? (
                              <NullView />
                            ) : (
                    <div className="card">
                        <AddNew />
                        <DataTable
                            ref={dt}
                            paginator
                            rows={10}
                            dataKey="id"
                            value={scheme}
                            globalFilter={globalFilter}
                            rowsPerPageOptions={[5, 10, 25]}
                            header={<Header title={"Manage schemes"} onSearch={handleSearch} />}
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        >
                            <Column field="schemeid" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                            <Column field="schemename" header="Name" style={{ minWidth: '8rem' }} />
                            <Column header="Action" body={formActions} style={{ minWidth: '12rem' }} />
                        </DataTable>
                    </div>
                            )}

                    {/* add scheme dialog */}
                    <Dialog
                        modal
                        className="p-fluid"
                        visible={addNewDialog}
                        header="Add Scheme"
                        style={{ width: '32rem' }}
                        footer={addNewSchemeFooter}
                        onHide={() => setAddNewDialog(false)}
                        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    >
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Scheme Name
                            </label>
                            <InputText
                                id="name"
                                required
                                autoFocus
                                value={addNewScheme}
                                placeholder='Add scheme name'
                                onChange={(e) => setAddNewScheme(e.target.value)}
                            />
                            {error && <Typography variant='subtitle2' mt={2} color={'red'}>{error}</Typography>}
                        </div>
                    </Dialog>

                    {/* edit scheme dialog */}
                    <Dialog
                        modal
                        className="p-fluid"
                        visible={updateDialog}
                        header={'Update Scheme'}
                        style={{ width: '32rem' }}
                        footer={updateSchemeFooter}
                        onHide={hideUpdateScheme}
                        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    >
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Scheme Name
                            </label>
                            <InputText
                                id="name"
                                required
                                autoFocus
                                value={updateScheme}
                                placeholder='Update scheme name'
                                onChange={(e) => setUpdateScheme(e.target.value)}
                            />
                            {updateError && <Typography variant='subtitle2' mt={2} color={'red'}>{updateError}</Typography>}
                        </div>
                    </Dialog>

                    {/* Delete scheme dialog */}
                    <Dialog
                        modal
                        style={{ width: '32rem' }}
                        visible={deleteSchemeDialog}
                        onHide={hideDeleteScheme}
                        footer={deleteSchemeFooter}
                        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    >
                        <div className="delete-dialog">
                            <PiWarningOctagonThin size={80} elevation={3} color='#CC0000' />
                            <h3>Are you sure?</h3>
                            <span>Once deleted, you will not be able to recover this scheme!</span>
                        </div>
                    </Dialog>
                </div>
            </Typography>
        </Box>
    );
}
