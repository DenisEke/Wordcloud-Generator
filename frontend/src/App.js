import React, {useContext} from 'react';
import './App.css';
import Typography from "@material-ui/core/Typography";
import WordsProvider from "./providers/WordsProvider";
import ColorProvider from "./providers/ColorsProvider";
import SettingsProvider from "./providers/SettingsProvider";
import FontProvider from "./providers/FontProvider";
import MaskProvider from "./providers/MaskProvider";
import UserProvider, {UserContext} from "./providers/UserProvider";
import {LocationProvider, navigate, Redirect, Router, useLocation} from "@reach/router";
import Generator from "./pages/generator/Generator";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import User from "./pages/user/User";
import Landing from "./pages/landing/Landing";
import NotFound from "./pages/NotFound";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import {default as MToolbar} from '@material-ui/core/Toolbar';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import WordClouds from "./pages/user/sections/Wordclouds";
import Masks from "./pages/user/sections/Masks";
import Admin from "./pages/Admin";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import JobProvider from "./providers/JobProvider";
import Pricing from "./pages/pricing/Pricing";
import Payments from "./pages/user/sections/Payments";
import PaymentSuccessHandler from "./components/other/PaymentSuccessHandler";
import FirebaseProvider from "./providers/FirebaseProvider";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Link from "@material-ui/core/Link";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Impressum from "./pages/legal/Impressum";
import TermsOfService from "./pages/legal/TermsOfService";
import Experimental from "./pages/experimental/ExperimentalPage";
import Promo from "./pages/promo/Promo";


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#73071F',
            main: '#73071F',
            dark: '#73071F',
            contrastText: '#FFF',
        },
        secondary: {
            light: '#3F4D59',
            main: '#3F4D59',
            dark: '#3F4D59',
            contrastText: '#FFF',
        },
    },
});

function Routing() {

    const user = useContext(UserContext);

    if (user) {
        return (
            <div>
                <Router>
                    <PrivacyPolicy path="/terms/privacy"/>
                    <Impressum path="/terms/impressum"/>
                    <TermsOfService path="/terms/service"/>
                    <NotFound default/>
                    <Landing path="/"/>
                    <User path="user">
                        <Payments path="payments"/>
                        <WordClouds path="designs"/>
                        <WordClouds path="/"/>
                        <Pricing path="plans"/>
                        <Masks path="masks"/>
                        <PrivacyPolicy path="privacy"/>
                        <Impressum path="impressum"/>
                        <TermsOfService path="service"/>
                    </User>
                    <Promo path={"promo"}/>
                    <Experimental path={"/experimental"}/>
                    <Generator path="/generator"/>
                    <Redirect to={"/user"} from={"/signin"} noThrow/>
                    <Redirect to={"/user"} from={"/signup"} noThrow/>
                    {
                        /*
                        TODO: Check if /admin route exists in production
                         */
                        (process.env.NODE_ENV === "development") ?
                            <Admin path={"admin"}/>
                            :
                            <Redirect to={"/user"} from={"admin"} noThrow/>
                    }
                </Router>
                <PaymentSuccessHandler/>
            </div>
        )
    }

    return (
        <div>
            <Router>
                <NotFound default/>
                <Landing path="/"/>
                <Generator path="/generator"/>
                <SignIn path="signin"/>
                <SignUp path="signup"/>
                <ForgotPassword path="reset"/>
                <Redirect to={"/signin"} from={"/user/*"} noThrow/>
                <Redirect to={"/signin"} from={"/user"} noThrow/>
                <PrivacyPolicy path="/terms/privacy"/>
                <Impressum path="/terms/impressum"/>
                <TermsOfService path="/terms/service"/>
                <Promo path={"promo"}/>
            </Router>
            <PaymentSuccessHandler/>
        </div>
    )
}

function App() {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <FirebaseProvider>
                <UserProvider>
                    <WordsProvider>
                        <MaskProvider>
                            <SettingsProvider>
                                <ColorProvider>
                                    <FontProvider>
                                        <JobProvider>
                                            <LocationProvider>
                                                <div className={"root"}>
                                                    <CssBaseline/>
                                                    <AppBar position="absolute" color="default" elevation={0}
                                                            className={classes.appBar}>
                                                        <MToolbar className={classes.toolbar}>
                                                            <div className={classes.titleWrapper}
                                                                 onClick={() => navigate("/")}>
                                                                <FilterDramaIcon fontSize="large"/>
                                                                <Typography component="h1" variant="h4"
                                                                            color="inherit"
                                                                            noWrap
                                                                            className={classes.title}>
                                                                    Wordclouds
                                                                </Typography>
                                                            </div>
                                                            <CallToAction/>
                                                        </MToolbar>
                                                    </AppBar>
                                                    <div className={"Content"}>
                                                        <div className={classes.appBarSpacer}/>
                                                        <Routing/>
                                                        <Copyright/>
                                                    </div>
                                                </div>
                                            </LocationProvider>
                                        </JobProvider>
                                    </FontProvider>
                                </ColorProvider>
                            </SettingsProvider>
                        </MaskProvider>
                    </WordsProvider>
                </UserProvider>
            </FirebaseProvider>
        </ThemeProvider>
    )
}

function Copyright() {
    return (
        <div style={{"padding-top": "2vh"}}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://wordcloud-generator.com/">
                    Wordcloud-Generator
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center">
                <Link color="inherit" href="/terms/impressum">
                    Impressum
                </Link>{' | '}
                <Link color="inherit" href="/terms/privacy">
                    Privacy Policy
                </Link>{' | '}
                <Link color="inherit" href="/terms/service">
                    Terms of Service
                </Link>
            </Typography>
        </div>
    );
}

function CallToAction(props) {
    const location = useLocation();

    if (location.pathname.includes("/generator")) {
        return (

            <IconButton color="inherit" onClick={() => navigate("/user")}>
                <AccountCircleIcon/>
            </IconButton>

        )
    }

    if (location.pathname.includes("/user")) {
        return (

            <Button variant="contained" color="primary" onClick={() => navigate("/generator")}
                    endIcon={<ArrowForwardIcon/>}>
                Go to generator</Button>

        )
    }

    return (
        <div>
            <IconButton color="inherit" onClick={() => navigate("/user")}>
                <AccountCircleIcon/>
            </IconButton>
            <Button variant="contained" color="primary" onClick={() => navigate("/generator")}
                    endIcon={<ArrowForwardIcon/>}>
                Go to generator</Button>
        </div>

    )
}

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        paddingLeft: 24, // keep right padding when drawer closed
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    titleWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    title: {
        paddingLeft: 10,
    },
}));

export default App;
