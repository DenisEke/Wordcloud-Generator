import React from "react";
import Grid from "@material-ui/core/Grid";
import NavCard from "./sections/NavCard";

export default function User(props) {

    return (
        <div className={"App"}>
            <Grid container spacing={3} justify={"flex-end"}>

                <Grid item xs={12} lg={3}>
                    <NavCard/>
                </Grid>
                <Grid item xs={12} lg={9}>
                    {props.children}
                </Grid>
            </Grid>
        </div>
    )
}