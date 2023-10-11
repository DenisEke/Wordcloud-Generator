import React, {useContext, useState} from "react";
import {UserContext} from "../../../providers/UserProvider";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import ListItem from "@material-ui/core/ListItem";
import {navigate} from "@reach/router";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FilterDramaIcon from "@material-ui/icons/FilterDrama";
import FormatPaintIcon from "@material-ui/icons/FormatPaint";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Divider from "@material-ui/core/Divider";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GavelIcon from '@material-ui/icons/Gavel';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import {FirebaseContext} from "../../../providers/FirebaseProvider";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

export default function NavCard() {

    const auth = useContext(FirebaseContext).auth;
    const user = useContext(UserContext);
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                >
                    <Typography gutterBottom variant="h5" component="h3">
                        {user.email}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h4">
                        You have {user.amount} Downloads left
                    </Typography></CardMedia>
                <CardContent className={classes.cardContent}>
                    {
                        /*<ListItem button onClick={() => navigate("/user")}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>*/
                    }
                    <ListItem button onClick={() => navigate("/user/designs")}>
                        <ListItemIcon>
                            <FilterDramaIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Your Wordclouds"/>
                    </ListItem>
                    <ListItem button onClick={() => navigate("/user/masks")}>
                        <ListItemIcon>
                            <FormatPaintIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Your Masks"/>
                    </ListItem>
                    <ListItem button onClick={() => navigate("/user/plans")}>
                        <ListItemIcon>
                            <MonetizationOnIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Premium Plans"/>
                    </ListItem>
                    <ListItem button onClick={() => navigate("/user/payments")}>
                        <ListItemIcon>
                            <ShoppingCartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Payment History"/>
                    </ListItem>
                    <Divider/>
                    <ListItem button onClick={() => navigate("/generator")}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Go to generator"/>
                        <ListItemIcon>
                            <ArrowForwardIcon/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={() => auth.signOut()}>
                        <ListItemIcon>
                            <ExitToAppIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Log out"/>
                        <ListItemIcon>
                            <ArrowForwardIcon/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider/>
                    <ListItem button onClick={() => alert("Hello")}>
                        <ListItemIcon>
                            <HelpOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Contact us"/>
                    </ListItem>
                    <ListItem button onClick={() => setOpen(!open)} disablePadding>
                        <ListItemIcon>
                            <GavelIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Legal"/>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit disablePadding>
                        <List disablePadding button onClick={() => navigate("/user/impressum")}>
                            <ListItem button className={classes.nested}>
                                <ListItemText primary="Impressum"/>
                            </ListItem>
                        </List>
                        <List disablePadding button onClick={() => navigate("/user/privacy")}>
                            <ListItem button className={classes.nested}>
                                <ListItemText primary="Privacy Policy"/>
                            </ListItem>
                        </List>
                        <List disablePadding button onClick={() => navigate("/user/service")}>
                            <ListItem button className={classes.nested}>
                                <ListItemText primary="Terms of service"/>
                            </ListItem>
                        </List>
                    </Collapse>
                </CardContent>
            </Card>
        </div>
    )

}


const useStyles = makeStyles((theme) => ({

    card: {
        width: "100%",
    },
    root: {
        width: '100%',

    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    media: {
        backgroundColor: "#F1F2F4",
        padding: "5%",
        border: "3px solid #73071F",
        borderRadius: "5px 5px 0 0"
    },
    cardContent: {
        padding: 0,
    }
}));