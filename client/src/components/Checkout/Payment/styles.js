import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    divider:{
        backgroundColor: 'black',
        margin: '20px'
    },
    confirmationGrid:{
        textAlign:'center',
    },
    confirmationText: {
        paddingTop: '15px',
        paddingBottom:'15px',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid lightgrey',
        maxWidth: '700px',
        padding: '40px',
        margin: 'auto',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
    payment:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    summary: {
        width: '100%',
    },
    orderItem:{
        display: 'flex',
        justifyContent: 'end',
    },
    summary_itemDescription: {
        padding: '0',
        display: 'inline-grid',
        alignContent:'space-evenly',
    },
    summary_itemDescriptionText:{
        display: 'flex',
        alignItems:'center',
    },
}));