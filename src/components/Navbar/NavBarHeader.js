import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Toolbar, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBarHeader = () => {

    const theme = useTheme();

    return (
        <Toolbar sx={{ position: 'absolute', right: '20px' }}>
            <Link to="/UserProfile">
                <Tooltip title='User profile'>
                    <AccountCircleIcon
                        sx={{
                            mr: '20px',
                            fontSize: 35,
                            color: "#e6f0ff",
                            [theme.breakpoints.down("md")]: { fontSize: 30 },
                            [theme.breakpoints.down("sm")]: { fontSize: 25 }
                        }}
                    />
                </Tooltip>
            </Link>

            <Link to="/login">
                <Tooltip title='Log Out'>
                    <LogoutIcon
                        sx={{
                            fontSize: 30,
                            color: "#e6f0ff",
                            [theme.breakpoints.down("md")]: { fontSize: 30 },
                            [theme.breakpoints.down("sm")]: { fontSize: 25 }
                        }}
                    />
                </Tooltip>
            </Link>
        </Toolbar>
    );
}

export default NavBarHeader
