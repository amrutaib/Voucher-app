import { React, useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const NavBarHeader = () => {

    const theme = useTheme();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //fetch email & password form localstorage
    const getEmail = localStorage.getItem("emailData");
    const getPassword = localStorage.getItem("passwordData");

    useEffect(() => {
        if (!getEmail && !getPassword) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [getEmail, getPassword]);

    const handleClick = () => {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate("/login");
    };

    return (
        <Toolbar sx={{ position: 'absolute', right: '20px' }}>
            <Link to="/user">
                <IconButton title="User">
                    <AccountCircleIcon
                        sx={{
                            mr: '10px',
                            fontSize: 40,
                            color: "#e6f0ff",
                            "&:hover": { bgcolor: "#e6e6e6" },
                            [theme.breakpoints.down("md")]: { fontSize: 30 },
                            [theme.breakpoints.down("sm")]: { fontSize: 25 }
                        }}
                    />
                </IconButton>
            </Link>
            {
                isLoggedIn ? (
                    <Button
                        sx={{
                            color: "black",
                            bgcolor: "#e6f0ff",
                            "&:hover": { bgcolor: "#e6e6e6" },
                            [theme.breakpoints.down("md")]: { fontSize: 10 },
                            [theme.breakpoints.down("sm")]: { fontSize: 6 }
                        }}
                        onClick={handleClick}
                    >
                        Logout
                    </Button>
                ) : (
                    <Link to="/login">
                        <Button
                            sx={{
                                color: "black",
                                bgcolor: "#e6f0ff",
                                "&:hover": { bgcolor: "#e6e6e6" }
                            }}
                        >
                            Login
                        </Button>
                    </Link>
                )
            }
        </Toolbar>
    );
}

export default NavBarHeader
