import React from 'react';
import './landing.css';
import Grid from "@material-ui/core/Grid";
import Hero from "./sections/Hero";
import SocialProof from "./sections/SocialProof";
import Features from "./sections/Features";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {navigate} from "@reach/router";

export default function Landing() {

    return (
        <div className={"LandingRoot"}>
            <Grid container spacing={10}>
                <Grid item xs={12}>
                    <Hero/>
                </Grid>
                <Grid item xs={12}>
                    <SocialProof className={"sectionPadding"}/>
                </Grid>
                <Grid item xs={12}>
                    <Features/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color={"primary"} endIcon={<ArrowForwardIcon/>} className={"lastCTA"}
                            onClick={() => {
                                navigate("/generator");
                            }}>See the generator</Button>
                </Grid>
            </Grid>
        </div>
    )

}