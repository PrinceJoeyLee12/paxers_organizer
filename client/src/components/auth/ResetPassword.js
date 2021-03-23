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
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { Form, TextField } from './FormElements';

//icons
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

//Page Styles
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  Links: {
    padding: '10px',
  },
  end: {
    textAlign: 'end',
  },
  form: {
    marginTop: '20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const RegisterValidationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    )
    .required('Password field is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password field is required'),
});

const Register = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <ToastContainer />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Reset Password
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
                initialValues={{
                  password: '',
                  passwordConfirm: '',
                }}
                validationSchema={RegisterValidationSchema}
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
                          value={values.password}
                          error={errors.password ? true : false}
                          name='password'
                          helperText='Must Contain At Least 8 Characters Must Have At Least One Uppercase, One Lowercase And One Number'
                          label='New Password'
                          type='password'
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          value={values.passwordConfirm}
                          error={errors.passwordConfirm ? true : false}
                          name='passwordConfirm'
                          helperText={errors.passwordConfirm}
                          label='Confirm New Password'
                          type='password'
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
                <Grid item xs={6} className={classes.Links}></Grid>
                <Grid
                  item
                  xs={6}
                  className={classnames(classes.Links, classes.end)}>
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    <Typography color='primary' variant='body1'>
                      Login Here
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

export default Register;
