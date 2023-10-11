import React, {useContext} from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GetAppIcon from '@material-ui/icons/GetApp';
import DownloadPopover from "../../../components/pops/DownloadPopover";
import {JobContext} from "../../../providers/JobProvider";

export default function Toolbar() {

    const jobContext = useContext(JobContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper elevation={2} className={"Toolbar"}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button variant="contained" color="secondary" onClick={jobContext.generate}
                            fullWidth>Generate</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" fullWidth endIcon={<GetAppIcon/>}
                            onClick={handleClick}>Download</Button>
                    <DownloadPopover onClose={handleClose} anchorEl={anchorEl} jobId={jobContext.id}/>
                </Grid>
            </Grid>
        </Paper>
    )
}