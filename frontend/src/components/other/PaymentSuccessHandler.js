import {useLocation} from "@reach/router";
import {parse} from "query-string"
import React, {useEffect, useState} from "react";
import Alert from "../pops/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export default function PaymentSuccessHandler(props) {
    const location = useLocation();
    const queryParams = parse(location.search);

    const [success, setSuccess] = useState(0);
    const [canceled, setCanceled] = useState(false);

    useEffect(() => {

        if (queryParams.success) {
            setTimeout(function () {
                setSuccess(queryParams.success);
                delete queryParams.success;
            }, 1000);
        }
        if (queryParams.canceled) {
            setTimeout(function () {
                setCanceled(true);
                delete queryParams.canceled;
            }, 1000);
        }

    }, []);


    function handleCloseSuccess(event, reason) {
        setSuccess(false)
    }

    function handleCloseCanceled(event, reason) {
        setCanceled(false)
    }

    return (
        <div>
            <Snackbar open={success} autoHideDuration={4000} onClose={handleCloseSuccess}>
                <Alert severity="success" onClose={handleCloseSuccess}>
                    You successfully bought {success} new downloads
                </Alert>
            </Snackbar>
            <Snackbar open={canceled} autoHideDuration={6000} onClose={handleCloseCanceled}>
                <Alert severity="error" onClose={handleCloseCanceled}>
                    Something went wrong. Try again maybe it will work this time.
                </Alert>
            </Snackbar>
        </div>
    )
}
