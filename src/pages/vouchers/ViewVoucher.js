import React, { useRef, useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useParams } from "react-router-dom";
import { BASE_URL, TOKEN } from "../../config/api";
import { Loader, Navbar } from "../../components/index";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function ViewVoucher() {

    const { Id } = useParams();

    //ref
    const toast = useRef(null);
    //states
    const [admin, setAdmin] = useState([]);
    const [voucher, setVoucher] = useState([]);
    const [loading, setLoading] = useState(true);

    //fetch Voucher with the params Id
    async function fetchVoucher() {
        const URL = `${BASE_URL}/voucher/editvoucher/`;
        try {
            const response = await axios.get(URL, {
                headers: {
                    voucherno: Id,
                    Authorization: TOKEN,
                    "Content-Type": "application/json"
                }
            });
            const result = response.data;
            setVoucher(result);
            console.log(response, "RESponse from voucher");
        } catch (error) {
            toast.current.show({ severity: "error", summary: "Error", detail: error.message, life: 3000 });
        } finally {
            setLoading(false);
        }
    }
    async function fetchAdmindetails() {
        const URL = `${BASE_URL}/admin/login/`;
        try {
            const response = await axios.get(URL, {
                headers: {
                    clientid: localStorage.getItem("clientId"),
                    Authorization: TOKEN,
                    "Content-Type": "application/json",
                }
            });
            const result = response.data;
            setAdmin(result);
        } catch (error) {
            toast.current.show({ severity: "error", summary: "Error", detail: error.message, life: 3000 });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVoucher();
        fetchAdmindetails();
    }, []);

    const AddNewUser = () => (
        <div variant="h4" gutterBottom color="primary">
            {admin.map(admin => (
                <h1 className="text-center">{admin.CompanyName}</h1>
            ))}
        </div>
    );

    return (
        <Box
            sx={{
                p: 3,
                mt: 10,
                flexGrow: 1,
                display: "flex",
            }}
        >
            <Navbar HeaderTitle="View Voucher" />
            <Typography variant="body1" gutterBottom sx={{ width: "100vw" }}>
                <Toast ref={toast} />

                {voucher.map((item, index) => (
                    <Container Width="40%">
                        <Box
                            sx={{
                                bgcolor: "#cfe8fc",
                                padding: "20px",
                            }}
                        >
                            {/* Invoice Information */}
                            <AddNewUser />
                            <Grid item xs={12} md={12} sx={{ textAlign: { md: "right" } }}>
                                <adminName />
                                <ArrowCircleDownIcon />
                            </Grid>
                            <Grid item xs={12} md={12} sx={{ textAlign: { md: "Left" } }}>
                                <Typography variant="h4" gutterBottom color="primary">
                                    Voucher
                                </Typography>
                                <Typography variant="body1">
                                    Voucher Number: {item.voucher_no}
                                </Typography>
                                <Typography variant="body1">Date: {item.Date}</Typography>
                            </Grid>
                            {/* Client Information */}
                            <Grid container spacing={2}>
                                <Grid item md={4}>
                                    <p variant="h6" gutterBottom color="primary">
                                        Shipper Name:{item.seller}
                                    </p>
                                    <p variant="h6" gutterBottom color="primary">
                                        S/B NO:{item.sb_no}
                                    </p>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <item>
                                        <p variant="h6" gutterBottom color="primary">
                                            Truck Number:{item.truck_number}
                                        </p>
                                        <p variant="h6" gutterBottom color="primary">
                                            Destination:{item.destination}
                                        </p>
                                    </item>
                                </Grid>

                                <Grid item md={4}>
                                    <p variant="h6" gutterBottom color="primary">
                                        Job No:{item.job_no}
                                    </p>
                                    <p variant="h6" gutterBottom color="primary">
                                        PKGS:{item.pkgs}
                                    </p>
                                </Grid>
                            </Grid>

                            {/* Services Table */}
                            <Grid item xs={10}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: "primary.main" }}>
                                                <TableCell sx={{ color: "white" }}>
                                                    PARTICULAR
                                                </TableCell>
                                                <TableCell sx={{ color: "white" }}>
                                                    Requested Amount
                                                </TableCell>
                                                <TableCell sx={{ color: "white" }}>
                                                    Approved Amount
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow key={index}>
                                                <TableCell>CMS CHARGES AS PER RECEIPT </TableCell>
                                                <TableCell>{item.cmc_charges}</TableCell>
                                                <TableCell>{item.updatedCmsCharges}</TableCell>
                                            </TableRow>
                                            <TableRow key={index}>
                                                <TableCell>UNLOADING </TableCell>
                                                <TableCell>{item.unloading}</TableCell>
                                                <TableCell>{item.updatedUnloading}</TableCell>
                                            </TableRow>
                                            <TableRow key={index}>
                                                <TableCell>EXAMINATION EXPENSES 5 0</TableCell>
                                                <TableCell>{item.examination_expenses}</TableCell>
                                                <TableCell>{item.updatedExamination}</TableCell>
                                            </TableRow>
                                            <TableRow key={index}>
                                                <TableCell>CARTING CHARGES </TableCell>
                                                <TableCell>{item.carting_charges}</TableCell>
                                                <TableCell>{item.updatedCarting}</TableCell>
                                            </TableRow>
                                            <TableRow key={index}>
                                                <TableCell>CARGO SORTING </TableCell>
                                                <TableCell>{item.cargo_charges}</TableCell>
                                                <TableCell>{item.updatedCargo}</TableCell>
                                            </TableRow>
                                            <TableRow key={index}>
                                                <TableCell>OPENING & REPACKING </TableCell>
                                                <TableCell>{item.opening_repacking}</TableCell>
                                                <TableCell>{item.updatedOpening}</TableCell>
                                            </TableRow>

                                            {item.other1 !== 0 ? (
                                                <TableRow key={index}>
                                                    <TableCell>OTHER 1 </TableCell>
                                                    <TableCell>{item.other1}</TableCell>
                                                    <TableCell>{item.updateOne}</TableCell>
                                                </TableRow>
                                            ) : (
                                                " "
                                            )}
                                            {item.other2 !== 0 ? (
                                                <TableRow key={index}>
                                                    <TableCell>OTHER 2 </TableCell>
                                                    <TableCell>{item.other2}</TableCell>
                                                    <TableCell>{item.updateTwo}</TableCell>
                                                </TableRow>
                                            ) : (
                                                " "
                                            )}
                                            {item.other3 !== 0 ? (
                                                <TableRow key={index}>
                                                    <TableCell>OTHER 3 </TableCell>
                                                    <TableCell>{item.other3}</TableCell>
                                                    <TableCell>{item.updateOtherthree}</TableCell>
                                                </TableRow>
                                            ) : (
                                                " "
                                            )}
                                            {item.other4 !== 0 ? (
                                                <TableRow key={index}>
                                                    <TableCell>OTHER 4 </TableCell>
                                                    <TableCell>{item.other4}</TableCell>
                                                    <TableCell>{item.updateOtherfour}</TableCell>
                                                </TableRow>
                                            ) : (
                                                " "
                                            )}
                                            {item.other5 !== 0 ? (
                                                <TableRow key={index}>
                                                    <TableCell>OTHER 5 </TableCell>
                                                    <TableCell>{item.other5}</TableCell>
                                                    <TableCell>{item.updateOtherfive}</TableCell>
                                                </TableRow>
                                            ) : (
                                                " "
                                            )}
                                            <TableRow>
                                                <TableCell colSpan={1} align="">
                                                    <Typography variant="h6">Total:</Typography>
                                                </TableCell>
                                                <TableCell colSpan={1}>
                                                    <Typography variant="subtitle1">
                                                        {item.total_amount}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell colSpan={1}>
                                                    <Typography variant="subtitle1">
                                                        {item.approvedAmnt}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow></TableRow>
                                            <TableRow>
                                                <TableCell colSpan={2} align="left">
                                                    <Typography variant="subtitle1">
                                                        Checked by :
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Accountant :
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle1">
                                                        Director :
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Receiver Signature :
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Box>
                    </Container>
                ))}
            </Typography>
        </Box>
    );
}