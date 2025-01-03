import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { BASE_URL, TOKEN } from "../../config/api";
import { Navbar, Loader } from "../../components/index";
import { Avatar, Box, Typography, Container, Paper, styled } from "@mui/material";
import { getCookie } from "../../components/common/utils";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4]
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  fontSize: "2.5rem",
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)"
  }
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    alignItems: "center"
  }
}));

export default function UserProfile() {

  //ref
  const toast = useRef(null);

  //states
  const [loading, setLoading] = useState(true)
  const [UserData, setUserData] = useState(null)

  const fetchUserProfile = () => {
    const clientId = getCookie("clientId")
    const URL = `${BASE_URL}/admin/login/${clientId}`
    fetch(URL, {
      method: "get",
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data[0]))
      .catch((err) => toast.current.show({
        severity: 'error', summary: 'Error', detail: err.message, life: 3000
      }))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchUserProfile()
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        mt: 10,
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <Navbar HeaderTitle={'User Profile'} />
      <Toast ref={toast} />
      {loading ? (<Loader />) :
        (
          <Container maxWidth="sm">
            <StyledPaper elevation={3}>
              <Box position="relative">
                <StyledAvatar aria-label="User avatar">{UserData.CompanyName.charAt(0)}</StyledAvatar>
              </Box>
              <InfoContainer>
                <Typography variant="h5" component="h1" fontWeight="bold" aria-label="Username">
                  {UserData.CompanyName}
                </Typography>
                <Typography color="text.secondary" aria-label="Email">
                  {UserData.adminEmail}
                </Typography>
                <Typography color="primary" aria-label="Role">
                  {UserData.userrole}
                </Typography>
              </InfoContainer>
            </StyledPaper>
          </Container>
        )
      }
    </Box>
  );
}
