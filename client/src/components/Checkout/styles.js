import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    imageSection: {
        width: '50px',
    },
    media: {
        borderRadius: '10px',
        objectFit: 'cover',
        [theme.breakpoints.down('xs')]:{
            width: '110px',
            height:'110px',
        },
        [theme.breakpoints.up('sm')]:{
            width: '100px',
            height:'100px',
        },
    },
    itemPaper: {
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#E1EDE9',
    },
    priceXs: {
        [theme.breakpoints.down('xs')]:{
            display:'block',
        },
        [theme.breakpoints.up('sm')]:{
            display:'none',
        },
    },
    priceSm: {
        [theme.breakpoints.down('xs')]:{
            display:'none',
        },
        [theme.breakpoints.up('sm')]:{
            display:'block',
        },
    },
    itemName: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
    },
}));