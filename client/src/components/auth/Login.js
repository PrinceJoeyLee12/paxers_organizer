import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {
  Grid,
  Button,
  Typography,
  CssBaseline,
  Container,
  Avatar,
  makeStyles,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { Form, TextField } from '../utils/FormElements';

//icons
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';

//actions
import { login } from '../../actions/auth';

//material ui colors
import { green } from '@material-ui/core/colors';

//Page Styles
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  form: {
    marginTop: '20px',
  },
  Links: {
    padding: '10px',
  },
  end: {
    textAlign: 'end',
  },
  start: {
    textAlign: 'start',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email field is required'),
  password: Yup.string().required('Password field is required'),
});

const Login = ({ login }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [apiErrors, setApiErrors] = useState({});
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResponse = (msg, status, errors) => {
    errors && Object.keys(errors).length > 0
      ? setApiErrors(errors)
      : setApiErrors({});
    if (status !== 200) {
      if (!errors || Object.keys(errors).length === 0) toast.error(msg);
      setSuccess(false);
    } else setSuccess(true);
    setSubmitted(true);
  };

  return (
    <Fragment>
      <ToastContainer />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
          <Grid
            container
            spacing={2}
            direction='row'
            justify='center'
            alignItems='center'
            className={classes.form}>
            <Grid item xs={12}>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginValidationSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  setApiErrors({});
                  setErrors({});
                  setSubmitted(false);
                  login(values, handleResponse);
                }}>
                {({
                  values,
                  errors,
                  touched,
                  isValid,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <Form>
                    <Grid
                      container
                      spacing={2}
                      direction='row'
                      justify='center'
                      alignItems='center'>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          autoFocus
                          value={values.email}
                          error={errors.email || apiErrors.email ? true : false}
                          helperText={errors.email || apiErrors.email}
                          name='email'
                          label='Email'
                          type='email'
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          value={values.password}
                          name='password'
                          label='Password'
                          type='password'
                          error={
                            errors.password || apiErrors.password ? true : false
                          }
                          helperText={errors.password || apiErrors.password}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          color='primary'
                          fullWidth
                          variant='contained'
                          onClick={handleSubmit}
                          disabled={
                            (isSubmitting || !isValid) &&
                            (!submitted || success)
                          }>
                          {submitted && success
                            ? 'Redirecting...'
                            : isSubmitting && !submitted
                            ? 'Please wait...'
                            : 'Submit'}
                          {isSubmitting && !submitted && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'>
                <Grid item xs={12} sm={6} className={classes.Links}>
                  <Link
                    to='/forgot-password'
                    style={{ textDecoration: 'none' }}>
                    <Typography color='primary' variant='body1'>
                      Forgot Password ?
                    </Typography>
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classnames(
                    classes.Links,
                    isMobile ? classes.start : classes.end,
                  )}>
                  <Link to='/register' style={{ textDecoration: 'none' }}>
                    <Typography color='primary' variant='body1'>
                      Register Here
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func,
};

export default connect(null, { login })(Login);
