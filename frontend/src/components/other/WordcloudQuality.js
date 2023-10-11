import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import React from "react";


export default function WordcloudQuality(props) {

    const download = (path, format) => {
        const element = document.createElement("a");
        const file = new Blob(
            [
                path
            ],
            {type: "image/*"}
        );
        element.href = URL.createObjectURL(file);
        element.download = format;
        element.click();
    };

    return (
        <Paper className="padding">
            <Grid container
                  spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        You can checkout the quality of the wordclouds here:
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" fullWidth
                            onClick={() => download("/quality/svg.svg", "svg.svg")}>SVG</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" fullWidth onClick={() => download("/quality/4k.png", "4k.png")}>PNG
                        4k</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" fullWidth onClick={() => download("/quality/1080p.png", "1080p.png")}>PNG
                        1080p</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" fullWidth onClick={() => download("/quality/720p.png", "720p.png")}>PNG
                        720p</Button>
                </Grid>
            </Grid>
        </Paper>
    )

}