import React, {useState, useEffect} from 'react'
import { Paper, Avatar, Button, CssBaseline, TextField, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useParams } from 'react-router-dom';
import useStyles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { getResetPassword, resetPassword } from '../../../actions/authAction';

const initialState = {
    password: '',
    passwordre: '',
};

const ResetPassword = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {token} = useParams();
    const [validated] = useState(false);
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        dispatch(getResetPassword(token));
    }, []);

    const {getAuth, message} = useSelector((state) => state.auth);
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(resetPassword(token, formData));
    }

    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    {getAuth === false ? (
                        <>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Access Denied
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Reset Password
                            </Typography>
                            {message && <Paper className={classes.error} elevation={6}>{message}</Paper>}
                            <form onSubmit={handleSubmit} className={classes.form} validated={validated} style={{maxWidth:'500px'}}>
                                <TextField
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Password"
                                    label="New Password"
                                    name="password"
                                    autoComplete="password"
                                    autoFocus
                                />
                                <TextField
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="PasswordRe"
                                    label="Repeat Password"
                                    name="passwordre"
                                    autoComplete="passwordre"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Reset Password
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </Grid>
        </Grid>
    );
}

export default ResetPassword