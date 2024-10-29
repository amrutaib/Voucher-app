import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { ProductService } from '../../service/ProductService';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Password } from 'primereact/password';

import './index.css'
import { Tag } from 'primereact/tag';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TbPointFilled } from "react-icons/tb";
import { useTheme } from "@mui/material/styles";
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Navbar from '../Navbar';
import PageHeader from '../PageHeader';
import $ from "jquery";
import { Email } from '@mui/icons-material';

export default function Userlist() {
    const theme = useTheme();
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

    const [products, setProducts] = useState(null);
    const [name, setName] = useState('');
    const [result, setResult] = useState("");
    const [password, setPassword] = useState("");
    const [Mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
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

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async (e) => {
         setSubmitted(true);

        // if (product.name.trim()) {
        //     let _products = [...products];
        //     let _product = { ...product };
        //     if (product.id) {
        //         const index = findIndexById(product.id);

        //         _products[index] = _product;
        //         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        //     } else {
        //         _product.id = createId();
        //       //  _product.image = 'product-placeholder.svg';
        //         _products.push(_product);
        //         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        //     }
        //     setProducts(_products);
        //     setProductDialog(false);
        //     setProduct(emptyProduct);
        // }

        // e.preventDefault();
        //     const fd = new FormData();
        //     fd.append('Name',name);
         //    const form = $();
         e.preventDefault();
         var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
         const form = new FormData();
         form.append('Name',name);
         form.append('Password',password);
         form.append('Email',email);
         form.append('Mobile',Mobile);
         form.append('usertype',userType);
         console.log(password);
         if(name==''){
            alert('in');
            toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Add name', life: 3000 });
         }   
         //console.log(form);
       else {  
        
         const res = await fetch('http://localhost:8000/Server.php', {
            method: 'POST',
            body: form
          });
      
          const result = await res.json();
          //setResult(result.message);
         alert(result);
    };
}

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };


    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const handleInputChange = (e) => {
        //setError("");
        setName(e.target.value);
        
      
     //   onChange={(e) => handleInputChange(e, "user")}
    };
    const handlePasswordChange = (e) => {
        //setError("");
        setPassword(e.target.value);
        
      
     //   onChange={(e) => handleInputChange(e, "user")}
    };
    const handleEmailChange = (e) => {
        //setError("");
        setEmail(e.target.value);
        
      
     //   onChange={(e) => handleInputChange(e, "user")}
    };
    const handleMobileChange = (e) => {
        //setError("");
        setMobile(e.target.value);
        
      
     //   onChange={(e) => handleInputChange(e, "user")}
    };
   const handleUserTypeChange=(e)=>{
    setUserType(e.target.value);
   }
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };
   

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return (rowData.price);
    };
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
    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
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
            <Navbar />
            <Typography variant="body1" gutterBottom sx={{width:'100vw'}}>
                <div>
                    <Toast ref={toast} />
                    <div className="card">
                    <div className="container card-alert card purple">
                        <div className="card-content white-text">
                            <p>All Users</p>
                        </div>
                    </div>
                        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                        <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                            <Column selectionMode="multiple" exportable={false}></Column>
                            <Column field="id" header="Sr.No" sortable style={{ minWidth: '4rem' }}></Column>
                            <Column field="name" header="Name" sortable style={{ minWidth: '8rem' }}></Column>
                            <Column field="Mobile" header="Mobile" body={mobileBodyTemplate} sortable></Column>
                            <Column field="Email" header="Email" body={emailtypeBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                            <Column field="Usertype" header="User type" body={usertypeBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                            <Column field="Balance" header="Balance" body={balancetypeBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                            <Column field="Registrationdate" header="Registration Date" body={regitrationdatetypeBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                            <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                        </DataTable>
                    </div>

                    <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                       <div> <form
                                    action="http://localhost:8000/server.php"
                                    method="post"
                                   
                                >
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Name
                            </label>
                            <InputText id="name" value={name} onChange={(e) => handleInputChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && ! name })} />
                            {submitted && ! name && <small className="p-error" name='name'>Name is required.</small>}
                        </div>
                         <div className="field">
                            <label htmlFor="password" className="font-bold">
                                Password
                            </label>
                            <input  type='password' id="password" value={password} required onChange={(e) => handlePasswordChange(e)}  autoFocus className={classNames({ 'p-invalid': submitted && !password })} />
                            {submitted && !password && <small className="p-error">Password is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Mobile no
                            </label>
                            <InputText id="Mobile" value={Mobile}  required onChange={(e) => handleMobileChange(e)}  autoFocus className={classNames({ 'p-invalid': submitted && !product.Mobile })} />
                            {submitted && ! Mobile && <small className="p-error">Mobile no  is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description" className="font-bold">
                                Email
                            </label>
                            <input type="email" id="email" name="email" value={email}  onChange={(e) => handleEmailChange(e)}  autoFocus className={classNames({ 'p-invalid': submitted && !product.Mobile })} />
                            {submitted && !email && <small className="p-error">Email  is required.</small>}
                        </div>

                        <div className="field">
                            <label className="mb-3 font-bold">Select User Type</label>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"

                             
                                label="Age"
                                style={{ width: '100%' }} onChange={(e) => handleUserTypeChange(e)} >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Import</MenuItem>
                                <MenuItem value={20}>Export</MenuItem>
                            </Select>
                        </div>

                        {/* <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div> */}
                </form>
                </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </Typography>
        </Box>
    );
}



