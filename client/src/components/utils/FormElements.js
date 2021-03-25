import React, { useState, useEffect } from 'react';
import { Formik, Form as FormikForm, Field } from 'formik';
import { TextField as CustomTextField } from 'formik-material-ui';
import { InputAdornment, IconButton } from '@material-ui/core';

//icons
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlined from '@material-ui/icons/VisibilityOffOutlined';

function MaterialUIFormikTextField(props) {
  return (
    <CustomTextField {...props} variant='outlined' onBlur={props.onBlur} />
  );
}

//Email Element
function MaterialUIFormikTextFieldEmail(props) {
  return (
    <CustomTextField
      {...props}
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment position='start'>
            <MailOutlineOutlinedIcon />
          </InputAdornment>
        ),
      }}
      onBlur={props.onBlur}
    />
  );
}

// Password Element
function MaterialUIFormikTextFieldPassword(props) {
  const [type, setType] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    showPassword ? setType('text') : setType('password');
  }, [showPassword]);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <CustomTextField
      {...props}
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment position='start'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              onMouseDown={handleMouseDownPassword}
              edge='end'>
              {showPassword ? (
                <VisibilityOutlined />
              ) : (
                <VisibilityOffOutlined />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={type}
    />
  );
}

//Form Wrapper Element
export function Form(props) {
  return (
    <Formik {...props}>
      <FormikForm className='needs-validation' noValidate=''>
        {props.children}
      </FormikForm>
    </Formik>
  );
}

//TextField Element
export function TextField(props) {
  const { name, label, type, ...rest } = props;

  return (
    <Field
      style={{ width: '100%' }}
      component={
        type === 'email'
          ? MaterialUIFormikTextFieldEmail
          : type === 'text'
          ? MaterialUIFormikTextField
          : MaterialUIFormikTextFieldPassword
      }
      name={name}
      type={type}
      label={label}
      {...rest}
    />
  );
}
