import React from "react";
//screens
import {
  Login,
  Scheme,
  AddUser,
  Voucher,
  Payment,
  Register,
  Userlist,
  EditUser,
  Dashboard,
  UserProfile,
  Destination,
  UserPayment,
  EditVoucher,
  ViewVoucher,
  CustomFields,
  UserVoucherList,
} from './pages/index'
//components
import { Error } from "./components/index";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SuperDashboard from "./pages/dashboard/superadmin";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, sans-serif",
  },
  palette: {
    primary: {
      main: "#303f9f",
    },
    secondary: {
      main: "#7b1fa2",
    },
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
        element: <Dashboard />,
      },
      {
        path: "dashboard",
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
        path: "vouchers",
        element: <Voucher />,
      },
      {
        path: "editVoucher/:Id",
        element: <EditVoucher />,
      },
      {
        path: "viewVoucher/:status/:Id",
        element: <ViewVoucher />,
      },
      //Payment screens
      {
        path: "payment",
        element: <Payment />,
      },
      //destination
      {
        path: "destination",
        element: <Destination />,
      },
      //scheme
      {
        path: "scheme",
        element: <Scheme />,
      },
      //custom fields
      {
        path: "customformfields",
        element: <CustomFields />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);