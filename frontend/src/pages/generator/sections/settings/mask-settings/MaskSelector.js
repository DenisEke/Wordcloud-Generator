import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, {useContext, useState} from "react";
import {MaskContext} from "../../../../../providers/MaskProvider";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";


export default function MaskSelector(props) {

    const maskContext = useContext(MaskContext);

    const [expanded, setExpanded] = useState();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Grid item xs={12}>
            {
                maskContext.masks.map((category) =>
                    <ExpansionPanel expanded={expanded === category.id} onChange={handleChange(category.id)}
                                    elevation={3}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>{category.name} - {category.desc}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={1}>
                                {category.masks.map((mask) =>
                                    <Grid item xs={1} onClick={() => maskContext.selectMask(mask)} key={mask.id}>
                                        <img src={mask.path} alt={"Mask Preview"}
                                             className={maskContext.selected === mask.id ? "maskSelected" : "maskPreview"}/>
                                    </Grid>
                                )}
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            }
        </Grid>
    )
}