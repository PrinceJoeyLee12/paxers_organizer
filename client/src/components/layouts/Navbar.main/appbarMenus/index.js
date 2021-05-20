import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Messages = React.lazy(() => import('./Messages'));
const Notifications = React.lazy(() => import('./Notifications'));
const Profile = React.lazy(() => import('./Profile'));

const useStyles = makeStyles(theme => ({
  hideIfMobile: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  flexEnd: {
    justifyContent: 'flexEnd',
  },
}));

const AppbarMenus = ({ menuIsOpen, isAuthenticated }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const menuProfileId = 'primary-appbar-account-menu';
  const menuMessagesId = 'primary-appbar-messages-menu';
  const menuNotificationsId = 'primary-appbar-notifications-menu';

  return (
    <>
      {isAuthenticated && (
        <div className={classes.flexEnd}>
          <div className={classnames({ [classes.hideIfMobile]: menuIsOpen })}>
            <IconButton
              aria-label='show 4 new mails'
              aria-controls={menuMessagesId}
              aria-haspopup='true'
              onClick={handleMenuOpen}
              color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label='show 17 new notifications'
              aria-controls={menuNotificationsId}
              aria-haspopup='true'
              onClick={handleMenuOpen}
              color='inherit'>
              <Badge badgeContent={17} color='secondary'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuProfileId}
              aria-haspopup='true'
              onClick={handleMenuOpen}
              color='inherit'>
              <AccountCircle />
            </IconButton>
          </div>
          <Suspense fallback='Loading...'>
            <Messages
              anchorEl={anchorEl}
              menuId={menuMessagesId}
              isMenuOpen={isMenuOpen}
              setAnchorEl={setAnchorEl}
            />
            <Profile
              anchorEl={anchorEl}
              menuId={menuProfileId}
              isMenuOpen={isMenuOpen}
              setAnchorEl={setAnchorEl}
            />
            <Notifications
              anchorEl={anchorEl}
              menuId={menuNotificationsId}
              isMenuOpen={isMenuOpen}
              setAnchorEl={setAnchorEl}
            />
          </Suspense>
        </div>
      )}
    </>
  );
};

AppbarMenus.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(AppbarMenus);
