import { Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyle from './style';

const ErrorPage = ({error}) => {
    const classes = useStyle();
    console.log(error);
    const back = () => {
        window.location.href = '/';
    }
    return (
        <Grid className={classes.error}>
            <Typography variant='h4'>404 Page Not Found</Typography>
            <Grid className={classes.errorContent}>
                <Typography>The page you were looking for does not exist. <a style={{color:'#6DA7D1'}} onClick={back}>Click Here</a> to continue shopping.</Typography>
            </Grid>
        </Grid>
    );
}

export default ErrorPage;