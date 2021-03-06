import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
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
import HeadsetMicOutlinedIcon from '@material-ui/icons/HeadsetMicOutlined';

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
  FormControl: {
    width: '100%',
    '& .MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0,
    },
  },
}));

//APOLLO
const ADD_CONCERN = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $email: String!
    $message: String!
  ) {
    addConcern(
      record: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        message: $message
      }
    ) {
      recordId
      record {
        createAt
        firstName
        lastName
        email
        message
      }
    }
  }
`;

//Form Validations
const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email field is required'),
  firstName: Yup.string().required('First Name field is required'),
  lastName: Yup.string().required('Last Name field is required'),
  message: Yup.string()
    .min(20, 'Messages should be a minimum of 20 characters')
    .max(300, 'Messages should be a maximum of 300 characters')
    .required('Message field is required'),
});

const ContactForm = ({ setDialogBox }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [apiErrors, setApiErrors] = useState({});
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const [addConcern, { error, data }] = useMutation(ADD_CONCERN);

  useEffect(() => {
    if (data) {
      console.log(data);
      setSubmitted(true);
      setSuccess(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
      setSuccess(false);
      setSubmitted(false);
      toast.error(`There's an error on our side. Please try again later`);
    }
  }, [error]);

  return (
    <Fragment>
      <ToastContainer />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HeadsetMicOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Contact Us
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
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  message: '',
                }}
                validationSchema={LoginValidationSchema}
                onSubmit={(values, { setErrors }) => {
                  setApiErrors({});
                  setErrors({});
                  setSubmitted(false);
                  if (!submitted) addConcern({ variables: { ...values } });
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
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoFocus
                          value={!success ? values.firstName : ''}
                          error={errors.firstName ? true : false}
                          helperText={errors.firstName}
                          name='firstName'
                          label='First Name'
                          type='text'
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          value={!success ? values.lastName : ''}
                          error={errors.lastName ? true : false}
                          helperText={errors.lastName}
                          name='lastName'
                          label='Last Name'
                          type='text'
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          value={!success ? values.email : ''}
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
                          label='Your Message'
                          multiline
                          rows={5}
                          fullWidth
                          value={!success ? values.message : ''}
                          error={
                            errors.message || apiErrors.message ? true : false
                          }
                          helperText={errors.message || apiErrors.message}
                          name='message'
                          type='text'
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
                          disabled={(isSubmitting || !isValid) && !submitted}>
                          {submitted && success
                            ? 'Concern Submitted'
                            : isSubmitting && isValid
                            ? 'Please wait...'
                            : 'Submit'}
                          {isSubmitting && !success && (
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
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    <Typography color='primary' variant='body1'>
                      Login
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

export default ContactForm;
