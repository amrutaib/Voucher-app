import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Navbar from "../Navbar";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import Box from "@mui/material/Box";
import ActionBody from "./ActionBody";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../../config/api";
import { ProductService } from "../../service/ProductService";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UserVoucherList() {
  //ref
  const dt = useRef(null);
  const toast = useRef(null);
  const { Id } = useParams();
  console.log("this.context:", Id);

  //states
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
    const URL = `${BASE_URL}/voucher/${Id}/`;
    // var URL = `https://c5da-110-226-177-100.ngrok-free.app/user/${Id}`;
    fetch(URL, {
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
        <ActionBody
          iconName="receipt"
          tooltip="View Voucher PDF"
          handleClick={() => {}}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="header">
      <h4 className="m-0">Manage user vouchers</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search vouchers"
        />
      </IconField>
    </div>
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
      <Navbar HeaderTitle="User Vouchers" />
      <Typography variant="body1" gutterBottom sx={{ width: "100vw" }}>
        <div>
          <Toast ref={toast} />
          <div className="card">
            <Export />
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
                header="User name"
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
      </Typography>
    </Box>
  );
}
