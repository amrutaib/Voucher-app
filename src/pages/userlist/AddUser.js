import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/index';
import { api_routes, BASE_URL, TOKEN } from '../../config/api';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { MenuItem, Select, InputLabel, FormControl, Box, TextField, Typography, Stack, InputAdornment, IconButton } from '@mui/material';

export default function AddUser() {

    //ref 
    const toast = useRef(null);
    const navigate = useNavigate()

    //states
    const [showPassword, setShowPassword] = useState(false);

    //react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = async (data) => {
        const clientId = localStorage.getItem('clientId')
        const newData = { ...data, clientid: clientId };
        const URL = `${BASE_URL}${api_routes.add_user}/`
        const headers = {
            'Authorization': TOKEN,
            'Content-Type': 'application/json',
        }
        axios.post(URL, newData, { headers })
            .then(function (response) {
                const data = response.data
                console.log(data.message, "DATA")
                if (data.status === 200) {
                    setTimeout(() => navigate('/userslist'), 1000)
                    toast.current.show({ severity: 'success', summary: 'Success', detail: data.message, life: 2000 });
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
                }
            })
            .catch((error) => console.log(error))
    };


    return (
        <Box
            sx={{
                p: 3,
                mt: 10,
                flexGrow: 1,
                display: 'flex'
            }}
        >
            <Navbar HeaderTitle='Add New User' />
            <Typography variant="body1" gutterBottom sx={{ width: '100vw' }}>
                <div>
                    <Toast ref={toast} />
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: '8px',
                                alignItems: 'center',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                            }}>
                            <Stack spacing={3} direction={"row"} mb={3}>
                                {/* Add Username */}
                                <TextField
                                    fullWidth
                                    label="Username"
                                    variant="outlined"
                                    {...register('userName', { required: 'Username is required' })}
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                    placeholder='Enter name'
                                />
                                {/* Add User password */}
                                <TextField
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    error={!!errors.userPassword}
                                    type={showPassword ? 'text' : 'password'}
                                    helperText={errors.userPassword?.message}
                                    {...register('userPassword', { required: 'Password is required' })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={togglePasswordVisibility}
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>

                            <Stack spacing={3} direction={"row"} mb={3}>
                                {/* Add Mobile */}
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
                                {/* Add Email */}
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
                            </Stack>

                            <Stack spacing={3} direction={"row"} mb={5}>
                                {/* Add User type */}
                                <FormControl variant="outlined" sx={{ width: '50%' }}>
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
                            </Stack>

                            <Button label="Submit" type='submit' className='button' />
                        </Box>
                    </form>
                </div>
            </Typography>
        </Box>
    );
}
