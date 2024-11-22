import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import MuiCard from '@mui/material/Card';
import { BASE_URL } from '../../config/api';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { SitemarkIcon } from '../../components/Login/CustomIcon';
import { Visibility, VisibilityOff, AccountCircle, Business, Email } from '@mui/icons-material';  //icons
import { Typography, TextField, Link, FormControl, FormLabel, Button, Box, createTheme, InputAdornment, IconButton } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    }
}));

export default function RegisterCard() {

    const toast = useRef(null);

    const theme = createTheme({
        typography: {
            fontFamily: 'Mulish, sans-serif',
        },
    });

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [companyNameError, setCompanyNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [companyNameErrorMessage, setCompanyNameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleClickShowPassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const URL = `${BASE_URL}/admin/Register`;
        const data = new FormData(event.currentTarget);
        const companyName = data.get("companyName");
        const email = data.get("email");
        const username = data.get("username");
        const password = data.get("password");

        let isValid = true;

        // Validate company name
        if (!companyName) {
            setCompanyNameError(true);
            setCompanyNameErrorMessage('Please enter your company name.');
            isValid = false;
        } else {
            setCompanyNameError(false);
            setCompanyNameErrorMessage('');
        }

        // Validate email
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        // Validate username
        if (!username) {
            setUsernameError(true);
            setUsernameErrorMessage('Please enter a valid username.');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

        // Validate password
        if (!password) {
            setPasswordError(true);
            setPasswordErrorMessage('Please enter a password.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (isValid) {
            const body = JSON.stringify({
                companyname: companyName,
                adminEmail: email,
                username: username,
                Password: password,
            });
            axios.post(URL, body)
                .then(function (response) {
                    const data = response.data;
                    console.log(data, "DATA")
                    if (data.status === 200) {
                        toast.current.show({ severity: 'success', summary: 'Success', detail: data.message });
                        navigate("/login")
                    } else {
                        setError(true)
                        setErrorMessage(data.message)
                    }
                })
                .catch((error) => {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
                });
        }
    };

    return (
        <Card variant="outlined" theme={theme}>
            <Toast ref={toast} />
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <SitemarkIcon />
            </Box>
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', fontWeight: 'bold', fontFamily: 'Mulish' }}
            >
                Sign up
            </Typography>
            <Box
                component="form"
                onSubmit={handleRegister}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >
                {/* Company Name Field */}
                <FormControl>
                    <FormLabel htmlFor="companyName" sx={{ fontFamily: 'Mulish', mb: 1 }}>Company Name</FormLabel>
                    <TextField
                        id="companyName"
                        name="companyName"
                        required
                        fullWidth
                        error={companyNameError}
                        variant="outlined"
                        autoComplete="companyName"
                        placeholder="Your Company Name"
                        helperText={companyNameErrorMessage}
                        color={companyNameError ? 'error' : 'primary'}
                        sx={{
                            fontFamily: 'Mulish',
                            "& .MuiFormHelperText-root.Mui-error": {
                                mt: '5px',
                                fontFamily: 'Mulish'
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Business />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>

                {/* Email Field */}
                <FormControl>
                    <FormLabel htmlFor="email" sx={{ fontFamily: 'Mulish', mb: 1 }}>Email</FormLabel>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        required
                        fullWidth
                        error={emailError}
                        variant="outlined"
                        autoComplete="email"
                        placeholder="your@email.com"
                        helperText={emailErrorMessage}
                        color={emailError ? 'error' : 'primary'}
                        sx={{
                            fontFamily: 'Mulish',
                            "& .MuiFormHelperText-root.Mui-error": {
                                mt: '5px',
                                fontFamily: 'Mulish'
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>

                {/* Username Field */}
                <FormControl>
                    <FormLabel htmlFor="username" sx={{ fontFamily: 'Mulish', mb: 1 }}>Username</FormLabel>
                    <TextField
                        id="username"
                        name="username"
                        required
                        fullWidth
                        error={usernameError}
                        variant="outlined"
                        autoComplete="username"
                        placeholder="Your Username"
                        helperText={usernameErrorMessage}
                        color={usernameError ? 'error' : 'primary'}
                        sx={{
                            fontFamily: 'Mulish',
                            "& .MuiFormHelperText-root.Mui-error": {
                                mt: '5px',
                                fontFamily: 'Mulish'
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>

                {/* Password Field */}
                <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormLabel htmlFor="password" sx={{ fontFamily: 'Mulish', mb: 1 }}>Password</FormLabel>
                    </Box>
                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type={passwordVisible ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        sx={{
                            fontFamily: 'Mulish',
                            "& .MuiFormHelperText-root.Mui-error": {
                                mt: '5px',
                                fontFamily: 'Mulish'
                            },
                        }}
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>

                {/* Submit Button */}
                <Button type="submit" className='button' fullWidth variant="contained" sx={{ my: 1, fontFamily: 'Mulish', fontWeight: '600' }}>
                    Register
                </Button>
                {
                    error &&
                    <Typography
                        sx={{
                            fontFamily: 'Mulish',
                            textAlign: 'center',
                            color: '#cc0000'
                        }}
                        variant='subtitle2'
                    >
                        {errorMessage}
                    </Typography>
                }
                <Typography sx={{ textAlign: 'center', fontFamily: 'Mulish' }}>
                    Already have an account?{' '}
                    <span>
                        <Link
                            href="/login"
                            variant="body2"
                            sx={{ alignSelf: 'center', fontFamily: 'Mulish' }}
                        >
                            Login
                        </Link>
                    </span>
                </Typography>
            </Box>
        </Card>
    );
}
