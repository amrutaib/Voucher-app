import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import MuiCard from '@mui/material/Card';
import { BASE_URL } from '../../config/api';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { SitemarkIcon } from '../../components/Login/CustomIcon';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';  //icons
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
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleClickShowPassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (event) => {

        event.preventDefault();
        setError(false)
        setErrorMessage('')
        const URL = `${BASE_URL}/admin/login`;
        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const password = data.get("password");

        let isValid = true;

        // Validate username
        if (!username) {
            setUsernameError(true);
            setUsernameErrorMessage('Please enter username.');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
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
            const body = JSON.stringify({
                username: username, // Update to use username
                Password: password
            });
            axios.post(URL, body)
                .then(function (response) {
                    const data = response.data;
                    console.log(data, "DATA")
                    if (data.status === 0) {
                        setError(true)
                        setErrorMessage(data.message)
                    } else {
                        console.warn(data, "DATA")
                        toast.current.show({ severity: 'success', summary: 'Success', detail: data.message });
                    }
                })
                .catch((error) => {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: error.message });
                });
        }
    };

    return (
        <Card variant="outlined" theme={theme} sx={{ borderRadius: 5, fontFamily: '' }}>
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
                onSubmit={handleLogin}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >
                <FormControl>
                    <FormLabel htmlFor="email" sx={{ fontFamily: 'Mulish', mb: 1 }}>Username</FormLabel>
                    <TextField
                        id="username"
                        name="username"
                        autoFocus
                        required
                        fullWidth
                        error={usernameError}
                        variant="outlined"
                        autoComplete="username"
                        placeholder="your-username"
                        helperText={usernameErrorMessage}
                        color={usernameError ? 'error' : 'primary'}
                        sx={{
                            ariaLabel: 'username',
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
                                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="email" sx={{ fontFamily: 'Mulish', mb: 1 }}>Username</FormLabel>
                    <TextField
                        id="username"
                        name="username"
                        autoFocus
                        required
                        fullWidth
                        error={usernameError}
                        variant="outlined"
                        autoComplete="username"
                        placeholder="your-username"
                        helperText={usernameErrorMessage}
                        color={usernameError ? 'error' : 'primary'}
                        sx={{
                            ariaLabel: 'username',
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
                                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>

                <Button type="submit" className='button' fullWidth variant="contained" sx={{ my: 1 }}>
                    Sign in
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
