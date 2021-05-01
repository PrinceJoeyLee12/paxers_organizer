import React, { Fragment } from 'react';
import { Dialog, DialogTitle, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//actions
import { setDialogBox } from '../../actions/alert';

// Transition Property
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DialogBox = ({
  dialogBoxReduxContent: { title, isOpen },
  setDialogBox,
  children,
}) => {
  const handleClose = () => {
    setDialogBox(false, '');
  };

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle id='alert-dialog-slide-title'>{title}</DialogTitle>
        {children}
      </Dialog>
    </Fragment>
  );
};

DialogBox.propTypes = {
  setDialogBox: PropTypes.func,
};

const mapStateToProps = state => ({
  dialogBoxReduxContent: state.alert.dialogBox,
});

export default connect(mapStateToProps, { setDialogBox })(DialogBox);
