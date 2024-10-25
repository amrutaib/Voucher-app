import React from "react";
import SidebarDrawer from "./components/SidebarDrawer";
import Navbar from "./components/Navbar";
import Userlist from "./components/Userlist";
import Payment from "./components/Payment";
import Dashboard from './components/Dashboard';
import Destination from "./components/Destination";
import Scheme from "./components/Scheme";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import Voucher from "./components/Voucher";
import { createBrowserRouter, Outlet } from "react-router-dom";
export const App = () => {
  return (
    <div>
      <React.Fragment>
        {/* <Maindrawer /> */}
        <SidebarDrawer />
        <Navbar />
        <Outlet />
      </React.Fragment></div>
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
      },
      {
        path: "Scheme",
        element: (
          <PrivateRoute>
            <Scheme />
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
