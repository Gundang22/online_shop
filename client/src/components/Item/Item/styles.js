import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    section: {
        borderRadius: '20px',
        margin: '10px',
        width:'100%',
        flex: 1,
    },
    imageSection: {
        marginLeft: '20px',
        marginRight: '20px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    recommendedPosts: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        },
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
    },
    commentsOuterContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    commentsInnerContainer: {
        height: '200px',
        overflowY: 'auto',
        marginRight: '30px',
    },

    card: {
        backgroundColor: 'rgb(228, 202, 170)',
        maxWidth: '100%',
        margin:'20px',
    },
    media: {
        height: '300px',
        paddingTop: '56.25%',
        backgroundColor: 'white',
        backgroundSize:'contain',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '20px'
    },
    cardContent: {
        height:'100px',
        display: "grid",
        boxOrient: "vertical",
        lineClamp: 3,
        overflow: "hidden"
    },
    itemDetailPaper: {
        margin:'auto', 
        maxWidth:'1000px',
        paddingTop: '130px',
        padding: '20px', 
    },
    divider: {
        backgroundColor:'black',
        marginTop:'10px',
        marginBottom:'10px'
    },
    checkout: {
        marginTop: '20px',
        display: 'flex',
    },
    qty: {
        display: 'flex',
        textAlign: 'center',
        height:'33px',
    },
    qtyButton: {
        minWidth: '0px',
        width: '30px',
        fontSize: '20px',
        height: '30px',
        paddingTop: '0px',
        [theme.breakpoints.down('500')]: {
            width: '15px',
        },
    },
    description: {
        marginTop: '20px',
        marginBottom:"20px",
    },
    related:{
        paddingTop: '30px',
    },
    productSlideItems: {
        height:'130px',
    },
    productSlideImage:{
        height:'500px',
        width:'100%',
        backgroundRepeat:'no-repeat',
        backgroundSize:'contain',
        backgroundPosition:'center',
    },
}));