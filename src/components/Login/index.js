import React, { useState } from 'react';
import {
  Box,
  Link,
  Button,
  styled,
  Stack,
  FormLabel,
  Typography,
  TextField,
  CssBaseline,
  FormControl,
  createTheme,
} from '@mui/material';
import MuiCard from '@mui/material/Card';
import { SitemarkIcon } from './CustomIcon';
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  fontFamily: 'Mulish',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  backgroundColor: '#fdeaeb',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundColor: '#fdeaeb',
  },
}));

export default function Login() {

  const theme = createTheme({
    typography: {
      fontFamily: 'Mulish, sans-serif',
    },
  });

  const navigate = useNavigate();
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter password.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (isValid) {
      const data = new FormData(event.currentTarget);
      const email = data.get("email");
      const password = data.get("password");
      if (email === "admin@gmail.com" && password === "12345") {
        localStorage.setItem("emailData", "admin@gmail.com");
        localStorage.setItem("passwordData", "12345");
        navigate("/");
      } else {
        setError(true)
        setErrorMessage("Please Enter Correct Email or Password");
      }
    }
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between" theme={theme}>
      <CssBaseline />
      <Card variant="elevation">
        <SitemarkIcon />
        <Typography
          sx={{
            width: '100%',
            textAlign: 'center',
            fontFamily: 'Mulish',
            fontSize: 'clamp(1.8rem, 10vw, 2.05rem)',
          }}
        >
          Sign in
        </Typography>
        <Box
          noValidate
          onSubmit={handleLogin}
          component="form"
          sx={{
            gap: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email" sx={{ fontFamily: 'Mulish', mb: '10px' }}>Email</FormLabel>
            <TextField
              id="email"
              type="email"
              name="email"
              autoFocus
              required
              fullWidth
              error={emailError}
              variant="outlined"
              autoComplete="email"
              placeholder="your@email.com"
              helperText={emailErrorMessage}
              color={emailError ? 'error' : 'primary'}
              sx={{
                ariaLabel: 'email',
                fontFamily: 'Mulish',
                "& .MuiFormHelperText-root.Mui-error": {
                  mt: '5px',
                  fontFamily: 'Mulish'
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" sx={{ fontFamily: 'Mulish', mb: '10px' }}>Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
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
            />
          </FormControl>
          <Button
            sx={{ fontFamily: 'Mulish' }}
            type="submit"
            fullWidth
            variant="contained"
          >
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
            Don&apos;t have an account?{' '}
            <span>
              <Link
                variant="body2"
                sx={{ alignSelf: 'center', fontFamily: 'Mulish' }}
              >
                Sign Up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
}