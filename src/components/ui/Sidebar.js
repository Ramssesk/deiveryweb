import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { 
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Drawer,
    Hidden
} from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
        width: '240px',
        flexShrink: 0,
    },
    backgroundColor: "#3f51b5",
  },
  menuButton: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    position: 'fixed',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  titulo: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#3f51b5",
    color:"#fff"
    },
    icon: {
        color: '#fff'
    },
    list: {
        backgroundColor: '#3f51b5',
        '& > *': {
            color: '#fff'
        },
    }  
}));
    
const Sidebar = (props) => {

    const theme = useTheme()
    const classes = useStyles()
    
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [index, setIndex] = useState(1);
    
    const handleDrawerToggle = (e, selected) => {
        console.log(e)
        if(e.nativeEvent.view.window.outerWidth < 600){
            setMobileOpen(!mobileOpen);
        }
        setIndex(selected)
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <List className={classes.titulo}>
        <ListItem div className={classes.titulo}>
            <ListItemText 
                disableTypography="true"
                primary="Restaurante" />
        </ListItem>
        <ListItem 
            button 
            component={Link} to="/" 
            selected={index === 1}
            onClick={(e) => handleDrawerToggle(e, 1)} 
            startIcon={<MenuBookIcon />}>
            <ListItemIcon className={classes.icon}>
                <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
        </ListItem>
        <Divider />
        <ListItem 
            button 
            component={Link} to="/menu"
            selected={index === 2}
            onClick={(e) => handleDrawerToggle(e, 2)} >
            <ListItemIcon className={classes.icon}>
                <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
        </ListItem>
        <Divider />
        <ListItem 
            button 
            component={Link} to="/nuevo-producto" 
            selected={index === 3}
            onClick={(e) => handleDrawerToggle(e, 3)} >
            <ListItemIcon className={classes.icon}>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar Producto" />
        </ListItem>
        </List>
    )

    return (
        <div className={classes.root}>
        <IconButton onClick={handleDrawerToggle} className={classes.menuButton} component="span">
          <MenuIcon />
        </IconButton>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                        paper: classes.drawer,
                        }}
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                        paper: classes.drawer,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
     );
}
 
export default Sidebar;