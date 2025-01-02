import React, { useEffect } from "react";
import  { isTokenExpired, logOut } from "../../utils/logOut";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBarHeader = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token'); 
        
        if (token && isTokenExpired(token)) {
            logOut(navigate); 
        }
    }, [navigate]);

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

            <IconButton onClick={() => logOut(navigate)}>
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
            </IconButton>

        </Toolbar>
    );
}

export default NavBarHeader
