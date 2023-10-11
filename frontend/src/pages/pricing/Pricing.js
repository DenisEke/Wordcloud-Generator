import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import WordcloudQuality from "../../components/other/WordcloudQuality";
import PacksPlan from "./plans/PacksPlan";

export default function Pricing() {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className="padding">
                    <Typography variant="h4">
                        Plans
                    </Typography>
                    <Typography variant="body1">Choose one of our many options to download get your premium
                        downloads</Typography>
                    <Grid container spacing={4}>
                        <Grid item lg={4}>
                            <div className="plan">
                                <Typography variant={"h6"}>
                                    One unlimited month
                                </Typography><br/>
                                <Typography variant={"h3"}>
                                    24,99$
                                </Typography>
                                <Typography variant={"body1"}>One-Time-Payment</Typography>
                                <br/>
                                <Button variant="outlined" color="secondary" disabled={true}>
                                    Coming soon ...
                                </Button>
                            </div>
                        </Grid>
                        <Grid item lg={4}>
                            <PacksPlan/>
                        </Grid>
                        <Grid item lg={4}>
                            <div className="plan">
                                <Typography variant={"h6"}>
                                    One unlimited year
                                </Typography>
                                <br/>
                                <Typography variant={"h3"}>
                                    249,99$
                                </Typography>
                                <Typography variant={"body1"}>One-Time-Payment</Typography>
                                <br/>
                                <Button variant="contained" color="primary" disabled={true}>
                                    Coming soon...
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={"faqpaper"}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant={"h3"}>Frequently asked questions</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h6"} align={"left"}>How can I request a refund?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"} align={"left"}>
                                Yes it is so easy!
                                Just go to the user page and then to payment history and click on contact support.
                                Please state the ID of the payment you want a refund for.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h6"} align={"left"}>Is there a way I can checkout the quality
                                before?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"} align={"left"}>You can checkout the quality of our premium
                                formats at the bottom of this page.
                                Just click on the button with the format you want to checkout!</Typography>
                        </Grid>
                    </Grid>

                </Paper>
            </Grid>
            <Grid item xs={12}>
                <WordcloudQuality/>
            </Grid>
        </Grid>
    )
}
