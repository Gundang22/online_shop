import React, {useState} from 'react'
import { Paper, Avatar, Button, CssBaseline, TextField, Link, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signUp} from '../../../actions/authAction';
import useStyles from '../style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const initialState = {
    name: '',
    email: '',
    password: '',
    passwordRe: '',
};

const Signup = ({login}) => {
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const {message} = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        dispatch(signUp(formData, history));
    };

    const setRegister = () => {
        dispatch({type: 'AUTH_CLEAR'});
        login(true);
    }

    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    {message && <Paper className={classes.error} elevation={6}>{message}</Paper>}
                    <form onSubmit={handleRegister} className={classes.form} validated={validated}>
                        <TextField
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Name"
                            label="Your Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email Address"
                            id="email"
                            autoComplete="email"
                        />
                        <TextField
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            id="password"
                            type='password'
                        />
                        <TextField
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="passwordRe"
                            label="Repeat Password"
                            id="passwordRe"
                            type='password'
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        Already have an account? 
                        <Link onClick={setRegister} style={{cursor:'pointer'}}>Login!</Link>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Signup;