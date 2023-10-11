import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MaskSelector from "./MaskSelector";
import MaskUpload from "./MaskUpload";


function MaskSettings(props) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography>Choose a mask</Typography>
            </Grid>
            <Grid item xs={12}>
                <MaskSelector/>
            </Grid>
            <Grid item xs={12}>
                <Typography>Upload your own Mask</Typography>
            </Grid>
            <Grid item xs={12}>
                <MaskUpload/>
            </Grid>
        </Grid>
    )
}

export default MaskSettings;