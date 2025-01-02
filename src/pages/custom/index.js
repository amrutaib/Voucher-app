import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import axios from "axios";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primereact/resources/primereact.css";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { BASE_URL, TOKEN } from "../../config/api";
import { Navbar, Loader, Header, ActionBody } from "../../components/index";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Box, Typography, FormLabel, Stack, FormControl } from "@mui/material";
//icons
import DeleteIcon from "@mui/icons-material/Delete";
import { PiWarningOctagonThin } from "react-icons/pi";
import { useLocation } from "react-router-dom";

export default function CustomField() {
  // Client ID
  const clientId = localStorage.getItem("clientId");

  // Ref
  const dt = useRef(null);
  const toast = useRef(null);

  // States
  const [fieldName, setFieldName] = useState("");
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [fieldsArray, setFieldsArray] = useState([]);
  const [selectedFieldType, setSelectedFieldType] = useState(null);

  //delete field
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [deleteFieldDialog, setDeleteFieldDialog] = useState(false);

  const fieldTypes = [{ name: "Import" }, { name: "Export" }];

  // Error states for form fields
  const [fieldNameError, setFieldNameError] = useState("");
  const [fieldTypeError, setFieldTypeError] = useState("");

  // Fetch custom fields summary
  const fetchCustomFields = async () => {
    try {
      const URL = `${BASE_URL}/customfields/`;
      const response = await axios.get(URL, {
        headers: {
          clientid: clientId,
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
      });
      setFieldsArray(response.data);
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

  useEffect(() => {
    fetchCustomFields();
  }, []);

  // Submit fields form
  const onSubmitFields = async (e) => {
    e.preventDefault();

    let valid = true;
    const URL = `${BASE_URL}/customfields/`;

    // Clear previous errors
    setFieldNameError("");
    setFieldTypeError("");

    // Validation checks
    if (!fieldName) {
      setFieldNameError("Please enter a valid name.");
      valid = false;
    }
    if (!selectedFieldType) {
      setFieldTypeError("Please select a field type.");
      valid = false;
    }

    // Proceed if valid
    if (valid) {
      const requestBody = JSON.stringify({
        fieldname: fieldName,
        clientid: clientId,
        fieldtype: selectedFieldType.name,
      });
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            Authorization: TOKEN,
            "Content-Type": "application/json",
          },
          body: requestBody,
        });
        const result = await response.json();
        if (result.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: result.message,
            life: 2000,
          });
          fetchCustomFields();
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
          detail: "Something went wrong",
          life: 2000,
        });
      } finally {
        // Reset the form
        setFieldName("");
        setSelectedFieldType(null);
      }
    }
  };

  // Handlers to clear errors on value change
  const handleFieldNameChange = (e) => {
    setFieldName(e.target.value);
    if (e.target.value) {
      setFieldNameError("");
    }
  };

  const handleFieldTypeChange = (e) => {
    setSelectedFieldType(e.value);
    if (e.value) {
      setFieldTypeError("");
    }
  };

  //delete field

  const formActions = (data) => {
    return (
      <ActionBody
        color={"error"}
        arialabel="delete"
        tooltip="Delete Field"
        icon={<DeleteIcon />}
        handleClick={() => {
          setSelectedIndex(data);
          setDeleteFieldDialog(true);
        }}
      />
    );
  };

  const hideDeleteField = () => {
    setDeleteFieldDialog(false);
  };

  const deleteFieldFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        onClick={hideDeleteField}
      />
      <Button label="OK" severity="danger" onClick={deleteField} />
    </React.Fragment>
  );

  async function deleteField() {
    try {
      const response = await fetch(`${BASE_URL}/customfields/`, {
        method: "DELETE",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
          fieldId: selectedIndex.fieldId,
        },
      });
      const result = await response.json();
      if (result.status === 1) {
        fetchCustomFields();
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
      setDeleteFieldDialog(false);
    }
  }

  const Label = ({ value, html }) => (
    <FormLabel htmlFor={html} required className="font-bold mb-2">
      {value}
    </FormLabel>
  );

  function handleSearch(searchValue) {
    setGlobalFilter(searchValue);
  }

  const AddFields = () => (
    <form onSubmit={onSubmitFields}>
      <Box
        sx={{
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          alignItems: "center",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Stack spacing={3} direction={"row"} mb={3}>
          {/* Name Field */}
          <FormControl fullWidth error={!!fieldNameError}>
            <Label html="name" value="Field Name" />
            <InputText
              id="name"
              required
              autoFocus
              value={fieldName}
              placeholder="Enter field name"
              onChange={handleFieldNameChange}
            />
            {fieldNameError && (
              <span style={{ color: "red", marginTop: 10 }}>
                {fieldNameError}
              </span>
            )}
          </FormControl>

          {/* Field Type */}
          <FormControl fullWidth error={!!fieldTypeError}>
            <Label html="fieldType" value="Select Field Type" />
            <Dropdown
              optionLabel="name"
              options={fieldTypes}
              value={selectedFieldType}
              placeholder="Select field type"
              onChange={handleFieldTypeChange}
            />
            {fieldTypeError && (
              <span style={{ color: "red", marginTop: 10 }}>
                {fieldTypeError}
              </span>
            )}
          </FormControl>
        </Stack>
        <Button label="Add Field" type="submit" className="button" />
      </Box>
    </form>
  );

  const updatedCustomFields = [];
  fieldsArray.map((item, index) => {
    updatedCustomFields.push({ sr: index + 1, ...item });
  });

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
        No Custom fields available
      </Typography>
      <Typography variant="body2" color="textSecondary" my={2}>
        No Custom fields have been created yet
      </Typography>
    </Box>
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
      <Navbar HeaderTitle="Payment custom fields" />

      <Typography variant="body1" gutterBottom sx={{ width: "100vw" }}>
        <div>
          <Toast ref={toast} />
          <AddFields />
          <div className="card">
            {loading ? (
              <Loader />
            ) : fieldsArray.length === 0 ? (
              <NullView />
            ) : (
              <DataTable
                ref={dt}
                paginator
                rows={10}
                dataKey="id"
                value={updatedCustomFields}
                globalFilter={globalFilter}
                rowsPerPageOptions={[5, 10, 25]}
                header={
                  <Header
                    title={`Manage custom form fields`}
                    onSearch={handleSearch}
                  />
                }
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} fields"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              >
                <Column
                  field="sr"
                  header="Sr no."
                  sortable
                  style={{ minWidth: "4rem" }}
                />
                <Column
                  field="fieldName"
                  header="Field Name"
                  style={{ minWidth: "8rem" }}
                />
                <Column
                  field="fieldType"
                  header="Field Type"
                  style={{ minWidth: "8rem" }}
                />
                <Column
                  header="Action"
                  body={formActions}
                  style={{ minWidth: "8rem" }}
                />
              </DataTable>
            )}
          </div>

          {/* Delete field dialog */}

          <Dialog
            modal
            style={{ width: "32rem" }}
            visible={deleteFieldDialog}
            onHide={hideDeleteField}
            footer={deleteFieldFooter}
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
