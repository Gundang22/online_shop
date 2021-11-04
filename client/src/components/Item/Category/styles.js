import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    category: {
        marginTop: '40px',
        marginBottom: '30px',
        textAlign:'center',
    },
    categoryPaper: {
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: '#E1EDE9',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
    },
    loading:{
        display:'flex',
        height:'100vh',
        alignItems:'center',
        justifyContent:'center',
    },
    catalog:{
        paddingTop:'150px',
        paddingBottom: '100px',
        maxWidth:'1000px',
        margin: 'auto',
    },
    catalogName:{
        marginLeft:'10%',
        paddingBottom:'30px',
    },
    catalogFeatured:{
        textAlign:'center',
    },
    categorySlides: {
        border: '1px solid',
        height:'130px',
        backgroundSize: 'cover',
        backgroundPosition:'center',
        backgroundRepeat: 'false',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        cursor: 'pointer',
    },
    categorySlidesButton: {
        width: 'fit-content',
        height:'fit-content',
        padding: '3px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '0',
    },
    slideBtn: {
        display: 'flex',
        alignContent:'center',
    }
}));

export default useStyles;