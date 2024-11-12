import React from "react";
import SidebarDrawer from "./components/SidebarDrawer";
import Navbar from "./components/Navbar/Navbar";
import Userlist from "./components/UserList";
import Payment from "./components/Payment";
import Dashboard from "./components/Dashboard";
import Destination from "./components/Destination";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import Voucher from "./components/Voucher";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Mulish, sans-serif",
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <SidebarDrawer /> */}
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
        element: <Voucher />,
      },
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
