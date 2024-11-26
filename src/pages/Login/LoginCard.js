import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import MuiCard from '@mui/material/Card';
import { BASE_URL } from '../../config/api';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SitemarkIcon from '../../assets/svg/SitemarkIcon';
import { VisibilityOutlined, VisibilityOffOutlined, EmailOutlined } from '@mui/icons-material';  //icons
import { Typography, TextField, Link, FormControl, FormLabel, Button, Box, createTheme, InputAdornment, IconButton } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    }
}));

export default function LoginCard() {

    const theme = createTheme({
        typography: {
            fontFamily: 'Mulish, sans-serif',
        },
    });

    //ref
    const toast = useRef(null);
    const navigate = useNavigate();

    //error messages
    const [errorMessage, setErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    //error visibilty
    const [error, setError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    //password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleClickShowPassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        let isValid = true;

        //clear states
        setError(false)
        setErrorMessage('')

        const URL = `${BASE_URL}/admin/login`;

        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        const requestBody = JSON.stringify({
            email: email,
            Password: password
        });

        // Validate email
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        // Validate password
        if (!password) {
            setPasswordError(true);
            setPasswordErrorMessage('Please enter password.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (isValid) {
            axios.post(URL, requestBody)
                .then(function (response) {
                    const data = response.data;
                    console.log(data, "DATA")
                    if (data.status === 0) {
                        setError(true)
                        setErrorMessage(data.message)
                    } else {
                        localStorage.setItem("token", data.token);
                        toast.current.show({ severity: 'success', summary: 'Success', detail: data.message });
                        navigate("/")
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
                Sign in
            </Typography>
            <Box
                noValidate
                component="form"
                onSubmit={handleLogin}
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >

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
                                    <EmailOutlined />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>

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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {passwordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <Button
                    fullWidth
                    type="submit"
                    className='button'
                    variant="contained"
                    sx={{ my: 1, fontFamily: 'Mulish' }}
                >
                    Sign in
                </Button>

                {/* api error UI */}

                {error && (
                    <Typography sx={{ fontFamily: 'Mulish', textAlign: 'center', color: '#cc0000' }} variant='subtitle2'>
                        {errorMessage}
                    </Typography>
                )}

                <Typography sx={{ textAlign: 'center', fontFamily: 'Mulish' }}>
                    Don&apos;t have an account?{' '}
                    <span>
                        <Link
                            href="/register"
                            variant="body2"
                            sx={{ alignSelf: 'center', fontFamily: 'Mulish' }}
                        >
                            Sign up
                        </Link>
                    </span>
                </Typography>
            </Box>
        </Card>
    );
}
