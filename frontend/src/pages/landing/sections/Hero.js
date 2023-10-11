import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {navigate} from "@reach/router";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import Paper from "@material-ui/core/Paper";


export default function Hero(props) {

    return (
        <Grid container spacing={3}
              justify="center"
              alignItems="center">
            <Grid item xs={12}>
                <Typography variant={"h4"} component={"h1"}>Want to create a Wordcloud? - Use our fast and simple
                    Generator.</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h5"} component={"h2"}>Enter some words, choose a shape, select a font, create a
                    color scheme and -voilà you got your cloud! </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => navigate("/generator")}
                        endIcon={<ArrowForwardIcon/>}>
                    See the generator</Button>
            </Grid>
            <Grid item xs={5}>
                <Paper elevation={1}>
                    <img className={"HeroImage"} src={"/examples/example_1.png"}/>
                </Paper>
            </Grid>
        </Grid>
    )

}