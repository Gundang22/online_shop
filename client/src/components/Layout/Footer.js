import { Grid, Typography, Link } from "@material-ui/core";
import React from "react";
import useStyles from './style';

const Footer = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.footer}>
            <Grid xs={12} style={{margin:'30px'}}>
                <span dangerouslySetInnerHTML={{"__html": "&copy;"}} />2021, Jun Wang
            </Grid>
            <Grid xs={12} className={classes.footerContent}>
                <Typography><a href='/documentation'>Documentation</a></Typography>
            </Grid>
        </Grid>
    )
}

export default Footer;