import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { Form, TextField } from './FormElements';

//icons
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';

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
}));

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email field is required'),
  password: Yup.string().required('Password field is required'),
});

const Login = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
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
                          error={errors.email ? true : false}
                          helperText={errors.email}
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
                          error={errors.password ? true : false}
                          helperText={errors.password}
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
                          disabled={isSubmitting || !isValid}>
                          Submit
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
                      Forgot Password ?{' '}
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

export default Login;
