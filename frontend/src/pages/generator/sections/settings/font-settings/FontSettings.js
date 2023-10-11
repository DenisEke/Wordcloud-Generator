import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React, {useContext} from "react";
import {FontContext} from "../../../../../providers/FontProvider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";

function FontSettings(props) {

    const fontContext = useContext(FontContext);

    if (fontContext.fonts.length < 1 || !fontContext.fonts) {
        return (
            <Typography>
                Fonts are loading...
            </Typography>
        )
    }

    return (
        <Grid container spacing={3}>

            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="fontSelectionLabel">Choose your font</InputLabel>
                    <Select
                        variant="outlined"
                        label="Choose your font"
                        labelId="fontSelectionLabel"
                        id="fontSelection"
                        value={fontContext.font}
                        onChange={(event) => fontContext.changeFont(event.target.value)}
                    >
                        {
                            fontContext.fonts.map((font, i) => <MenuItem key={font.family} value={i}>
                                <Box fontFamily={font.family}>
                                    {font.family}
                                </Box></MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="fontTypeSelectionLabel">Choose the font type</InputLabel>
                    <Select
                        variant="outlined"
                        label="Choose your font type"
                        labelId="fontTypeSelectionLabel"
                        id="fontTypeSelection"
                        value={fontContext.fontType}
                        onChange={(event) => fontContext.changeFontType(event.target.value)}
                    >
                        {
                            fontContext.fonts[fontContext.font].variants.map((type, i) =>
                                <MenuItem key={type} value={i}>
                                    <Box fontFamily={fontContext.fonts[fontContext.font].family} fontWeight={type}>
                                        {type}
                                    </Box>
                                </MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography id="fontSizeRangeSlider" gutterBottom>
                    Font size range
                </Typography>
                <Slider
                    value={fontContext.fontSize}
                    onChange={fontContext.changeSize}
                    valueLabelDisplay="auto"
                    aria-labelledby="fontSizeRangeSlider"
                />
                <Typography>
                    When the max value is hundred I count it as infinity
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography id="fontStepSlider" gutterBottom>
                    Step size
                </Typography>
                <Slider
                    value={fontContext.fontStep}
                    onChange={fontContext.changeStep}
                    min={1}
                    max={5}
                    step={1}
                    valueLabelDisplay="auto"
                    aria-labelledby="fontStepSlider"
                />
                <Typography>
                    When its bigger than 1 it speeds up computation but makes less tight fits
                </Typography>
            </Grid>
        </Grid>
    )

}

export default FontSettings;