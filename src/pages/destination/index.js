import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import Box from "@mui/material/Box";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/primereact.css";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import Typography from "@mui/material/Typography";
import { PiWarningOctagonThin } from "react-icons/pi";
import { BASE_URL, api_routes, TOKEN } from "../../config/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Navbar, ActionBody, Header } from "../../components/index";
//icons
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getCookie } from "../../components/common/utils";

export default function Destination() {
  const navigate = useNavigate();
  const clientId = getCookie("clientId");

  //states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateError, setUpdateError] = useState("");
  const [destination, setDestination] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);

  //new destination
  const [addNewDialog, setAddNewDialog] = useState(false);
  const [addNewDestination, setAddNewDestination] = useState("");

  //update destination
  const [updateDialog, setUpdateDialog] = useState(false);
  const [updateDestination, setUpdateDestination] = useState("");

  //delete destination
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [deleteDestinationDialog, setDeleteDestinationDialog] = useState(false);

  //ref
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    fetchDestination();
  }, [addNewDestination, selectedIndex]);

  const fetchDestination = async () => {
    const allDestUrl = `${BASE_URL}${api_routes.destination}/`;
    try {
      const response = await axios.get(allDestUrl, {
        headers: {
          clientid: clientId,
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
      });
      setDestination(response.data);
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
  };

  const formActions = (data) => {
    return (
      <>
        <ActionBody
          arialabel="name"
          tooltip="Edit Destination"
          icon={<ModeEditIcon />}
          handleClick={() => {
            setUpdateDialog(true);
            setSelectedIndex(data);
            setUpdateDestination(data.DestinationName);
          }}
        />
        <ActionBody
          color={"error"}
          arialabel="delete"
          tooltip="Delete Destination"
          icon={<DeleteIcon />}
          handleClick={() => {
            setSelectedIndex(data);
            setDeleteDestinationDialog(true);
          }}
        />
      </>
    );
  };

  // add new destination

  const AddNew = () => (
    <div className="addbtn">
      <Button
        label="Add New"
        className="button"
        onClick={() => setAddNewDialog(true)}
      />
    </div>
  );

  const addNewDestinationFooter = (
    <>
      <Button
        outlined
        label="Cancel"
        severity="danger"
        onClick={() => {
          setError("");
          setAddNewDialog(false);
        }}
      />
      <Button label="Save" severity="success" onClick={addNewDest} />
    </>
  );

  async function addNewDest() {
    const addDest = `${BASE_URL}/destination/`;

    setError("");
    let isValid = true;

    if (!addNewDestination) {
      isValid = false;
      setError("Please add destination name");
    }

    if (isValid) {
      try {
        const response = await fetch(addDest, {
          method: "POST",
          headers: {
            Authorization: TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DestinationName: addNewDestination,
            clientid: clientId,
          }),
        });
        const result = await response.json();
        if (result.status === 200) {
          navigate("#");
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: result.message,
            life: 2000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: result.message,
            life: 2000,
          });
        }
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      } finally {
        setError("");
        setAddNewDialog(false);
        setAddNewDestination("");
      }
    }
  }

  //edit destination

  const hideUpdateDestination = () => {
    setUpdateDialog(false);
  };

  const updateDestinationFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        onClick={hideUpdateDestination}
      />
      <Button label="Save" severity="danger" onClick={updateDest} />
    </React.Fragment>
  );

  async function updateDest() {
    setUpdateError("");
    let isValid = true;

    if (!updateDestination) {
      isValid = false;
      setUpdateError("Please add destination name");
    }
    if (isValid) {
      try {
        const response = await fetch(`${BASE_URL}/destination/`, {
          method: "PUT",
          headers: {
            Authorization: TOKEN,
            "Content-Type": "application/json",
            destinationid: selectedIndex.DestinationId,
          },
          body: JSON.stringify({
            DestinationName: updateDestination,
            clientid: clientId,
          }),
        });
        const result = await response.json();
        console.log(result, "RES");
        if (result.status === 1) {
          navigate("#");
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: result.message,
            life: 2000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: result.message,
            life: 2000,
          });
        }
      } catch (error) {
        console.log(error?.message);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      } finally {
        setUpdateError("");
        setSelectedIndex(null);
        setUpdateDialog(false);
        setUpdateDestination("");
      }
    }
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
        No Destination available
      </Typography>
      <Typography variant="body2" color="textSecondary" my={2}>
        No Destination have been created yet
      </Typography>
    </Box>
  );

  // delete destination

  const hideDeleteDestination = () => {
    setDeleteDestinationDialog(false);
  };

  const deleteDestinationFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        onClick={hideDeleteDestination}
      />
      <Button label="OK" severity="danger" onClick={deleteDestination} />
    </React.Fragment>
  );

  async function deleteDestination() {
    try {
      const response = await fetch(`${BASE_URL}/destination/`, {
        method: "DELETE",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
          destinationid: selectedIndex.DestinationId,
        },
      });
      const result = await response.json();
      if (result.status === 1) {
        navigate("#");
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: result.message,
          life: 2000,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: result.message,
          life: 2000,
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      });
    } finally {
      setSelectedIndex(null);
      setDeleteDestinationDialog(false);
    }
  }

  function handleSearch(searchValue) {
    setGlobalFilter(searchValue);
  }

  return (
    <Box
      sx={{
        p: 3,
        mt: 10,
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Navbar HeaderTitle="Destination Management" />
      <Typography variant="body1" gutterBottom sx={{ width: "100vw" }}>
          <div>
            <Toast ref={toast} />
            {destination === 0 ? (
          <NullView />
        ) : (
            <div className="card">
              <AddNew />
              <DataTable
                ref={dt}
                paginator
                rows={10}
                dataKey="id"
                value={destination}
                globalFilter={globalFilter}
                rowsPerPageOptions={[5, 10, 25]}
                header={
                  <Header
                    title={"Manage destinations"}
                    onSearch={handleSearch}
                  />
                }
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              >
                <Column
                  field="DestinationId"
                  header="Sr.No"
                  sortable
                  style={{ minWidth: "4rem" }}
                />
                <Column
                  field="DestinationName"
                  header="Name"
                  style={{ minWidth: "8rem" }}
                />
                <Column
                  header="Action"
                  body={formActions}
                  style={{ minWidth: "12rem" }}
                />
              </DataTable>
            </div>
        )}

        {/* add destination dialog */}

        <Dialog
          modal
          className="p-fluid"
          visible={addNewDialog}
          header="Add Destination"
          style={{ width: "32rem" }}
          footer={addNewDestinationFooter}
          onHide={() => setAddNewDialog(false)}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
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
              placeholder="Add destination name"
              onChange={(e) => setAddNewDestination(e.target.value)}
            />
            {error && (
              <Typography variant="subtitle2" mt={2} color={"red"}>
                {error}
              </Typography>
            )}
          </div>
        </Dialog>

        {/* edit destination dialog */}

        <Dialog
          modal
          className="p-fluid"
          visible={updateDialog}
          header={"Update Destination"}
          style={{ width: "32rem" }}
          footer={updateDestinationFooter}
          onHide={hideUpdateDestination}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
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
              placeholder="Update destination name"
              onChange={(e) => setUpdateDestination(e.target.value)}
            />
            {updateError && (
              <Typography variant="subtitle2" mt={2} color={"red"}>
                {updateError}
              </Typography>
            )}
          </div>
        </Dialog>

        {/* Delete destination dialog */}

        <Dialog
          modal
          style={{ width: "32rem" }}
          visible={deleteDestinationDialog}
          onHide={hideDeleteDestination}
          footer={deleteDestinationFooter}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        >
          <div className="delete-dialog">
            <PiWarningOctagonThin size={80} elevation={3} color="#CC0000" />
            <h3>Are you sure?</h3>
            <span>Once deleted, you will not be able to recover record!</span>
          </div>
        </Dialog>
        </div>
      </Typography>
    </Box>

  );
}
