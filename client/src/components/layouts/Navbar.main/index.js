import React, { Suspense } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  List,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

//Actions
import {
  getGuestMenuItems,
  getAuthMenuItems,
} from '../../../actions/menuItems';

//Menu Items
import AppbarMenus from './appbarMenus';
import SidebarMenus from './SidebarMenus';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(0),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    flexGrow: 1,
  },
}));

const Menus = ({
  children,
  menuItems,
  getGuestMenuItems,
  getAuthMenuItems,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Suspense fallback='Loading....'>
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerToggle}
              edge='start'
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap className={classes.logo}>
              {isMobile && open ? 'L' : 'Logo here'}
            </Typography>
            <AppbarMenus menuIsOpen={open} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={clsx(
            { [classes.drawer]: !isMobile },
            {
              [classes.drawerOpen]: open && !isMobile,
              [classes.drawerClose]: !open && !isMobile,
            },
          )}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuItems.map((item, index) => (
              <SidebarMenus
                key={index}
                href={item.href}
                icon={item.icon}
                title={item.title}
                handleDrawerToggle={handleDrawerToggle}
                drawerIsOpen={open}
              />
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </Suspense>
    </div>
  );
};

Menus.propTypes = {
  getGuestMenuItems: PropTypes.func,
  getAuthMenuItems: PropTypes.func,
  menuItems: PropTypes.array,
};

const mapStateToProps = state => ({
  menuItems: state.menuItems,
});

export default connect(mapStateToProps, {
  getGuestMenuItems,
  getAuthMenuItems,
})(withRouter(Menus));
