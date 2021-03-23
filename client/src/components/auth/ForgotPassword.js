import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { Form, TextField } from './FormElements';

//Material UI
import {
  Grid,
  Avatar,
  Button,
  CssBaseline,
  Container,
  Typography,
  List,
  ListItem,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

//Custom Styling

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Typography: {
    marginBottom: theme.spacing(2),
    color: 'red',
  },

  Links: {
    padding: '10px',
  },
  end: {
    textAlign: 'end',
  },
}));

const ForgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email field is required'),
});

const ForgetPassword = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <ToastContainer />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MailOutlineIcon />
          </Avatar>
          <Typography
            component='h6'
            variant='h6'
            className={classes.Typography}>
            Forgot Password
          </Typography>
          <Typography component='p' variant='h6'>
            Change your password in three easy steps. This will help you to
            secure your password!
          </Typography>
          <List>
            <ListItem>
              <Typography component='p'>1. Email address below.</Typography>
            </ListItem>
            <ListItem>
              <Typography component='p'>
                2. Will send you a temporary link.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component='p'>
                3. Use the link to reset your password
              </Typography>
            </ListItem>
          </List>
          <Divider />
          <Grid
            container
            spacing={2}
            direction='row'
            justify='center'
            alignItems='center'
            className={classes.form}>
            <Grid item xs={12}>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={ForgotPasswordValidationSchema}
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
                        <Button
                          type='submit'
                          color='primary'
                          fullWidth
                          variant='contained'
                          onClick={handleSubmit}
                          disabled={isSubmitting || !isValid}>
                          Send Me A Link
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

export default ForgetPassword;
