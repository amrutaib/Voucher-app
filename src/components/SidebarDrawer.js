import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BsFillInfoSquareFill } from "react-icons/bs";
import UserIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { NavLink, Outlet } from "react-router-dom";

import MoneyIcon from '@mui/icons-material/Money';
import PaymentIcon from '@mui/icons-material/Payment';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SchemaIcon from '@mui/icons-material/Schema';
export default function SidebarDrawer() {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 220,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            [theme.breakpoints.down("md")]: {
              width: 150,
            },
            [theme.breakpoints.down("sm")]: {
              width: 120,
            },
          },
        }}
      >
        <Box sx={{ overflow: "auto", mt: 8 }}>
        <nav>
        {/* <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}><BsFillInfoSquareFill /> Dashboard</NavLink>
        <NavLink to="/Userlist" className={({ isActive }) => (isActive ? 'active' : '')}>                    <UserIcon />
        Userlist</NavLink>
        <NavLink to="/Voucher" className={({ isActive }) => (isActive ? 'active' : '')}>                    <MoneyIcon />
           Voucher</NavLink>
        <NavLink to="/Payment" className={({ isActive }) => (isActive ? 'active' : '')}>                    <PaymentIcon />
           Payment</NavLink> */}
     
          <List>
            <Link to="/Dashboard">
              <ListItem key="Dashboard" disablePadding className={({ isActive }) => (isActive ? 'active' : '')}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <BsFillInfoSquareFill />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" sx={{ ml: -2 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/Userlist">
              <ListItem key="Users" disablePadding className={({ isActive }) => (isActive ? 'active' : '')}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <UserIcon />
                  </ListItemIcon>
                  <ListItemText primary="User" sx={{ ml: -2 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/Voucher">
              <ListItem key="Payment Summary" disablePadding className={({ isActive }) => (isActive ? 'active' : '')}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Voucher" sx={{ ml: -2 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/Payment">
              <ListItem key="Payment Summary" disablePadding className={({ isActive }) => (isActive ? 'active' : '')}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <PaymentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Payment Summary" sx={{ ml: -2 }} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/Destination">
              <ListItem key="Payment Summary" disablePadding className={({ isActive }) => (isActive ? 'active' : '')}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <AddLocationAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Destination" sx={{ ml: -2 }} className={({ isActive }) => (isActive ? 'active' : '')}/>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/Scheme">
              <ListItem key="Scheme" disablePadding className={({ isActive }) => (isActive ? 'active' : '')}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <SchemaIcon />
                  </ListItemIcon>
                  <ListItemText primary="Scheme" sx={{ ml: -2 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          </nav>
        </Box>
      </Drawer>
    </Box>
  );
}
