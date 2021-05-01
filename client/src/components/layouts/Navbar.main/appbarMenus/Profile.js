import React, { Fragment } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const Messages = ({ anchorEl, menuId, isMenuOpen, setAnchorEl }) => {
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default Messages;
