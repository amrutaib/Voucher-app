import React from "react";
import Box from "@mui/material/Box";
import { Navbar } from "../../components/index";
import Typography from "@mui/material/Typography";

export default function UserProfile() {

  const getEmail = localStorage.getItem("emailData");
  return (
    <Box
      sx={{
        p: 3,
        mt: 10,
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <Navbar />
      <Typography variant="h6">My Email: {getEmail}</Typography>
    </Box>
  );
}
