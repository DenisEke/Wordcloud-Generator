import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Divider from "@material-ui/core/Divider";


const features = [
    {
        icon: "text.png",
        header: "Worried it might be hard to add words?",
        description: "Worry no more. Just paste your text and we will take care of the rest. " +
            "Want to save your wordlist? - just download it! You can even upload it then at a later time!"
    },
    {
        icon: "color.png",
        header: "Your idea is to unique to create it using a generator?",
        description: "We provide you with lots of customization options. " +
            "Want to choose a distinct font - we got you. " +
            "Want a custom mask - we got you! Want a very dense cloud - we got you." +
            "Want to create a custom color scheme - we got you." +
            "Using this generator you can unleash your full creativity!"
    },
    {
        icon: "formats.png",
        header: "But can I download it in my format?",
        description: "We support the most often used formats. " +
            "You can download your cloud in PNG in 720, 1080 and 4k resolution. " +
            "You can also download your cloud in SVG format."
    },
    {
        icon: "pricing.png",
        header: "Isn't this too expensive?",
        description: "It is always less expensive than a designer or than wasting your time placing the words manually. " +
            "Since your clouds are generated in the cloud we charge a small fee for the SVG and 4k version. You can find detailed pricing under user>plans"
    },
];


export default function Features(props) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant={"h4"}>
                    Still not convinced?
                </Typography>
            </Grid>
            {
                features.map((feature, index) => <Grid item xs={12}>
                    <Feature feature={feature} odd={(index % 2 === 0)}/>
                    {index != features.length - 1 ? <Divider/> : null}
                </Grid>)
            }
        </Grid>
    )

}

function Feature(props) {

    const {odd} = props;
    const {icon, header, description} = props.feature;

    if (odd) {
        return (
            <div className={"featurePaper"}>
                <Grid container spacing={3} justify="center"
                      alignItems="center">
                    <Grid item xs={7}>
                        <Typography variant={"h5"}>
                            {header}
                        </Typography>
                        <Typography variant={"body1"}>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <img src={"./landing/" + icon} className={"featureImage"}/>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return (
        <div className={"featurePaper"}>
            <Grid container spacing={3} justify="center"
                  alignItems="center">
                <Grid item xs={4}>
                    <img src={"./landing/" + icon} className={"featureImage"}/>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant={"h5"}>
                        {header}
                    </Typography>
                    <Typography variant={"body1"}>
                        {description}
                    </Typography>
                </Grid></Grid>
        </div>
    )

}