import React, {useState, useEffect} from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider, Hidden, Typography, Collapse, CircularProgress, TextField} from '@material-ui/core';
import ListIcon from '@material-ui/icons/List'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import {Link} from 'react-router-dom'
import { getCategory } from '../../actions/catAction';
import Category from './Category';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../../images/logo.png'

const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showDrawerMD, setShowDrawerMD] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [openCat, setOpenCat] = useState(false);
    const [searchDrawer, setSearchDrawer] = useState(false);
    const [search, setSearch] = useState('');

    const {categories} = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    const toggleDrawer = () => () => {setShowDrawer(!showDrawer);}
    const toggleDrawerMD = () => () => {setShowDrawerMD(!showDrawerMD);}
    const handleCat = () => {setOpenCat(!openCat);}
    const toggleSearch = () => () =>{setSearchDrawer(!searchDrawer);}

    const handleKeyPress = (e) => {
        if(e.keyCode === 13)
            searchProducts();
    }

    const searchProducts = () => {
        if(search.trim())
            window.location.href =  `/search/search?searchQuery=${search || 'none'}`;
    }

    const viewAll = () => {
        window.location.href = '/catalog';
    }

    const toHome = () => {
        window.location.href = `/`;
    }

    return(
        <div>
            <Drawer anchor='top' open={showDrawer} onClose={toggleDrawer()} ModalProps={{keepMounted: true}}>
            <div className={classes.dropdown} role='presentation'>
                <IconButton className={classes.close} onClick={toggleDrawer()}>
                    <CloseIcon />
                </IconButton>
                <List style={{padding: 0}}>
                    <ListItem className={classes.dropdownItems}>
                        <ListItemText style={{textAlign:'center'}}>
                            <Button>
                                <img src={logo} style={{width: '100px'}} onClick={toHome} />
                            </Button>
                        </ListItemText>
                    </ListItem>
                    <Divider className={classes.dividerMain} />
                    <Grid style={{paddingTop:'30px',paddingBottom:'20px', display:'flex', justifyContent:'center'}}>
                        <TextField onKeyDown={handleKeyPress} variant='outlined' placeholder='Search our store' name='search' value={search} onChange={(e) => setSearch(e.target.value)} style={{width: '200px'}} />
                        <Button onClick={searchProducts}><SearchIcon /></Button>
                    </Grid>
                    <ListItem button onClick={toggleDrawer()} component={Link} className={classes.dropdownItems} >
                        <ListItemText onClick={toHome} className={classes.dropdownLink}>Home</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleCat} className={classes.dropdownItems}>
                        <ListItemText className={classes.dropdownLink}>Category</ListItemText>
                        {openCat ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openCat} timeout='auto'>
                        <Divider className={classes.divider} />
                        <List component='div' disablePadding>
                            <ListItem className={classes.categoryParent}>
                                <ListItem component={Link} onClick={viewAll}>All Products</ListItem>
                            </ListItem>
                            <Divider className={classes.divider} />
                            {
                                categories ? (
                                    categories.data.map((category) => (
                                        <>
                                            <Category category={category} toggleDrawer={toggleDrawer} key={category.id} />
                                            <Divider className={classes.divider} />
                                        </>
                                    ))
                                ) : (
                                    <CircularProgress />
                                )
                            }
                        </List>
                    </Collapse>
                    <ListItem button onClick={toggleDrawer} component={Link} to='/checkout' className={classes.dropdownItems}>
                        <ListItemText href='/checkout' className={classes.dropdownLink}>Cart</ListItemText>
                    </ListItem>
                </List>
                <Divider />
            </div>
            </Drawer>

            <Drawer anchor='right' open={showDrawerMD} onClose={toggleDrawerMD()} ModalProps={{keepMounted: true}}>
                <div className={classes.dropdown} role='presentation' style={{height:'100vh'}}>
                    <List>
                        <ListItem className={classes.categoryParent}>
                            <ListItem component={Link} onClick={viewAll}>All Products</ListItem>
                        </ListItem>
                        <Divider className={classes.divider} />
                        {
                            categories ? (
                                categories.data.map((category) => (
                                    <>
                                        <Category category={category} toggleDrawer={toggleDrawer} key={category.id} />
                                        <Divider className={classes.divider} />
                                    </>
                                ))
                            ) : (
                                <CircularProgress />
                            )
                        }
                    </List>
                </div>
            </Drawer>

            <Drawer anchor='top' open={searchDrawer} onClose={toggleSearch()}>
                <div role='presentation'>
                    <Button style={{position: 'absolute', top:'20px', right:'20px'}} onClick={toggleSearch()}>
                        <CloseIcon />
                    </Button>
                    <Grid className={classes.searchContent}>
                        <Typography>Search Our Store...</Typography>
                        <TextField onKeyDown={handleKeyPress} name='search' value={search} onChange={(e) => setSearch(e.target.value)} style={{width: '200px'}} />
                        <Button onClick={searchProducts}><SearchIcon /></Button>
                    </Grid>
                </div>
            </Drawer>

            <Navbar className={classes.navbar}>
                <Container>
                    <Navbar.Brand>
                        <Button>
                            <img src={logo} style={{width: '100px'}}  onClick={toHome}/>
                        </Button>
                    </Navbar.Brand>
                    <Hidden xsDown>
                        <Nav display={{ xs: 'none', sm: 'block' }}>
                            <Nav.Link onClick={toggleSearch()} style={{color:'white'}}>
                                <SearchIcon />
                                Search
                            </Nav.Link>
                            <Nav.Link href='/checkout' style={{color:'white'}}>Cart</Nav.Link>
                            <Nav.Link onClick={toggleDrawerMD()} style={{color:'white'}}>
                                Category
                                <ListIcon />
                            </Nav.Link>
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