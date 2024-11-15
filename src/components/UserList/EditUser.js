import React, { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { api_routes, BASE_URL } from "../../config/api";
import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

export default function EditUser() {
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const type = queryParameters.get("type");
  const name = queryParameters.get("name");
  //ref
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [userData, setUserData] = useState(null);
  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { Id } = useParams();
  console.log("this.context:", Id);

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    console.log(name);
    const URL = `${BASE_URL}${api_routes.edit_user}${Id}`;
    // var URL = `https://c5da-110-226-177-100.ngrok-free.app/user/${Id}`;
    fetch(`https://d386-103-167-123-102.ngrok-free.app/api/user/${Id}`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInputs(data);
        setLoading(false);
        console.log(data, "DATA");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  const onSubmit = async (data) => {
    axios
      .put(`https://d386-103-167-123-102.ngrok-free.app/user/${Id}/edit`, data)
      .then(function (response) {
        const data = response.data;
        //   console.log(data.json());
        if (data.status === 200) {
          setTimeout(() => navigate("/usersList"), 2000);
          toast.current.show({
            severity: "success",
            summary: "success",
            detail: data.message,
            life: 2000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: data.message,
            life: 3000,
          });
        }
        console.log(response.data);
      })
      .catch((error) => console.log(error));
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
      <Navbar HeaderTitle="Edit User" />
      <Toast ref={toast} />

      {/* map over the users array */}
      {inputs.map((user) => (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {/* UserName Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                {...register("userName", { required: "Username is required" })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                placeholder="Enter name"
                defaultValue={user.userName}
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                {...register("userPassword", {
                  required: "Password is required",
                })}
                error={!!errors.userPassword}
                helperText={errors.userPassword?.message}
                defaultValue={user.userPassword}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                defaultValue={user.email}
              />
            </Grid>

            {/* Mobile Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile"
                variant="outlined"
                {...register("Mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
                error={!!errors.Mobile}
                helperText={errors.Mobile?.message}
                defaultValue={user.Mobile}
              />
            </Grid>

            {/* UserType Field */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>User Type</InputLabel>
                <Select
                  label="User Type"
                  defaultValue={user.userType}
                  {...register("userType", {
                    required: "User type is required",
                  })}
                  error={!!errors.userType}
                >
                  <MenuItem value="Import">Import</MenuItem>
                  <MenuItem value="Export">Export</MenuItem>
                </Select>
                {errors.userType && (
                  <Typography color="error" variant="body2">
                    {errors.userType.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          {/* Right-Aligned Submit Button */}
          <Box display="flex" justifyContent="flex-start" mt={5}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      ))}
    </Box>
  );
}
