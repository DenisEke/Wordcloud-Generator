import React, {useContext} from "react";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {JobContext} from "../../../providers/JobProvider";

export default function Preview() {

    const jobContext = useContext(JobContext);

    return (
        <Paper className="preview-paper" elevation={2}>
            <Info status={jobContext.status} url={jobContext.preview}/>
        </Paper>
    )
}

function Info({status, url}) {

    console.log(status);

    switch (parseInt(status)) {
        case 0:
            return <div className="ProgressWrapper"><CircularProgress/><Typography>INITIATING</Typography></div>;
        case 1:
            return <div className="ProgressWrapper"><CircularProgress/><Typography>STARTING</Typography></div>;
        case 2:
            return <div className="ProgressWrapper"><CircularProgress/><Typography>PREPROCESSING</Typography></div>;
        case 3:
            return <div className="ProgressWrapper"><CircularProgress/><Typography>GENERATING</Typography></div>;
        case 4:
            return <div className="ProgressWrapper"><CircularProgress/><Typography>FINISHING</Typography></div>;
        case 5:
            return <img src={url} alt={"Your generated Wordcloud preview"}/>;
        case 6:
            return <div className="ProgressWrapper"><Typography>Unfortunately something went wrong. Try it again
                later</Typography></div>;
        default:
            return <Typography>Generate something</Typography>
    }
}

