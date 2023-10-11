import Grid from "@material-ui/core/Grid";
import {ChromePicker} from "react-color";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, {useContext, useState} from "react";
import {ColorContext} from "../../../../../providers/ColorsProvider";

export default function ColorSchemeCreation(props) {

    const colorContext = useContext(ColorContext);
    const [color, setColor] = useState('#000');
    let boxWidth = 100 / colorContext.length;

    function handleColor(color) {
        setColor(color.hex);
    }

    function addColor() {
        colorContext.addColor(color);
    }

    function removeColor(event, _color) {
        colorContext.removeColor(_color);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    Create your color scheme:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <ChromePicker width={"100%"} color={color} onChange={handleColor} disableAlpha/>
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={1} direction="row" alignItems="stretch">
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={addColor} fullWidth>Add Color</Button>
                    </Grid>
                    <Grid item xs={12} alignItems="center">
                        <div style={{height: "38vh", overflowY: "scroll"}}>
                            {colorContext.colors.map((_color) =>
                                <Box bgcolor={_color} width={1 / boxWidth} p={2.5} my={0.75}
                                     onClick={(event) => removeColor(event, _color)}>
                                    <Typography>{_color}</Typography>
                                </Box>)}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}