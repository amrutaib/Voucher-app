import { Box, Typography } from "@mui/material"

export const ProcessingResponse = ({loading,name,error,dataToRender}) => {
  
    return (
        loading ?
        <Box
        sx={{
            display: 'flex',
            height: '70vh',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
        }}
    >
        {/* <FaExclamationTriangle size={140} elevation={3} /> */}
        <Typography variant="h6" component="div" sx={{ mt: 3 }}>
            No vouchers available
        </Typography>
        <Typography variant="body2" color="textSecondary" my={2}>
            No vouchers have been created yet for {name}
        </Typography>
    </Box>
        : error ?
        <p className={"text-center"}> Error</p>
        :
        dataToRender
      )
}
