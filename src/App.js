import React from "react";
import {
  Error,
  Voucher,
  AddUser,
  Payment,
  Userlist,
  EditUser,
  Dashboard,
  UserProfile,
  Destination,
  UserPayment,
  PrivateRoute,
  UserVoucherList,
} from "./components/index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, Outlet } from "react-router-dom"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Mulish, sans-serif',
  },
  palette: {
    primary: {
      main: '#303f9f'
    },
    secondary: {
      main: "#7b1fa2"
    }
  }
});


export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider >
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
      //User routes
      {
        path: "userslist",
        element: <Userlist />,
      },
      {
        path: "userprofile",
        element: <UserProfile />
      },
      {
        path: "userpayment",
        element: <UserPayment />
      },
      {
        path: "adduser",
        element: <AddUser />
      },
      {
        path: "editUser/:Id",
        element: <EditUser />,
      },
      {
        path: "uservouchers",
        element: <UserVoucherList />
      },
      //Voucher screens
      {
        path: "Voucher",
        element:
          <Voucher />
      },
      //Payment screens
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
  {
    path: "register",
    element: <Register />,
  }
]);
