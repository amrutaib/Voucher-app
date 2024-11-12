import React, { useEffect, useState } from 'react';
import "../style.css";
import Navbar from '../Navbar';
import { Link } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { CardActions, Box, Card, Typography, Grid, Avatar } from '@mui/material/index';

export default function Dashboard() {

  const [dataCount, setCount] = useState({
    user: null,
    vouchers: null
  })
  const [loading, setLoading] = useState(true)

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

  const fetchCounts = () => {
    var URL = 'https://f567-103-167-123-125.ngrok-free.app/';
    fetch(URL, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCount({
          user: data.length,
          vouchers: data.length
        })
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <Box
      sx={{
        p: 5,
        mt: 10,
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <Navbar />
      <Grid container spacing={2}>
        <CardComponent
          title={'Users'}
          route={'/Userlist'}
          count={dataCount.user}
          className={'gradientpink'}
          avatar={<PersonOutlineOutlinedIcon />}
        />
        <CardComponent
          ml={5}
          route={'/Voucher'}
          count={dataCount.vouchers}
          title={'Pending Voucher'}
          className={'gradientblue'}
          avatar={<MdOutlinePendingActions size={20} />}
        />
      </Grid>
    </Box>
  );
}
