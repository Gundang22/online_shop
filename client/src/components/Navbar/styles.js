import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    dropdown: {
        width: '100%',
        background: '#E4CAAA',
        color: 'white',
    },
    dropdownItems: {
        width: 'auto',
    },
    dividerMain: {
        marginRight: '5%',
        marginLeft: '5%',
        backgroundColor: '#00611A',
        opacity: '1',
    },
    divider: {
        opacity: '1',
        background: 'white',
    },
    searchContent:{
        padding: '40px',
        textAlign: 'center',
    },
    navbar: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        zIndex: '10',
    },
    expand:{
        cursor:'pointer',
    },
    categoryLink:{
        color: 'inherit',
    },
    close:{
        position: 'fixed',
        top: '30px',
        right: '20px',
        border: '1px solid',
        zIndex: '20',
    },
}));

export default useStyles;