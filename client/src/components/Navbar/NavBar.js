import React, {useState, useEffect} from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import {Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Hidden, Typography} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListIcon from '@material-ui/icons/List'
import useStyles from './styles';
import {Link} from 'react-router-dom'


const NavBar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [state, setState] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const toggleDrawer = () => (event) => {
        setState(!state);
    }

    useEffect(()=> {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        try{
            dispatch({type: 'LOGOUT'});
            history.push('/home');
            setUser(null);
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }
    })

    return(
        <div>
            <Drawer anchor='top' open={state} onClose={toggleDrawer(false)}>
            <div className={classes.dropdown} role='presentation' onClick={toggleDrawer()} onKeyDown={toggleDrawer(false)}>
                <List>
                    <ListItem button component={Link} to='/home' className={classes.dropdownItems} href='/home'>
                        <ListItemText style={{textAlign:'center'}}><Typography variant='h5'>Online Shopping</Typography></ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to='/home' className={classes.dropdownItems} >
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText href='/home'>Product</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to='/documentation' className={classes.dropdownItems}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText>Documentation</ListItemText>
                    </ListItem>
                    {user ? (
                        <>
                            <ListItem button component={Link} to='/checkout' className={classes.dropdownItems}>
                                <ListItemIcon><InboxIcon /></ListItemIcon>
                                <ListItemText>Cart</ListItemText>
                            </ListItem>
                            <ListItem button component={Link} to='/authentication' onClick={logout} className={classes.dropdownItems}>
                                <ListItemIcon><InboxIcon /></ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </ListItem>
                        </>
                    ) : (
                        <ListItem button component={Link} to='/authentication' className={classes.dropdownItems}>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText>Login</ListItemText>
                        </ListItem>
                    )}
                </List>
                <Divider />
            </div>
            </Drawer>

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home" className={classes.brand}>Online Shopping</Navbar.Brand>
                    <Hidden xsDown>
                        <Nav display={{ xs: 'none', sm: 'block' }}>
                            <Nav.Link href="/home">Products</Nav.Link>
                            <Nav.Link href="/documentation">Documentation</Nav.Link>
                            {user ? (
                                <>
                                    <Nav.Link href='/authentication' onClick={logout}>Logout</Nav.Link>
                                    <Nav.Link href='/checkout'>Cart</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link href='/authentication'>Login</Nav.Link>
                            )}
                            
                        </Nav>
                    </Hidden>
                    <Hidden smUp>
                        <Button onClick={toggleDrawer()} style={{color:'white'}}><ListIcon /></Button>
                    </Hidden>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar