import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../providers/UserProvider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {firestore} from "firebase";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DownloadPopover from "../../../components/pops/DownloadPopover";
import {JobContext} from "../../../providers/JobProvider";
import {navigate} from "@reach/router";
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Typography from "@material-ui/core/Typography";

export default function WordClouds(props) {
    const user = useContext(UserContext);

    const [wordclouds, setWordclouds] = useState([]);
    const [amount, setAmount] = useState(12);

    const jobContext = useContext(JobContext);

    useEffect(() => {

        let observer = null;

        if (observer) {
            observer()
        }

        let query = firestore().collection("previews").where('uid', '==', user.uid).orderBy("created", "desc").limit(108);
        observer = query.onSnapshot(querySnapshot => {
            const newWordclouds = [];

            querySnapshot.forEach(
                (doc) => doc.data().path ? newWordclouds.push({id: doc.id, ...doc.data()}) : null);

            console.log(newWordclouds);
            setWordclouds(newWordclouds);
        }, err => {
            console.log(`Encountered error: ${err}`);
        });


        return () => {
            if (observer) {
                observer()
            }
        }
    }, [setWordclouds]);

    function loadMore() {
        console.log(amount, wordclouds);
        setAmount(amount + 8);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [jobId, setJobId] = React.useState(null);

    const handleClick = (event, jobId) => {
        setAnchorEl(event.currentTarget);
        setJobId(jobId);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (wordclouds.length <= 0) {
        return (
            <Typography>You don't have created any wordclouds yet</Typography>
        )
    }

    return (
        <Grid container spacing={4}>
            {
                wordclouds.map((wc, index) =>
                    (index >= amount) ? null :
                        <Grid item xs={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper className="wordcloud-paper">
                                        <img className="wordcloud-paper-img" src={wc.path}/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper>
                                        <ButtonGroup fullWidth orientation="vertical">
                                            <Button variant="outlined" color={"secondary"} endIcon={<ArrowForwardIcon/>}
                                                    onClick={() => {
                                                        jobContext.set(wc.id);
                                                        navigate("/generator");
                                                    }}>See in generator</Button>
                                            <Button variant="contained" color={"secondary"} endIcon={<GetAppIcon/>}
                                                    onClick={(event) => handleClick(event, wc.id)}>Download</Button>
                                        </ButtonGroup>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>)
            }
            {
                amount < 100 && amount <= wordclouds.length ? <Grid item xs={12}>
                    <Button variant={"outlined"} color={"primary"} onClick={loadMore}>Load more</Button>
                </Grid> : null
            }
            <DownloadPopover onClose={handleClose} anchorEl={anchorEl} jobId={jobId}/>
        </Grid>
    )
}