import React, { useEffect, useState, useRef } from "react";
import "../style.css";
import Navbar from "../Navbar";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { BASE_URL } from "../../config/api";
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

export default function Dashboard() {
  const [dataCount, setUserCount] = useState();
  const [voucherCount, setVoucherCount] = useState();

  //ref
  const toast = useRef(null);

  //states
  const [loading, setLoading] = useState(true);

  const fetchUsersCounts = () => {
    fetch(BASE_URL, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.length);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const fetchVouchersCounts = () => {
    //const URL = `${BASE_URL}${api_routes.voucher.voucherCount}`;
    var URL =
      "https://410c-2400-7f60-205-99cf-c129-b3ff-f074-53d0.ngrok-free.app/voucher/VoucherCount";
    fetch(URL, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setVoucherCount(data.length);
      })
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
    fetchUsersCounts();
    fetchVouchersCounts();
  }, []);

  const CardComponent = ({ ml, route, avatar, title, count, className }) => {
    return (
      <Link to={route}>
        <Grid sx={{ ml: ml || 0 }}>
          <Card
            sx={{ minWidth: 400, p: "20px", borderRadius: "5px" }}
            className={className}
          >
            <CardActions
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Avatar
                sx={{ bgcolor: "rgba(0, 0, 0, 0.18)", width: 54, height: 54 }}
              >
                {avatar}
              </Avatar>
              <Typography sx={{ fontSize: 22, color: "#fff" }}>
                {count}
              </Typography>
            </CardActions>
            <Typography sx={{ textAlign: "left", mt: "10px", color: "#fff" }}>
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
      <Navbar />
      <Grid container spacing={2}>
        <CardComponent
          title={"Users"}
          route={"/Userlist"}
          count={dataCount}
          className={"gradientpink"}
          avatar={<PersonOutlineOutlinedIcon />}
        />
        <CardComponent
          ml={5}
          route={"/Voucher"}
          count={voucherCount}
          title={"Pending Voucher"}
          className={"gradientblue"}
          avatar={<MdOutlinePendingActions size={20} />}
        />
      </Grid>
    </Box>
  );
}
