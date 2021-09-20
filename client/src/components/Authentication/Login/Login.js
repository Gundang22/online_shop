import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signIn} from '../../../actions/authAction';
import useStyles from '../style';

import { Paper, Avatar, Button, CssBaseline, TextField, Link, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const initialState = {
  email: '',
  password: '',
};

const Login = ({login, forgot}) => {
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const {message} = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    dispatch(signIn(formData, history));
  };

  const setRegister = () => {
    dispatch({type: 'AUTH_CLEAR'});
    login(false);
  };

  const forgotPassword = () => {
    dispatch({type: 'AUTH_CLEAR'});
    forgot(true);
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
            Login in
          </Typography>
          {message && <Paper className={classes.error} elevation={6}>{message}</Paper>}
          <form onSubmit={handleLogin} className={classes.form} validated={validated}>
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
            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
            Don't have an account? 
            <Link onClick={setRegister} style={{cursor:'pointer'}}>Sign Up!</Link>
            <br/><br/>
            <Link onClick={forgotPassword} style={{cursor:'pointer'}}>Forgot Password</Link>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;