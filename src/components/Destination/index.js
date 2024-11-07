import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import Navbar from '../Navbar';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Box from "@mui/material/Box";
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import Typography from "@mui/material/Typography";
import { PiWarningOctagonThin } from "react-icons/pi";
import { ProductService } from '../../service/ProductService';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function Destination() {

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    //states
    const [products, setProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    //ref
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        ProductService
            .getProducts()
            .then((data) => setProducts(data));
    }, []);


    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const editProduct = (product) => {
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setDeleteProductDialog(true);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="header">
            <h4 className="m-0">Manage Destinations</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" outlined severity='danger' onClick={hideDialog} />
            <Button label="Save" severity='success' onClick={hideDialog} />
        </React.Fragment>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" severity='secondary' outlined onClick={hideDeleteProductDialog} />
            <Button label="OK" severity="danger" onClick={hideDeleteProductDialog} />
        </React.Fragment>
    );

    const AddNewUser = () => (
        <div className='addbtn'>
            <Button
                label="Add New"
                severity="success"
                onClick={openNew}
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
            <Navbar HeaderTitle='Destination Management' />
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
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        >
                            <Column field="id" header="Sr.No" sortable style={{ minWidth: '4rem' }} />
                            <Column field="name" header="Name" style={{ minWidth: '8rem' }} />
                            <Column header="Action" body={actionBodyTemplate} style={{ minWidth: '12rem' }} />
                        </DataTable>
                    </div>

                    {/* update/add  destination dialog */}
                    <Dialog
                        modal
                        className="p-fluid"
                        onHide={hideDialog}
                        visible={productDialog}
                        header="Add Destination"
                        style={{ width: '32rem' }}
                        footer={productDialogFooter}
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
                                value={product.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                className={classNames({ 'p-invalid': submitted && !product.name })}
                            />
                            {submitted && !product.name && <small className="p-error">Destination Name is required.</small>}
                        </div>
                    </Dialog>

                    {/* delete destination dialog  */}
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
                </div>
            </Typography>
        </Box>
    );
}
