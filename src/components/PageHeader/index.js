import React from "react";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
export default function PageHeader(){
    return(
        <Box
        sx={{
            p: 3,
            mt: 10,
            flexGrow: 1,
            
        }}
    >
    <Typography variant="div" gutterBottom >
    <div className="container card-alert card purple">
        <div className="card-content white-text">
            <p>All Users</p>
        </div>
    </div>
    </Typography>
    </Box>
    )
}