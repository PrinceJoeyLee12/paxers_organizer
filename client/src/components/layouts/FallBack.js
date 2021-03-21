import React, { Fragment } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loading: {
    paddingTop: '50px',
    margin: 'auto',
  },
}));

const FallBack = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    </Fragment>
  );
};

export default FallBack;
