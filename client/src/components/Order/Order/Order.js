import React, {useEffect, useState} from "react";
import {Grid, Paper, Typography} from '@material-ui/core';
import useStyles from './styles';
import OrderDetail from "./OrderDetail";

const Order = ({order}) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const date = String(order.orderDate);
    const [color, setColor] = useState('red');
    const [temp] = useState('false');
    
    useEffect(() => {
        if(order.status === 'pending'){
            setColor('yellow');
        } else if (order.status === 'shipped'){
            setColor('green');
        } else setColor('red');
    }, [temp]);
    

    const detail = () => {
        setShow(true);
    }

    return(
        <>
            <OrderDetail order={order} show={show} setShow={setShow} color={color} setColor={setColor} />
            <Grid container spacing={1} onClick={detail} style={{border: '3px black', cursor:'pointer'}}>
                <Grid item xs={2}>
                    <Paper className={classes.orderPaper} style={{borderLeft:`solid ${color}`}}>
                        <Typography noWrap>Order #{order.orderNumber}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.orderPaper}>
                        <Typography noWrap>{order.user.name}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper className={classes.orderPaper}>
                        <Typography noWrap>{order.user.email}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.orderPaper}>
                        <Typography noWrap>{date.substring(0, 10)}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default Order;