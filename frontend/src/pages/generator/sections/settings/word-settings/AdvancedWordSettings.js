import React, {useContext} from "react";
import {SettingsContext} from "../../../../../providers/SettingsProvider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function AdvancedWordSettings(props) {
    const settingsContext = useContext(SettingsContext);
    const [maxWords, setMaxWords] = React.useState(settingsContext.settings.maxWords);

    const handleWords = (event, newValue) => {
        setMaxWords(newValue);
    };

    function handleRepeat(event) {
        settingsContext.changeSetting("repeat", event.target.checked);
    }

    function updateSettings() {
        settingsContext.changeSetting("maxWords", maxWords);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography id="maxWordsSlider" variant={"h6"}>
                    Advanced word settings
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography id="maxWordsSlider" variant={"body1"}>
                    Word amount:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Slider
                    value={maxWords}
                    min={1}
                    step={1}
                    max={1000}
                    onChange={handleWords}
                    onChangeCommitted={updateSettings}
                    valueLabelDisplay="auto"
                    aria-labelledby="maxWordsSlider"
                />
                {maxWords > 300 ?
                    <Typography variant="body1">More words extend the calculation time</Typography> : null}
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={settingsContext.settings.repeat}
                            onChange={handleRepeat}
                            color="primary"
                        />
                    }
                    label="Repeat the words"
                />
            </Grid>
        </Grid>
    )
}