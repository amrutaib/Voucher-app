import React from "react";
import {
  Error,
  Login,
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
      //User routes
      {
        path: "userslist",
        element: <Userlist />,
      },
      {
        path: "userprofile",
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
        path: "editUser/:Id",
        element: <EditUser />,
      },
      {
        path: "uservouchers/:Id",
        element: <UserVoucherList />,
      },
      //Voucher screens
      {
        path: "Voucher",
        element: <Voucher />,
      },
      //Payment screens
      {
        path: "Payment",
        element: <Payment />,
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
