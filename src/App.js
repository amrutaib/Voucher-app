import React from "react";
import { Voucher, Error, PrivateRoute, Login, Destination, Dashboard, Payment, Userlist, Navbar } from "./components/index";
import { createBrowserRouter, Outlet } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Mulish, sans-serif',
  },
});


export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Outlet />
    </ThemeProvider>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "Userlist",
        element: <Userlist />,
      },
      {
        path: "Voucher",
        element:
          <Voucher />
      },
      {
        path: "Payment",
        element:
          <Payment />
      },
      {
        path: "Destination",
        element: (
          <PrivateRoute>
            <Destination />
          </PrivateRoute>
        ),
      }
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
