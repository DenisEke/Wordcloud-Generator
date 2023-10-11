import MuiAlert from "@material-ui/lab/Alert";
import * as React from "react";


export default function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}