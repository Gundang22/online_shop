import React from "react";
import useStyles from './style';
import { Grid, Typography } from "@material-ui/core";

const Documentation = () => {
    const classes = useStyles()


    return (
        <Grid className={classes.documentation}>
            <Typography variant='h4' style={{fontFamily:'Segoe Script', textAlign:'center', color:'black'}}>Elegant</Typography>
            <Grid style={{paddingTop: '40px'}}>
                <Typography variant='h5'>Overview:</Typography>
                <Typography>Elegant is a mock online shop platform that allows users to buy products on the website. This site is implemented with React, logic handling using javascript, and font-end design using several npm packages.</Typography>
            </Grid>
            <Grid style={{paddingTop: '40px'}}>
                <Typography variant='h5'>Features:</Typography>
                <Typography>
                    -Responsive/interactive web design<br/>
                    -Product search<br/>
                    -Product categorization<br/>
                    -Related items<br/>
                    -Pagination<br/>
                    -Navigation<br/>
                    -Product variant selection<br/>
                    -User cart handling<br/>
                    -Checkout<br/>
                    -Webpage error handling<br/>
                    -Retriving product information from CommerceJS API<br/>
                    -Retriving user cart (locally) informaiton from CommerceJS API<br/>
                    -Capture order information using CommerceJS API<br/>
                    -Shipping & payment handling (Commerce JS for shipping handling & Stripe as payment gateway)<br/>
                    -Product management (Commerce JS)<br/>
                    -Product analytics and reports (Commerce JS)<br/>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Documentation;