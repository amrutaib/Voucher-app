import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Tab } from "@mui/base/Tab";
import Box from "@mui/material/Box";
import { Tabs } from "@mui/base/Tabs";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/primereact.css";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import Typography from "@mui/material/Typography";
import { DataTable } from "primereact/datatable";
import { PiWarningOctagonThin } from "react-icons/pi";
import { ProductService } from "../../service/ProductService";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export default function Voucher() {
  //ref
  const dt = useRef(null);
  const toast = useRef(null);

  //states
  const [products, setProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [voucher, setVouchers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    getVoucher();
  }, []);
  const vouchernoBodyTemplate = (rowData) => {
    return rowData.voucher_no;
  };

  const shippernameBodyTemplate = (rowData) => {
    return rowData.userName;
  };

  const sellerBodyTemplate = (rowData) => {
    return rowData.seller;
  };

  const sbBodyTemplate = (rowData) => {
    return rowData.sb_no;
  };

  const jobnoBodyTemplate = (rowData) => {
    return rowData.job_no;
  };

  const approvedamntBodyTemplate = (rowData) => {
    return rowData.approvedAmnt;
  };
  const approveddateBodyTemplate = (rowData) => {
    return rowData.approvedDate;
  };
  function getVoucher() {
    //const URL = `${BASE_URL}${api_routes.edit_user}${Id}`;
    // var URL = `https://c5da-110-226-177-100.ngrok-free.app/user/${Id}`;
    fetch(`https://d386-103-167-123-102.ngrok-free.app/voucher/`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVouchers(data);
        setLoading(false);
        console.log(data, "DATA");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }
  const actionBodyTemplate = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          tooltip="Edit voucher"
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          icon="pi pi-receipt"
          rounded
          outlined
          className="mr-2"
          tooltip="View voucher"
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          tooltip="Delete voucher"
          tooltipOptions={{ position: "bottom" }}
          onClick={() => setDeleteProductDialog(true)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage vouchers</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button label="OK" severity="danger" onClick={hideDeleteProductDialog} />
    </React.Fragment>
  );

  const DeleteVoucherDialog = () => (
    <Dialog
      modal
      style={{ width: "32rem" }}
      visible={deleteProductDialog}
      onHide={hideDeleteProductDialog}
      footer={deleteProductDialogFooter}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
    >
      <div className="delete-dialog">
        <PiWarningOctagonThin size={80} elevation={3} color="#CC0000" />
        <h3>Are you sure?</h3>
        <span>Once deleted, you will not be able to recover record!</span>
      </div>
    </Dialog>
  );

  const Export = () => (
    <div className="addbtn">
      <Button label="Export Excel" severity="secondary" onClick={() => {}} />
    </div>
  );

  return (
    <Box
      sx={{
        p: 3,
        mt: 10,
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Navbar />
      <Typography variant="body1" gutterBottom sx={{ width: "100vw" }}>
        <Tabs defaultValue={1}>
          <TabsList
            className="tablist"
            style={{
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <Tab value={1} className="tabview">
              <Typography variant="subtitle1">Pending(36)</Typography>
            </Tab>
            <Tab value={2} className="tabview">
              <Typography variant="subtitle1" sx={{ marginLeft: "10px" }}>
                Approved(12)
              </Typography>
            </Tab>
          </TabsList>

          <TabPanel value={1}>
            <div>
              <Toast ref={toast} />
              <Export />
              <div className="card">
                <DataTable
                  ref={dt}
                  paginator
                  rows={10}
                  dataKey="id"
                  header={header}
                  value={voucher}
                  globalFilter={globalFilter}
                  rowsPerPageOptions={[5, 10, 25]}
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vouchers"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                >
                  <Column
                    field="id"
                    header="Voucher no."
                    body={vouchernoBodyTemplate}
                    style={{ minWidth: "4rem" }}
                  />
                  <Column
                    field="Voucherno"
                    header="Shipper name"
                    body={shippernameBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="Seller"
                    header="Seller"
                    body={sellerBodyTemplate}
                  />
                  <Column
                    field="S/B"
                    header="S/b"
                    body={sbBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="Job No"
                    header="Job no"
                    body={jobnoBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="Approved"
                    header="Approved amount"
                    body={approvedamntBodyTemplate}
                    style={{ minWidth: "3rem" }}
                  />
                  <Column
                    field="Approved"
                    header="Approved date"
                    body={approveddateBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="Approved"
                    header="Added date"
                    body={approveddateBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    header="Action"
                    body={actionBodyTemplate}
                    style={{ minWidth: "3rem" }}
                  />
                </DataTable>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={2}>
            <div>
              <Toast ref={toast} />
              <Export />
              <div className="card">
                <DataTable
                  ref={dt}
                  paginator
                  rows={10}
                  dataKey="id"
                  header={header}
                  value={voucher}
                  globalFilter={globalFilter}
                  rowsPerPageOptions={[5, 10, 25]}
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} vouchers"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                >
                  <Column
                    field="id"
                    header="Voucher no."
                    body={vouchernoBodyTemplate}
                    style={{ minWidth: "4rem" }}
                  />
                  <Column
                    field="Voucherno"
                    header="Shipper name"
                    body={shippernameBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="Seller"
                    header="Seller"
                    body={sellerBodyTemplate}
                  />
                  <Column
                    field="S/B"
                    header="S/b"
                    body={sbBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="Job No"
                    header="Job no"
                    body={jobnoBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="Approved"
                    header="Approved amount"
                    body={approvedamntBodyTemplate}
                    style={{ minWidth: "3rem" }}
                  />
                  <Column
                    field="Approved"
                    header="Approved date"
                    body={approveddateBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="Approved"
                    header="Added date"
                    body={approveddateBodyTemplate}
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    header="Action"
                    body={actionBodyTemplate}
                    style={{ minWidth: "3rem" }}
                  />
                </DataTable>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </Typography>
    </Box>
  );
}
