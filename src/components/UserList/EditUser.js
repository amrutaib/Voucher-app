import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { BASE_URL } from "../../config/api";
import { useNavigate, useParams } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";

export default function EditUser() {
  const { Id } = useParams();
  const navigate = useNavigate();

  //ref
  const toast = useRef(null);
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    console.log(Id);

    //  const URL = `${BASE_URL}/api/user/${Id}`;
    fetch(
      `https://410c-2400-7f60-205-99cf-c129-b3ff-f074-53d0.ngrok-free.app/api/user/${Id}`,
      {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    )
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
    const URL = `${BASE_URL}/api/user/${Id}`;
    axios
      .put(URL, data)
      .then(function (response) {
        const data = response.data;
        if (data.status === 200) {
          setTimeout(() => navigate("/userslist"), 500);
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
      <Navbar HeaderTitle="Add New User" />
      <Typography variant="body1" gutterBottom sx={{ width: "100vw" }}>
        <div>
          <Toast ref={toast} />

          {/* map over the users array */}

          {inputs.map((user) => (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "8px",
                  alignItems: "center",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Stack spacing={3} direction={"row"} mb={3}>
                  {/* UserName Field */}
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    {...register("userName", {
                      required: "Username is required",
                    })}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                    placeholder="Enter name"
                    defaultValue={user.userName}
                  />
                  {/* Password Field */}
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    {...register("userPassword", {
                      required: "Password is required",
                    })}
                    error={!!errors.userPassword}
                    defaultValue={user.userPassword}
                    helperText={errors.userPassword?.message}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={togglePasswordVisibility}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Stack spacing={3} direction={"row"} mb={3}>
                  {/* Email Field */}
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    defaultValue={user.email}
                  />
                  {/* Mobile Field */}
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
                </Stack>

                <Stack spacing={3} direction={"row"} mb={5}>
                  {/* Add User type */}
                  <FormControl variant="outlined" sx={{ width: "50%" }}>
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
                </Stack>
                <Button label="Update User" type="submit" className="button" />
              </Box>
            </form>
          ))}
        </div>
      </Typography>
    </Box>
  );
}
