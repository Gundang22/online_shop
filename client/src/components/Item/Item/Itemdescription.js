import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import {getItem} from '../../../actions/itemAction';
import { Paper, Typography, Link, Divider,Grid, Button, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const Description = () => {
    const {item, loading} = useSelector((state) => state.items);
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const classes = useStyles();
    
    useEffect(() => {
        dispatch(getItem(id));
    }, []);

    const back = () => {
        history.goBack();
    };

    if(loading || !item){
        return (
            <>
                <Button variant='outlined' onClick={back}>
                    <KeyboardBackspaceIcon />
                </Button>
                <Paper elevation={6} className={classes.loadingPaper}>
                    <CircularProgress size='7em' />
                </Paper>
            </>
        );
    }
    
    return(
        <>
            <Paper style={{ margin:'auto', maxWidth:'1000px' ,marginTop: '30px', padding: '20px', borderRadius: '25px'}} elevation={6} >
                <Button variant='outlined' onClick={back}>
                    <KeyboardBackspaceIcon />
                </Button>
                <Divider style={{margin: '20px 0'}} />
                <Grid container>
                    <Grid xs={12} sm={7}>
                        <div className={classes.imageSection}>
                            <img className={classes.media} src={item.imageURL || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={'image'} /> 
                        </div>
                        <Divider style={{margin: '20px 0'}} display={{ xs: 'block', sm: 'none' }} />
                    </Grid>
                    <Grid xs={12} sm={5}>
                        <Typography variant='h4' component='h4'>{item.name}</Typography>
                        <Typography>
                            <Link to={'/home'} style={{textDecoration: 'none', color:'#3f51b5' }}>
                                #tag
                            </Link>
                            <Divider style={{margin: '20px 0'}} />
                        </Typography>
                        <Typography color='secondary'>
                            ${item.price}
                        </Typography>
                        <Divider style={{margin: '20px 0'}} />
                        <Button variant='containedSecondary'>Add to Cart</Button>
                    </Grid>
                </Grid>
                <Typography>
                    {item.description}
                </Typography>
            </Paper>
        </>
    );
}

export default Description;