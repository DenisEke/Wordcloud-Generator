import Typography from "@material-ui/core/Typography";
import React, {useContext, useState} from "react";
import {UserContext} from "../../../providers/UserProvider";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {format} from "date-fns";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

export default function Payments() {

    const payments = useContext(UserContext).payments;
    const formatter = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"});
    const user = useContext(UserContext);
    const [show, setShow] = useState(false);

    function getTotal() {
        let price = 0, amount = 0, downloads = 0;

        payments.forEach(payment => {
            price += payment.price ? payment.price : 0;
            amount += payment.amount;
            if (payment.amount === -1) {
                downloads += 1;
            }
        });

        return {price: price, amount: amount, downloads: downloads}
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
                    <FormControlLabel
                        control={<Checkbox checked={show} onChange={event => {
                            setShow(!show)
                        }} name="showDownloads"/>}
                        label="Show detailed downloads"
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    {!payments ? <CircularProgress/> :
                        payments.length > 0 ?
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell align={"right"}>Price</TableCell>
                                        <TableCell align={"right"}>Downloads</TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {payments.map((payment) =>
                                        payment.amount === -1 ? (show ? <PaymentRow payment={payment}/> : null) :
                                            <PaymentRow payment={payment}/>
                                    )}
                                    {
                                        !show ? <TableRow>
                                            <TableCell>
                                                All your downloads
                                            </TableCell>
                                            <TableCell>
                                                /
                                            </TableCell>
                                            <TableCell align={"right"}>
                                                /
                                            </TableCell>
                                            <TableCell align={"right"}>
                                                -{getTotal().downloads}
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow> : null
                                    }
                                    <TableRow>
                                        <TableCell>
                                            Total cost and Downloads left
                                        </TableCell>
                                        <TableCell>
                                            {format(Date.now(), "dd.MM.yyyy HH:mm")}
                                        </TableCell>
                                        <TableCell align={"right"}>
                                            {formatter.format(getTotal().price / 100)}
                                        </TableCell>
                                        <TableCell align={"right"}>
                                            {getTotal().amount}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            : <Typography>Seems like you haven't ordered anything</Typography>
                    }
                </TableContainer>
            </Grid>
        </Grid>
    )
}

function PaymentRow(props) {


    const formatter = new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"});
    const {payment} = props;

    return (
        <TableRow key={payment.id}>
            <TableCell>{payment.description}</TableCell>
            <TableCell>{format(new Date(payment.created.seconds * 1000), "dd.MM.yyyy HH:mm")}</TableCell>
            <TableCell
                align={"right"}>{payment.price ? formatter.format(payment.price / 100) : "/"}</TableCell>
            <TableCell align={"right"}>{payment.amount}</TableCell>
            <TableCell>{payment.id}</TableCell>
            <TableCell><Button fullWidth size={"small"} variant={"outlined"}
                               color={"secondary"}
                               onClick={() => window.open("mailto:ekertdenis@gmail.com")}>Contact
                support</Button></TableCell>
        </TableRow>
    )
}

