import Grid from "@material-ui/core/Grid";
import Toolbar from "./sections/Toolbar";
import Settings from "./sections/Settings";
import Preview from "./sections/Preview";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, {useContext} from "react";
import {JobContext} from "../../providers/JobProvider";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Generator() {

    const jobContext = useContext(JobContext);

    if (!jobContext.ready) {
        return (
            <CircularProgress/>
        )
    }

    return (
        <div className="App">
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Toolbar/>
                        </Grid>
                        <Grid item xs={12}>
                            <Settings/>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={"PreviewNote"} elevation={2}>
                                <Typography variant="body2">To achieve faster calculation time the preview is in
                                    720p.
                                    You can always download your wordcloud in a higher resolution or as SVG</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Grid container
                          spacing={2}>
                        <Grid item xs={12}>
                            <Preview/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"caption"}>Debug:
                        id: {" " + jobContext.id} status: {" " + jobContext.status} {jobContext.duration ? " duration: " + jobContext.duration : null}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}