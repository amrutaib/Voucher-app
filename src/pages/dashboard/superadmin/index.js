import React, { useEffect, useState, useRef } from "react";
import "../../style.css";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { BASE_URL, TOKEN } from "../../../config/api";
import { Navbar, Loader } from "../../../components/index";
import { MdOutlinePendingActions } from "react-icons/md";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  CardActions,
  Box,
  Card,
  Typography,
  Grid,
  Avatar,
} from "@mui/material/index";

export default function SuperDashboard() {
  //ref
  const toast = useRef(null);

  //states
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(null);
  const [clientCount, setClientCount] = useState(null);

  //clientId
  const clientId = localStorage.getItem("clientId");

  const fetchUsersCount = () => {
    const URL = `${BASE_URL}/clientcount/`;
    fetch(URL, {
      method: "get",
      headers: {
        clientid: clientId,
        Authorization: TOKEN,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUserCount(data?.userscount)})
      .catch((err) =>
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.message,
          life: 3000,
        })
      )
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (clientId) {
      fetchUsersCount();
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Client ID is missing",
        life: 3000,
      });
      setLoading(false);
    }
  }, [clientId]);

  const fetchClientsCount = () => {
    const URL = `${BASE_URL}/clientcount/`;
    fetch(URL, {
      method: "get",
      headers: {
        clientid: clientId,
        Authorization: TOKEN,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => { console.log(data)
        setClientCount(data?.clientscount)})
      .catch((err) =>
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.message,
          life: 3000,
        })
      )
      .finally(() =>
        setLoading(false));
  };

  useEffect(() => {
    if (clientId) {
      fetchClientsCount();
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Client ID is missing",
        life: 3000,
      });
      setLoading(false);
    }
  }, [clientId]);

  const CardComponent = ({ route, avatar, title, count, className }) => {
    return (
      <Link to={route}>
        <Grid p={2} spacing={1}>
          <Card
            sx={{ minWidth: 350, p: "20px", borderRadius: "5px" }}
            className={className}
          >
            <CardActions
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Avatar
                sx={{ bgcolor: "rgba(0, 0, 0, 0.18)", width: 50, height: 50 }}
              >
                {avatar}
              </Avatar>
              <Typography sx={{ fontSize: 22, color: "#fff" }}>
                {count}
              </Typography>
            </CardActions>
            <Typography
              sx={{ textAlign: "left", mt: "10px" }}
              variant="h6"
              color={"#FFF"}
            >
              {title}
            </Typography>
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
        display: "flex",
      }}
    >
      <Navbar HeaderTitle=" Super Admin Dashboard" />
      <Toast ref={toast} />
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          <CardComponent
            title={"Clients"}
            route={"/clientList"}
            count={clientCount | 0}
            className={"gradientpink"}
            avatar={<PersonOutlineOutlinedIcon />}
          />
          <CardComponent
            ml={5}
            route={"/userslist"}
            count={userCount | 0}
            title={"Users"}
            className={"gradientblue"}
            avatar={<MdOutlinePendingActions size={20} />}
          />
        </Grid>
      )}
    </Box>
  );
}
