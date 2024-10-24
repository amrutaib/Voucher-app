import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material/styles";
import  Grid  from '@mui/material/Grid';
import HomeIcon from '@mui/material/Icon';
import UserIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";

import "./style.css";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
export default function Dashboard() {
    const theme = useTheme();


  return (
    <Box
      sx={{
        mt: 15,
        ml: 40,
        mr:20,
        textAlign: "center",
        [theme.breakpoints.down("md")]: {
          ml: 22,
        },
        [theme.breakpoints.down("sm")]: {
          ml: 18,
        },
      }}
    >
        <Grid container spacing={2}>
        <Link to="/Userlist">
        <Grid size={10}>
        <Card sx={{ minWidth:400 }}  className='gradientpink'>
        <CardContent>
          <Typography  variant='div' className='roundedBox'  >
            <UserIcon sx={{mt:3}}/>
        </Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary',ml:4,fontSize: 14 }}>
        </Typography>
        <Typography sx={{ color: 'text.secondary',mt:3, mb: 1.5 }}>Users</Typography>
        <Typography variant="body2" sx={{fontSize:20}}>        
          6
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">4</Button> */}
      </CardActions>
    </Card>
    </Grid>
    </Link>
    <Link to="/Payment">
    <Grid size={8}  sx={{ml:5}}> 
        <Card sx={{ minWidth: 400 }} className='gradientblue'>
        <CardContent>
        <Typography  variant='div' className='roundedBox'  >

        <AllInclusiveIcon  sx={{mt:3}}/>
        </Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary',ml:4,fontSize: 14 }}>
        </Typography>
        <Typography sx={{ color: 'text.secondary',mt:3, mb: 1.5,fontSize:16 }}>Pending Voucher</Typography>
        <Typography variant="body2" sx={{fontSize:20}}>        
          6
        </Typography>
         </CardContent>
         <CardActions>
         {/* <Button size="small">Learn More</Button> */}
         </CardActions>
       </Card>
    </Grid>
    </Link>
    </Grid>
    </Box>
  );
}