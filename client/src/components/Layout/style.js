import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px',
    },
    gridContainer: {
        [theme.breakpoints.down('xs')]: {
        flexDirection: 'column-reverse',
        },
    },
    carousel: {
        width: '100%',
        height: '700px',
        objectPosition: 'center',
        objectFit: 'cover',
    },
    carouselButton:{
        borderRadius: '0',
        position: 'relative',
        bottom: '300px',
    },
    loading:{
        display:'flex',
        height:'100vh',
        alignItems:'center',
        justifyContent:'center',
    },
    catalog:{
        maxWidth:'600px',
        margin: 'auto',
        fontFamily:'Courier New, monospace',
        marginTop: '80px',
        marginBottom:'80px',
    },
    catalogItem:{
        padding:'0',
        display: 'flex',
        justifyContent:'center',
        height: '300px',
        position: 'relative',
        overflow:'hidden',
        backgroundSize: 'cover',
        backgroundPosition:'center',
        transition: 'background 1s ease',
        alignItems:'center',
        cursor: 'pointer',
        "&:hover": {
            backgroundPosition:'right',
        },
    },
    catalogPaper:{
        borderRadius:'0',
    },
    divider: {
        width:'50px',
        marginTop:'20px',
        margin: 'auto',
        opacity: '1',
        background: 'white',
    },
    newsLetter:{
        textAlign:'center',
        paddingTop:'40px',
        paddingBottom:'80px',
    },
    newsLetterInput:{
        margin: 'auto',
        maxWidth:'500px',
        marginTop: '40px',
        display: 'flex',
        justifyContent:'center',
    },
    footer:{
        textAlign:'center',
        marginBottom:'40px',
        padding: '40px',
    },
    footerContent: {
        display:'flex',
        justifyContent:'center',
    },
    error:{
        paddingTop:'150px',
        padding: '20px',
        paddingBottom: '70px',
        maxWidth:'900px',
    },
    errorContent:{
        paddingTop: '30px',
    },
    documentation: {
        margin:'auto',
        maxWidth:'800px',
        paddingTop: '160px',
        paddingBottom:'80px',
        padding: '50px',
    },
}));