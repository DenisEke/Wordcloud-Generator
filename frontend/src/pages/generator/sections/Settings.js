import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ColorSettings from "./settings/color-settings/ColorSettings";
import WordSettings from "./settings/word-settings/WordSettings";
import FontSettings from "./settings/font-settings/FontSettings";
import MaskSettings from "./settings/mask-settings/MaskSettings";

export default function Settings(props) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={2}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>Word settings</Typography>
                    <Typography className={classes.secondaryHeading}>Choose your words</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <WordSettings/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')} elevation={2}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>Font</Typography>
                    <Typography className={classes.secondaryHeading}>Choose one of our many awesome fonts
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FontSettings/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'maskPanel'} onChange={handleChange('maskPanel')} elevation={2}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography className={classes.heading}>Mask</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Choose a fitting shape for you cloud
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <MaskSettings/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'colorPanel'} onChange={handleChange('colorPanel')} elevation={2}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography className={classes.heading}>Colors</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Create a beautiful color scheme
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <ColorSettings/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )

}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));