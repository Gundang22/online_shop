import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    ul: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '500px',
        margin: 'auto',
    },
    sortPaper: {
        marginBottom: '30px',
        backgroundColor: '#E1EDE9',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
    },
    divider: {
        opacity: '1',
        background: 'white',
    },
    loading:{
        display:'flex',
        height:'100vh',
        alignItems:'center',
        justifyContent:'center',
    }
}));