import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React, {useContext} from "react";
import {config} from "../../../Constants";
import {makeStyles} from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {navigate} from "@reach/router";
import Button from "@material-ui/core/Button";
import {JobContext} from "../../../providers/JobProvider";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function SocialProof(props) {

    const classes = useStyles();
    const jobContext = useContext(JobContext);

    return (
        <Grid container spacing={7} alignItems={"center"} justify={"center"}>
            <Grid item xs={12}>
                <Typography variant={"h4"}>Check out what other users have created:</Typography>
            </Grid>
            {
                config.socialProof.map((picture) =>
                    <Grid item xs={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Paper>
                                    <img className={classes.exampleImg}
                                         src={picture.url}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper>
                                    <ButtonGroup fullWidth orientation="vertical">
                                        <Button variant="contained" color={"primary"} endIcon={<ArrowForwardIcon/>}
                                                onClick={() => {
                                                    jobContext.set(picture.jobId);
                                                    navigate("/generator");
                                                }}>See in generator</Button>
                                    </ButtonGroup>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }

        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    exampleImg: {
        width: "100%",
        height: "auto"
    }
}));