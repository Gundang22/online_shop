import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {forgotPassword} from '../../../actions/authAction';
import useStyles from '../style';

import { Paper, Avatar, Button, CssBaseline, TextField, Link, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Forgot = ({forgot}) => {
    const [email, setEmail] = useState('');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [validated] = useState(false);
    const {message} = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setEmail({...email, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    const back = () => {
        dispatch({type: 'AUTH_CLEAR'});
        forgot(false);
    }
    
    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>\
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                {message && <Paper className={classes.error} elevation={6}>{message}</Paper>}
                <form onSubmit={(e) => handleSubmit} className={classes.form} validated={validated}>
                    <label style={{marginTop:'30px'}}>Please Enter The Email Address You Used For Register</label>
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <label>*We will send you an email with link to the reset password webpage.</label>
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset Password
                    </Button>
                    <Link onClick={back} style={{cursor:'pointer'}}>Back</Link>
                </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Forgot;