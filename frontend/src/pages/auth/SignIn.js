import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from "react-hook-form";
import {config} from "../../Constants";
import {FirebaseContext} from "../../providers/FirebaseProvider";
import Alert from "../../components/pops/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '85vh',
    },
    image: {
        backgroundImage: 'url(' + config.examples[Math.floor(Math.random() * Math.floor(config.examples.length))].url + ')',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: "50%",
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide() {
    const classes = useStyles();

    const {register, handleSubmit, errors} = useForm();
    const [error, setError] = useState(false);
    const auth = useContext(FirebaseContext).auth;
    const provider = useContext(FirebaseContext).provider;

    async function onSubmit(data) {
        try {
            await auth.signInWithEmailAndPassword(data.mail, data.password);
        } catch (error) {
            setError(true);
        }
    }

    const signInWithGoogle = () => auth.signInWithPopup(provider);

    return (
        <Grid container component="main" className={classes.root}>
            <Snackbar open={error} autoHideDuration={6000} onClose={() => {
                setError(false)
            }}>
                <Alert severity="error" onClose={() => {
                    setError(false)
                }}>
                    Username or Password wrong</Alert>
            </Snackbar>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={8} className={classes.image}/>
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Typography variant={"body1"}>
                        Something went wrong
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            inputRef={register(
                                {
                                    required: "required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    }
                                })} label="E-Mail" name="mail" autoComplete="email"
                            variant="outlined" fullWidth id="emailFld" error={errors.mail || error} margin="normal"
                            helperText={errors?.mail?.message}
                        />
                        <TextField
                            inputRef={register({
                                required: "required",
                                min: {value: 8, message: "Password too short"},
                                max: {value: 100, message: "Password too long"}
                            })}
                            margin="normal"
                            label="Password" name="password" autoComplete="current-password"
                            variant="outlined" fullWidth id="passwordFld"
                            type="password" error={errors.password || error}
                            helperText={errors?.password?.message}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className={classes.submit}
                            onClick={signInWithGoogle}
                        >
                            Sign In with Google
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/reset" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}