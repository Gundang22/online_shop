import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        height: '100vh',
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
    }
}));