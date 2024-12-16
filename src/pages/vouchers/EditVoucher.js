import React, { useRef, useState, useEffect } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { BASE_URL, TOKEN } from "../../config/api";
import { Loader, Navbar } from "../../components/index";
import { useNavigate, useParams } from "react-router-dom";

export default function EditVoucher() {
  const { Id } = useParams();
  const navigate = useNavigate();

  const api_headers = {
    voucherno: Id,
    Authorization: TOKEN,
    "Content-Type": "application/json",
  };

  //ref
  const toast = useRef(null);
  //states
  const [voucher, setVoucher] = useState([]);
  const [loading, setLoading] = useState(true);

  //react-hook-form
  const { register, handleSubmit, watch } = useForm({
    defaultValues: voucher
  });

  const values = watch();

  //fetch Voucher with the params Id
  async function fetchVoucher() {
    const URL = `${BASE_URL}/voucher/editvoucher/`;
    try {
      const response = await axios.get(URL, { headers: api_headers });
      const result = response.data;
      setVoucher(result);
      console.log(result, "RES")
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

  useEffect(() => {
    fetchVoucher();
  }, []);

  const onSubmit = async (data) => {
    const approvedamount = calculateTotalAmount();

    // Helper function to handle null, empty string, or undefined checks
    const getValue = (field) => (data[field] !== null && data[field] !== "" ? data[field] : 0);

    //modifiedData object with updated values
    const modifiedData = {
      ...data,
      approvedamount: approvedamount,
      cmc_charges: getValue('cmc_charges'),
      unloading: getValue('unloading'),
      examination_expense: getValue('examination_expense'),
      carting_charge: getValue('carting_charge'),
      cargo_sorting: getValue('cargo_sorting'),
      opening_repacking: getValue('opening_repacking'),
      other_one: getValue('other_one'),
      other_two: getValue('other_two'),
      other_three: getValue('other_three'),
      other_four: getValue('other_four'),
      other_five: getValue('other_five'),
    };
    console.log(modifiedData, "MOD")
    const URL = `${BASE_URL}/voucher/exportvoucher/`;
    axios
      .put(
        URL,
        modifiedData,
        { headers: api_headers }
      )
      .then(function (response) {
        const data = response.data;
        console.log("API RESPONSE", data);
        if (data.status === 200) {
          setTimeout(() => navigate("/userslist"), 500);
          toast.current.show({ severity: "success", summary: "success", detail: data.message, life: 2000, });
        } else {
          toast.current.show({ severity: "error", summary: "Error", detail: data.message, life: 3000, });
        }
      })
      .catch((error) => console.log(error));
  };

  const fieldsToCalculate = [
    "cmc_charges",
    "unloading",
    "examination_expense",
    "carting_charge",
    "cargo_sorting",
    "opening_repacking",
    "other_one",
    "other_two",
    "other_three",
    "other_four",
    "other_five",
  ];

  function calculateTotalAmount() {
    let total = 0;
    fieldsToCalculate.forEach((field) => {
      if (values[field] && !isNaN(values[field])) {
        total += parseFloat(values[field]);
      }
    });
    return total;
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
      <Navbar HeaderTitle="Update Voucher" />
      <Typography variant="body1" gutterBottom sx={{ width: "100vw" }}>
        <div>
          <Toast ref={toast} />
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* map over the voucher array */}
              {voucher.map((voucher) => (
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  {/* header box shadow UI  */}
                  <Box
                    sx={{
                      padding: "20px",
                      borderRadius: "8px",
                      marginBottom: "20px",
                      alignItems: "center",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {/* 1st row stack */}

                    <Stack spacing={3} direction={"row"} mb={3}>
                      {/* Truck number Field */}
                      <TextField
                        fullWidth
                        label="Truck number"
                        variant="standard"
                        {...register("truck_number")}
                        defaultValue={voucher.truck_number}
                      />

                      {/* Voucher No Field */}
                      <TextField
                        fullWidth
                        required
                        label="V.No"
                        variant="standard"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.voucher_no}
                      />

                      {/* Shipper field */}
                      <TextField
                        fullWidth
                        required
                        label="Shipper"
                        variant="standard"
                        {...register("shipper")}
                        defaultValue={voucher.seller}
                      />
                    </Stack>

                    {/* 2nd row stack */}

                    <Stack spacing={3} direction={"row"} mb={3}>
                      {/* S/B No Field */}
                      <TextField
                        fullWidth
                        label="S/B No"
                        variant="standard"
                        {...register("sb_no")}
                        defaultValue={voucher.sb_no}
                      />
                      {/* Date Field */}
                      <TextField
                        fullWidth
                        required
                        label="Date"
                        variant="standard"
                        defaultValue={voucher.Date}
                        inputProps={{ readOnly: true }}
                      />
                      {/* Job No Field */}
                      <TextField
                        fullWidth
                        required
                        label="Job No"
                        variant="standard"
                        {...register("job_no")}
                        defaultValue={voucher.job_no}
                      />
                    </Stack>

                    {/* 3rd row Field */}

                    <Stack spacing={3} direction={"row"} mb={3}>
                      {/* Destination Field */}
                      <TextField
                        fullWidth
                        label="Destination"
                        variant="standard"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.destination}
                      />
                      {/* Packages Field */}
                      <TextField
                        fullWidth
                        label="Packges "
                        variant="standard"
                        {...register("pkgs")}
                        defaultValue={voucher.pkgs}
                      />
                      {/* Comments Field */}
                      <TextField
                        fullWidth
                        label="Comments"
                        variant="standard"
                        {...register("comments")}
                        defaultValue={voucher.comments}
                      />
                    </Stack>

                    <Stack
                      sx={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                      }}
                    >
                      <h4 style={{ width: "50%" }}>Requested amount</h4>
                      <h4>Approved amount</h4>
                    </Stack>

                    {/* CMC Charges Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.cmc_charges}
                        label="CMC charges as per receipt"
                      />
                      <TextField
                        fullWidth
                        label="CMC charges as per receipt"
                        placeholder="Enter CMC charges"
                        variant="standard"
                        {...register("cmc_charges")}
                      />
                    </Stack>

                    {/* Unloading Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        fullWidth
                        label="Unloading"
                        variant="standard"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.unloading}
                      />
                      <TextField
                        fullWidth
                        label="Unloading"
                        variant="standard"
                        placeholder="Enter Unloadig"
                        {...register("unloading")}
                      />
                    </Stack>

                    {/* Examination Expense Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Examination Expenses"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.examination_expenses}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Examination Expenses"
                        placeholder="Enter Examination Expenses"
                        {...register("examination_expense")}
                      />
                    </Stack>

                    {/* Carting Charging  Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Carting Charges"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.carting_charges}
                      />
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Carting Charges"
                        placeholder="Enter Carting Charges"
                        {...register("carting_charge")}
                      />
                    </Stack>

                    {/* Cargo Charges Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        label="Cargo charges"
                        variant="standard"
                        fullWidth
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.cargo_charges}
                      />
                      <TextField
                        label="Cargo charges"
                        placeholder="Enter cargo charges"
                        variant="standard"
                        fullWidth
                        {...register("cargo_sorting")}
                      />
                    </Stack>

                    {/* Opening & Repacking Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        label="Opening & repacking"
                        variant="standard"
                        fullWidth
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.opening_repacking}
                      />
                      <TextField
                        label="Opening & repacking"
                        placeholder="Enter opening & repacking"
                        variant="standard"
                        fullWidth
                        {...register("opening_repacking")}
                      />
                    </Stack>

                    {/* Other 1 Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        fullWidth
                        label="Other 1"
                        variant="standard"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.other1}
                      />
                      <TextField
                        fullWidth
                        label="Other 1"
                        variant="standard"
                        placeholder="Enter other 1"
                        {...register("other_one")}
                      />
                    </Stack>

                    {/* Other 2 Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        fullWidth
                        label="Other 2"
                        variant="standard"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.other2}
                      />
                      <TextField
                        fullWidth
                        label="Other 2"
                        variant="standard"
                        placeholder="Enter other 2"
                        {...register("other_two")}
                      />
                    </Stack>

                    {/* Other 3 Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        fullWidth
                        label="Other 3"
                        variant="standard"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.other3 || 0}
                      />
                      <TextField
                        fullWidth
                        label="Other 3"
                        variant="standard"
                        placeholder="Enter other 3"
                        {...register("other_three")}
                      />
                    </Stack>

                    {/* Other 4 Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        fullWidth
                        label="Other 4"
                        variant="standard"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.other4 || 0}
                      />
                      <TextField
                        fullWidth
                        label="Other 4"
                        variant="standard"
                        placeholder="Enter other 4"
                        {...register("other_four")}
                      />
                    </Stack>

                    {/* Other 5 Fields */}
                    <Stack spacing={3} direction={"row"} mb={3}>
                      <TextField
                        fullWidth
                        label="Other 5"
                        variant="standard"
                        inputProps={{ readOnly: true }}
                        defaultValue={voucher.other5 || 0}
                      />
                      <TextField
                        fullWidth
                        label="Other 5"
                        variant="standard"
                        placeholder="Enter other 5"
                        {...register("other_five")}
                      />
                    </Stack>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                      }}
                    >
                      <h4 style={{ width: "50%" }}>
                        Requested amount total : {voucher.total_amount}
                      </h4>
                      <h4>Approved amount total : {calculateTotalAmount()}</h4>
                    </Stack>

                    <Button
                      type="submit"
                      className="button"
                      label="Update Voucher"
                    />
                  </Box>
                </form>
              ))}
            </>
          )}
        </div>
      </Typography>
    </Box>
  );
}