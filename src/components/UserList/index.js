import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Navbar from "../Navbar";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import ActionBody from "./ActionBody";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primereact/resources/primereact.css";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { InputSwitch } from "primereact/inputswitch";
import { Box, CircularProgress } from "@mui/material";
import { FaExclamationTriangle } from "react-icons/fa";
import { BASE_URL, api_routes } from "../../config/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export default function Userlist() {
  const navigate = useNavigate();

  const dt = useRef(null);
  const toast = useRef(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [addUserModal, setAddUserModal] = useState(false);
  const [userActiveStatus, setUserActiveStatus] = useState(true);
  //new user form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedUserTypes, setSelectedUserTypes] = useState(null);
  const usertypes = [{ name: "Import" }, { name: "Export" }];

  const hideAdduserModal = () => {
    setAddUserModal(false);
  };

  async function fetchUsers() {
    // const URL = `${BASE_URL}${api_routes}`;
    const URL =
      "https://410c-2400-7f60-205-99cf-c129-b3ff-f074-53d0.ngrok-free.app/api/user/";
    fetch(URL, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
        console.log(data, "DATA");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const userStatus = (rowData) => {
    const status = rowData.userStatus;
    console.log(status);

    function checkStatus() {
      if (status === "active") {
        setUserActiveStatus(true);
      }
      if (status === "Inactive") {
        setUserActiveStatus(false);
      }
    }

    async function fetchUsers() {
      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setUsers(response.data);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    }

    const userStatus = (rowData) => {
      const status = rowData.userStatus;
      function checkStatus() {
        if (status === "active") {
          setUserActiveStatus(true);
        }
      }
      return (
        <InputSwitch
          tooltip="User Status"
          onChange={checkStatus}
          checked={userActiveStatus}
          tooltipOptions={{ position: "bottom" }}
        />
      );
    };

    const actionBodyTemplate = (data) => {
      return (
        <React.Fragment>
          <ActionBody
            iconName="receipt"
            tooltip="View Voucher"
            handleClick={() =>
              navigate("/uservouchers", {
                state: {
                  id: data.userId,
                  name: data.userName,
                },
              })
            }
          />
          <ActionBody
            iconName="dollar"
            tooltip="Payment Summary"
            handleClick={() =>
              navigate("/userpayment", {
                state: {
                  id: data.userId,
                  name: data.userName,
                },
              })
            }
          />
          <ActionBody
            iconName="pencil"
            tooltip="Edit User"
            handleClick={() => navigate(`/editUser/${data.userId}`)}
          />
        </React.Fragment>
      );
    };

    const header = (
      <div className="header">
        <h4 className="m-0">Manage Users</h4>
        <IconField iconPosition="left" style={{ marginLeft: "20px" }}>
          <InputIcon className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Users"
          />
        </IconField>
      </div>
    );

    const AddNewUser = () => (
      <div className="addbtn">
        <Button
          label="Add User"
          className="button"
          onClick={() => navigate("/adduser")}
        />
      </div>
    );

    const NewUserFooter = (
      <React.Fragment>
        <Button
          label="Cancel"
          color="#CC0000"
          outlined
          severity="danger"
          onClick={hideAdduserModal}
        />
        <Button label="Save" severity="success" onClick={() => {}} />
      </React.Fragment>
    );

    const FormLabel = ({ value, html }) => (
      <label htmlFor={html} className="font-bold">
        {value}
      </label>
    );

    const Loader = () => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <CircularProgress />
      </div>
    );

    const NullComponent = () => {
      return (
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FaExclamationTriangle size={140} elevation={3} />
          <Typography variant="h6" component="div" sx={{ mt: 3 }}>
            No Users Available
          </Typography>
          <Typography variant="body2" color="textSecondary" my={2}>
            No users have been created yet, Click on the add button to create a
            new user.
          </Typography>
          <AddNewUser />
        </Box>
      );
    };

    return (
      <InputSwitch
        tooltip="User Status"
        onChange={checkStatus}
        checked={userActiveStatus}
        tooltipOptions={{ position: "bottom" }}
      />
    );
  };
  const editProduct = (users) => {
    console.log("users", users);
    var id = users;
    navigate(`/editUser/${id}`);
  };
  const viewVoucher = (users) => {
    var Id = users;
    navigate(`/uservouchers/${Id}`);
  };
  // editProduct(rowData)
  const actionBodyTemplate = (users) => {
    return (
      <React.Fragment>
        <ActionBody
          iconName="receipt"
          tooltip="View Voucher"
          handleClick={() => viewVoucher(users.userId)}
        />
        <ActionBody
          iconName="dollar"
          tooltip="Payment Summary"
          handleClick={() => navigate("/userpayment")}
        />
        <ActionBody
          iconName="pencil"
          tooltip="Edit User"
          value={userActiveStatus.userId}
          handleClick={() => editProduct(users.userId)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="header">
      <h4 className="m-0">Manage Users</h4>
      <IconField iconPosition="left" style={{ marginLeft: "20px" }}>
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search Users"
        />
      </IconField>
    </div>
  );

  const AddNewUser = () => (
    <div className="addbtn">
      <Button
        iconPos="right"
        label="Add User"
        icon="pi pi-plus"
        severity="success"
        onClick={() => navigate("/adduser")}
      />
    </div>
  );

  const NewUserFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        color="#CC0000"
        outlined
        severity="danger"
        onClick={hideAdduserModal}
      />
      <Button label="Save" severity="success" onClick={() => {}} />
    </React.Fragment>
  );

  const FormLabel = ({ value, html }) => (
    <label htmlFor={html} className="font-bold">
      {value}
    </label>
  );

  const Loader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
      }}
    >
      <CircularProgress />
    </div>
  );

  const NullComponent = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={4}
      >
        <FaExclamationTriangle size={140} elevation={3} />
        <Typography variant="h5" color="ButtonText" gutterBottom my={"20px"}>
          No Users Available
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          No users have been created yet, Click on the add button to create a
          new user.
        </Typography>
        <AddNewUser />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        p: 3,
        mt: 10,
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Navbar HeaderTitle="User Management" />
      <Typography variant="body1" gutterBottom sx={{ width: "100vw" }}>
        <div>
          <Toast ref={toast} />
          <div className="card">
            {loading ? (
              <Loader />
            ) : users.length < 1 ? (
              <NullComponent />
            ) : (
              <>
                {users.length > 0 && <AddNewUser />}
                <DataTable
                  ref={dt}
                  paginator
                  rows={10}
                  dataKey="id"
                  value={users}
                  header={header}
                  globalFilter={globalFilter}
                  rowsPerPageOptions={[5, 10, 25]}
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                >
                  <Column
                    field="userId"
                    header="Sr.No"
                    sortable
                    style={{ minWidth: "4rem" }}
                  />
                  <Column
                    field="userName"
                    header="Name"
                    style={{ minWidth: "8rem" }}
                  />
                  <Column field="Mobile" header="Mobile" />
                  <Column
                    field="email"
                    header="Email"
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="userType"
                    header="User type"
                    style={{ minWidth: "6rem" }}
                  />
                  <Column
                    field="registration_date"
                    header="Registration Date"
                    style={{ minWidth: "8rem" }}
                  />
                  <Column
                    field="userStatus"
                    header="User Status"
                    body={userStatus}
                    style={{ minWidth: "6rem" }}
                  />
                  <Column
                    header="Action"
                    body={actionBodyTemplate}
                    exportable={false}
                    style={{ minWidth: "14rem" }}
                  />
                </DataTable>
              </>
            )}
          </div>
        </div>
      </Typography>

      <Dialog
        modal
        className="p-fluid"
        visible={addUserModal}
        footer={NewUserFooter}
        header="Add New User"
        onHide={hideAdduserModal}
        style={{ width: "50rem", marginTop: "20px" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      >
        <div className="field">
          <FormLabel html="name" value="Name" />
          <IconField iconPosition="left">
            <InputIcon className="pi pi-user"> </InputIcon>
            <InputText
              id="name"
              required
              autoFocus
              value={name}
              variant="outlined"
              placeholder="Add name"
              onChange={(e) => setName(e.target.value)}
              className="p-inputtext-sm"
            />
          </IconField>
        </div>

        <div className="field">
          <FormLabel html="password" value="Password" />
          <IconField iconPosition="left">
            <InputIcon className="pi pi-lock"> </InputIcon>
            <Password
              required
              autoFocus
              toggleMask
              id="password"
              value={password}
              variant="outlined"
              placeholder="Add user password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </IconField>
        </div>
        <div className="field">
          <FormLabel html="name" value="Mobile No." />
          <IconField iconPosition="left">
            <InputIcon className="pi pi-mobile"> </InputIcon>
            <InputText
              id="Mobile"
              required
              autoFocus
              variant="outlined"
              value={mobileNumber}
              placeholder="Add mobile number"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </IconField>
        </div>
        <div className="field">
          <FormLabel html="email" value="Email" />
          <IconField iconPosition="left">
            <InputIcon className="pi pi-envelope"> </InputIcon>
            <InputText
              type="email"
              required
              value={email}
              id="email"
              variant="outlined"
              placeholder="Add email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </IconField>
        </div>
        <div className="field">
          <label className="mb-3 font-bold">Select User Type</label>
          <Dropdown
            options={usertypes}
            optionLabel="name"
            value={selectedUserTypes}
            placeholder="Select User Type"
            className="w-full md:w-14rem"
            onChange={(e) => setSelectedUserTypes(e.value)}
          />
        </div>
      </Dialog>
    </Box>
  );
}
