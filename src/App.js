import React from "react";
import {
  Error,
  Login,
  Voucher,
  AddUser,
  Payment,
  Userlist,
  Dashboard,
  UserProfile,
  Destination,
  UserPayment,
  EditUser,
  PrivateRoute,
  UserVoucherList,
} from "./components/index";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Accessing your defined KEYS in .env file
console.log(process.env.REACT_API_KEY);
const theme = createTheme({
  typography: {
    fontFamily: "Mulish, sans-serif",
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
        element: <Voucher />,
      },
      {
        path: "Payment",
        element: <Payment />,
      },
      {
        path: "UserProfile",
        element: <UserProfile />,
      },
      {
        path: "userpayment",
        element: <UserPayment />,
      },
      {
        path: "adduser",
        element: <AddUser />,
      },
      {
        path: "UserVoucher",
        element: <UserVoucherList />,
      },
      {
        path: "editUser/:Id",
        element: <EditUser />,
      },
      {
        path: "Destination",
        element: (
          <PrivateRoute>
            <Destination />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
