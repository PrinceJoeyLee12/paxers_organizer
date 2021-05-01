import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDialogBox } from '../../actions/alert';

import {
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from '@material-ui/core';

import DialogBox from '../utils/DialogBox';

const DialogElementContent = ({ setDialogBox }) => {
  useEffect(() => {
    setDialogBox(true, 'Success');
  }, [setDialogBox]);

  const handleClose = () => {
    setDialogBox(false, '');
  };

  return (
    <Fragment>
      <DialogBox>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleClose} color='primary'>
            Agree
          </Button>
        </DialogActions>
      </DialogBox>
    </Fragment>
  );
};

DialogElementContent.propTypes = {
  setDialogBox: PropTypes.func.isRequired,
};

export default connect(null, { setDialogBox })(DialogElementContent);
