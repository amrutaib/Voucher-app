import React, { useRef } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Toast } from 'primereact/toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api_routes, BASE_URL } from '../../config/api';
import { Button, MenuItem, Select, InputLabel, FormControl, Box, TextField, Typography, Grid } from '@mui/material';

export default function AddUser() {

    //ref 
    const toast = useRef(null);
    const navigate = useNavigate()

    //react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const URL = `${BASE_URL}${api_routes.add_user}`
        axios.post(URL, data)
            .then(function (response) {
                const data = response.data
                if (data.status === 200) {
                    setTimeout(() => navigate('/userslist'), 500)
                    toast.current.show({ severity: 'success', summary: 'Error', detail: data.message, life: 2000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                }
                console.log(response.data);

            })
            .catch((error) => console.log(error))
    };


    return (
        <Box
            sx={{
                p: 3,
                mt: 10,
                flexGrow: 1,
                display: 'flex',
            }}
        >
            <Toast ref={toast} />
            <Navbar HeaderTitle='Add New User' />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                    {/* UserName Field */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            {...register('userName', { required: 'Username is required' })}
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
                            placeholder='Enter name'
                        />
                    </Grid>

                    {/* Password Field */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            {...register('userPassword', { required: 'Password is required' })}
                            error={!!errors.userPassword}
                            helperText={errors.userPassword?.message}
                        />
                    </Grid>

                    {/* Email Field */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>

                    {/* Mobile Field */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Mobile"
                            variant="outlined"
                            {...register('Mobile', {
                                required: 'Mobile number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Enter a valid 10-digit mobile number',
                                },
                            })}
                            error={!!errors.Mobile}
                            helperText={errors.Mobile?.message}
                        />
                    </Grid>

                    {/* UserType Field */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>User Type</InputLabel>
                            <Select
                                label="User Type"
                                defaultValue=""
                                {...register('userType', { required: 'User type is required' })}
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

        </Box>
    );
}