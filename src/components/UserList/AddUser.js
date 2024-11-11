import React, { useState, useRef } from 'react';
import Navbar from '../Navbar';
import { Toast } from 'primereact/toast';
import { useForm, Controller } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, MenuItem, Select, InputLabel, FormControl, Grid, Box, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
///icons
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SecurityUpdateGoodOutlinedIcon from '@mui/icons-material/SecurityUpdateGoodOutlined';

export default function AddUser() {

    //ref 
    const toast = useRef(null);

    const { handleSubmit, control, formState: { errors } } = useForm();
    const [userType, setUserType] = useState('');

    const onSubmit = (data) => {
        console.log('Form Data:', data);
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
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
            <Navbar HeaderTitle='Add New User' />
            <Toast ref={toast} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* Name */}
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                                <FormControl sx={{ width: '50ch', my: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        label="Name"
                                        error={!!errors.name}
                                        helperText={errors.name ? errors.name.message : ''}
                                        endAdornment={<InputAdornment position="end"><PersonOutlinedIcon /></InputAdornment>}
                                    />
                                </FormControl>
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required", minLength: { value: 6, message: "Password should be at least 6 characters" } }}
                            render={({ field }) => (
                                <FormControl sx={{ width: '50ch', ml: '20px', my: 1 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        error={!!errors.password}
                                        helperText={errors.password ? errors.password.message : ''}
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        {/* Email */}
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email address"
                                }
                            }}
                            render={({ field }) => (
                                <FormControl sx={{ width: '50ch', my: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        label="Email"
                                        id="outlined-adornment-name"
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : ''}
                                        endAdornment={<InputAdornment position="end"><MailOutlinedIcon /></InputAdornment>}
                                    />
                                </FormControl>
                            )}
                        />

                        {/* Mobile Number */}
                        <Controller
                            name="mobile"
                            control={control}
                            rules={{
                                required: "Mobile number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Enter a valid mobile number (10 digits)"
                                }
                            }}
                            render={({ field }) => (
                                <FormControl sx={{ width: '50ch', my: 1, ml: '20px' }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Mobile</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        label="Email"
                                        error={!!errors.mobile}
                                        id="outlined-adornment-name"
                                        helperText={errors.mobile ? errors.mobile.message : ''}
                                        endAdornment={<InputAdornment position="end"><SecurityUpdateGoodOutlinedIcon /></InputAdornment>}
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid>

                    {/* User Type */}
                    <Grid item xs={12}>
                        <FormControl variant="outlined">
                            <InputLabel>User Type</InputLabel>
                            <Select
                                label="User Type"
                                value={userType}
                                sx={{ width: '50ch' }}
                                onChange={(e) => setUserType(e.target.value)}
                                error={userType === ''}
                            >
                                <MenuItem value="">
                                    <em>Select User Type</em>
                                </MenuItem>
                                <MenuItem value="Import">Import</MenuItem>
                                <MenuItem value="Export">Export</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            sx={{ padding: '10px', fontWeight: 'bold' }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}