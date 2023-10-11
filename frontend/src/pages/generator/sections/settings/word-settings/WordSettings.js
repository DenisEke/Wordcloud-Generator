import Grid from "@material-ui/core/Grid";
import React from "react";
import WordList from "./WordList";
import AdvancedWordSettings from "./AdvancedWordSettings";
import PersistWordList from "./PersistWordList";
import Divider from "@material-ui/core/Divider";
import EasyWords from "./EasyWords";


function WordSettings(props) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Divider/>
            </Grid>

            <Grid item xs={12}>
                <PersistWordList/>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <EasyWords/>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <WordList/>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>

            <Grid item xs={12}>
                <AdvancedWordSettings/>
            </Grid>
        </Grid>
    )

}

export default WordSettings;