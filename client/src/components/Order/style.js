import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    processing:{
        paddingTop:'40px',
        color:'#008ACC',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
}));