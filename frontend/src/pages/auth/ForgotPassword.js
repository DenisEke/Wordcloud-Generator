import {useForm} from "react-hook-form";
import React, {useContext, useState} from "react";
import {FirebaseContext} from "../../providers/FirebaseProvider";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import {navigate} from "@reach/router";
import Alert from "../../components/pops/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function ForgotPassword() {
    const classes = useStyles();

    const {register, handleSubmit, watch, errors} = useForm();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = useContext(FirebaseContext).auth;

    async function onSubmit(data) {
        setLoading(true);
        auth.sendPasswordResetEmail(data.mail).then(function () {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate("/signin"), 3000);
        }).catch(function (error) {

        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar open={error} autoHideDuration={6000} onClose={() => {
                setError(false)
            }}>
                <Alert severity="error" onClose={() => {
                    setError(false)
                }}>
                    Something went wrong. Please try again later.</Alert>
            </Snackbar>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset your password
                </Typography>
                <Typography variant="subtitle1">
                    Type in your accounts email and we'll send you a link where you can reset your password.
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register(
                                    {
                                        required: "required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })}
                                label="E-Mail" name="mail" autoComplete="email"
                                variant="outlined" fullWidth id="emailFld" error={errors.mail}
                                helperText={errors?.mail?.message}
                                //TODO: show different error messages based on required and not valid mail
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={success || loading}
                    >
                        {loading ? <CircularProgress/> : (success ? "Sent mail. Redirecting..." : "Send")}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                I can remember it again.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}