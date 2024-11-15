import React, { useEffect, useState, useRef } from 'react';
import "../style.css";
import Navbar from '../Navbar';
import Loader from '../Loader';
import { Link } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { BASE_URL } from '../../config/api';
import { MdOutlinePendingActions } from "react-icons/md";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { CardActions, Box, Card, Typography, Grid, Avatar } from '@mui/material/index';

export default function Dashboard() {

  //ref
  const toast = useRef(null);

  //states
  const [loading, setLoading] = useState(true)
  const [dataCount, setCount] = useState({
    user: null,
    vouchers: null
  })


  const fetchCounts = () => {
    fetch(BASE_URL, {
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
      .catch((err) => toast.current.show({
        severity: 'error', summary: 'Error', detail: err.message, life: 3000
      }))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  const CardComponent = ({ ml, route, avatar, title, count, className }) => {
    return (
      <Link to={route}>
        <Grid p={2} spacing={1}>
          <Card sx={{ minWidth: 350, p: '20px', borderRadius: '5px' }} className={className}>
            <CardActions sx={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Avatar sx={{ bgcolor: 'rgba(0, 0, 0, 0.18)', width: 50, height: 50 }}>
                {avatar}
              </Avatar>
              <Typography sx={{ fontSize: 22, color: '#fff' }}>{count}</Typography>
            </CardActions>
            <Typography sx={{ textAlign: 'left', mt: '10px' }} variant='h6' color={'#FFF'}>{title}</Typography>
          </Card>
        </Grid>
      </Link>
    );
  };

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
      <Toast ref={toast} />
      {
        loading ? <Loader /> :
          <Grid container spacing={2}>
            <CardComponent
              title={'Users'}
              route={'/userslist'}
              count={dataCount.user | 0}
              className={'gradientpink'}
              avatar={<PersonOutlineOutlinedIcon />}
            />
            <CardComponent
              ml={5}
              route={'/Voucher'}
              count={dataCount.vouchers | 0}
              title={'Pending Voucher'}
              className={'gradientblue'}
              avatar={<MdOutlinePendingActions size={20} />}
            />
          </Grid>
      }
    </Box>
  );
}
