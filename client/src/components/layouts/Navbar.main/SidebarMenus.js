import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router';
import { NavLink as RouterLink } from 'react-router-dom';
import { Button, useMediaQuery, ListItem } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Component's styles
const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 15px',
    textTransform: 'none',
    width: '100%',
  },
  icon: {
    margin: theme.spacing(1),
  },
  title: {
    marginRight: 'auto',
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const SidebarMenus = ({
  href,
  icon: Icon,
  title,
  handleDrawerToggle,
  drawerIsOpen,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Fragment>
      <ListItem className={classnames(classes.item)} disableGutters>
        <Button
          onClick={isMobile ? handleDrawerToggle : () => {}}
          className={classes.button}
          activeClassName={classes.active}
          component={RouterLink}
          to={href}>
          {Icon && <Icon className={classes.icon} size='25' />}
          {drawerIsOpen && <span className={classes.title}>{title}</span>}
        </Button>
      </ListItem>
    </Fragment>
  );
};

SidebarMenus.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default withRouter(SidebarMenus);
