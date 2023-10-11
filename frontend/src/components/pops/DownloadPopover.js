import Popover from "@material-ui/core/Popover";
import * as React from "react";
import {useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import axios from "axios"
import {config} from "../../Constants";
import {UserContext} from "../../providers/UserProvider";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {navigate} from "@reach/router";

const reader = new FileReader();

export default function DownloadPopover(props) {

    const open = Boolean(props.anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [failed, setFailed] = useState();
    const [loading, setLoading] = useState([]);

    const user = useContext(UserContext);

    function addToLoading(format) {
        const temp = [...loading];
        temp.push(format);
        setLoading(temp);
    }

    function removeFromLoading(format) {
        const temp = loading.filter((item) => item !== format);
        setLoading(temp);
    }

    async function download(format) {

        addToLoading(format);
        if (!user) {
            setFailed(NotSignedIn);
            return;
        }


        if (format === "4k" || format === "SVG") {
            if (user.amount <= 0) {
                setFailed(InsufficientFunds);
                return;
            }
        }

        const data = {uid: user ? user.uid : null, format: format, job: props.jobId};
        axios.get(config.backendUrl + "download", {params: data, responseType: 'blob'})
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'MyWordcloud_' + format + (format !== "SVG" ? '.png' : ".svg"));
                document.body.appendChild(link);
                link.click();

                removeFromLoading(format);
            }).catch(error => {
            setFailed(Unknown);
            removeFromLoading(format);
        })

    }

    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={props.anchorEl}
                onClose={props.onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Grid container>
                    <Grid item xs={12} justify={"center"} alignItems={"center"}>
                        {
                            contains("720p", loading) ? <CircularProgress/> :
                                <Button fullWidth onClick={() => download("720p")}>720p</Button>
                        }
                    </Grid>
                    <Grid item xs={12} justify={"center"} alignItems={"center"}>
                        {
                            contains("1080p", loading) ? <CircularProgress/> :
                                <Button fullWidth onClick={() => download("1080p")}>1080p</Button>
                        }
                    </Grid>
                    <Divider/>
                    <Grid item xs={12} justify={"center"} alignItems={"center"}>
                        {
                            contains("4k", loading) ? <CircularProgress/> :
                                <Button fullWidth onClick={() => download("4k")}
                                        endIcon={<MonetizationOnIcon/>}>4k</Button>
                        }

                    </Grid>
                    <Grid item xs={12} justify={"center"} alignItems={"center"}>
                        {
                            contains("SVG", loading) ? <CircularProgress/> :
                                <Button fullWidth onClick={() => download("SVG")}
                                        endIcon={<MonetizationOnIcon/>}>SVG</Button>
                        }
                    </Grid>
                </Grid>

            </Popover>

            <Snackbar open={failed} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }} autoHideDuration={10000} onClose={() => {
                setFailed(null)
            }}>
                <Alert severity="error" onClose={() => {
                    setFailed(null)
                }}>
                    {failed}</Alert>
            </Snackbar>
        </div>
    )

}

function contains(format, loading) {
    for (let i = 0; i < loading.length; i++) {
        if (loading[i] === format) {
            return true;
        }
    }
    return false;
}

function NotSignedIn() {

    return (
        <Typography variant={"body2"}>
            You are not signed in. <Link to={"/signin"} onClick={() => navigate("/signin")}>Sign in.</Link>
        </Typography>)
}

function InsufficientFunds() {
    return (
        <Typography variant={"body2"}>
            You don't have enough downloads left. <Link to={"/user/plans"} onClick={() => navigate("/user/plans")}>See
            plans.</Link>
        </Typography>)
}

function Unknown(props) {
    return (
        <Typography variant={"body2"}>
            Hmm. Seems like something went wrong. Try again later or <Link href={"mailto:ekertdenis@gmail.com"}>contact
            support</Link>
        </Typography>)
}