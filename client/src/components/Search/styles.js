import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    search: {
        textAlign: 'center',
        paddingTop:'150px',
    },
    searchInput: {
        display:'flex',
        justifyContent:'center',
    },
    divider: {
        margin: 'auto',
        marginTop: '25px',
        width: '50px',
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