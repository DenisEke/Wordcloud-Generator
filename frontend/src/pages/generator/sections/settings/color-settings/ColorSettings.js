import React, {useContext, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {SliderPicker} from 'react-color'
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {SettingsContext} from "../../../../../providers/SettingsProvider";
import {MaskContext} from "../../../../../providers/MaskProvider";
import ColorSchemeCreation from "./ColorSchemeCreation";

export default function ColorSettings(props) {

    const maskContext = useContext(MaskContext);
    const settingsContext = useContext(SettingsContext);

    const [bgColor, setBGColor] = useState(settingsContext.settings.backgroundColor);

    function handleBGColor(color) {
        setBGColor(color.hex);
        settingsContext.changeSetting("backgroundColor", color.hex);
    }

    function handleBackground(event) {
        if (event.target.checked) {
            settingsContext.changeSetting("backgroundColor", "#abcdef");
        } else {
            settingsContext.changeSetting("backgroundColor", false);
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={maskContext.useMColor}
                            onChange={maskContext.changeUseMaskColor}
                            color="primary"
                        />
                    }
                    label="Use the color of the mask?"
                />
            </Grid>
            {
                !maskContext.useMColor ?
                    <Grid item xs={12}><ColorSchemeCreation/></Grid> : null
            }
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={settingsContext.settings.backgroundColor}
                            onChange={handleBackground}
                            color="primary"
                        />
                    }
                    label="choose a background?"
                />
            </Grid>
            {
                settingsContext.settings.backgroundColor ?
                    <Grid item xs={12}>
                        <Typography>
                            Setup the right background:
                        </Typography>
                        <SliderPicker color={bgColor} onChangeComplete={handleBGColor}/>
                    </Grid>
                    :
                    null
            }
        </Grid>
    )
}

