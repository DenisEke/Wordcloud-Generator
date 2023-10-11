import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from "react-hook-form";
import {FirebaseContext} from "../../providers/FirebaseProvider";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const {register, handleSubmit, watch, errors} = useForm();
    const [authError, setAuthError] = useState(null);
    const auth = useContext(FirebaseContext).auth;

    async function onSubmit(data) {
        try {
            await auth.createUserWithEmailAndPassword(data.mail, data.password);
        } catch (error) {
            setAuthError(error.message);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
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
                                variant="outlined" fullWidth id="emailFld" error={errors.mail || authError}
                                helperText={errors?.mail?.message || authError}
                                //TODO: show different error messages based on required and not valid mail
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register({
                                    required: "required",
                                    min: {value: 8, message: "Password too short"},
                                    max: {value: 100, message: "Password too long"}
                                })}
                                label="Password" name="password"
                                variant="outlined" fullWidth id="passwordFld"
                                type="password" error={errors.password}
                                helperText={errors?.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register(
                                    {
                                        required: "required",
                                        min: {value: 8, message: "Password too short"},
                                        max: {value: 100, message: "Password too long"},
                                        validate: value => areEqual(watch("password"), value)
                                    })}
                                label="Repeat your password" name="passwordRepeat"
                                variant="outlined" fullWidth id="passwordRepeatFld"
                                type="password" error={errors.passwordRepeat}
                                helperText={errors?.passwordRepeat?.message}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

function areEqual(a, b) {
    if (a !== b) {
        return "needs to be the same as password"
    }
}
