import React from 'react';
import "../style.css";
import { Link } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { CardActions, Box, Card, Typography, useTheme, Grid, Avatar } from '@mui/material/index';

export default function Dashboard() {

  const theme = useTheme();
  const CardComponent = ({ ml, route, avatar, title, count, className }) => {
    return (
      <Link to={route}>
        <Grid sx={{ ml: ml || 0 }}>
          <Card sx={{ minWidth: 400, p: '20px', borderRadius: '5px' }} className={className}>
            <CardActions sx={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Avatar sx={{ bgcolor: 'rgba(0, 0, 0, 0.18)', width: 54, height: 54 }}>
                {avatar}
              </Avatar>
              <Typography sx={{ fontSize: 22, color: '#fff' }}>{count}</Typography>
            </CardActions>
            <Typography sx={{ textAlign: 'left', mt: '10px', color: '#fff' }}>{title}</Typography>
          </Card>
        </Grid>
      </Link>
    );
  };

  return (
    <Box
      sx={{
        mt: 15,
        ml: 40,
        mr: 20,
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
        <CardComponent
          count={'5'}
          title={'Users'}
          route={'/Userlist'}
          avatar={<PersonOutlineOutlinedIcon />}
          className={'gradientpink'}
        />
        <CardComponent
          ml={5}
          count={'5'}
          route={'/Payment'}
          title={'Pending Voucher'}
          className={'gradientblue'}
          avatar={<MdOutlinePendingActions size={20} />}
        />
      </Grid>
    </Box>
  );
}
