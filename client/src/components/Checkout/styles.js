import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    imageSection: {
        width: '50px',
    },
    media: {
        borderRadius: '10px',
        objectFit: 'cover',
        [theme.breakpoints.down('370')]: {
            width:'80px',
            height: '80px',
        },
        [theme.breakpoints.between('370', '600')]:{
            width: '110px',
            height:'110px',
        },
        [theme.breakpoints.up('sm')]:{
            width: '100px',
            height:'100px',
        },
    },
    qty: {
        textAlign:'center', 
        justifyContent:'end',
        display:'flex'
    },
    qtybutton: {
        minWidth: '0px',
        width: '30px',
        fontSize: '20px',
        height: '30px',
        paddingTop: '0px',
        [theme.breakpoints.down('500')]: {
            width: '15px',
        },
    },
    itemPaper: {
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#E1EDE9',
    },
    priceXs: {
        [theme.breakpoints.up('sm')]:{
            display:'none',
        },
    },
    priceSm: {
        [theme.breakpoints.down('xs')]:{
            display:'none',
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