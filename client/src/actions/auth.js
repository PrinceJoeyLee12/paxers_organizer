import api from '../utils/api';
import { toast } from 'react-toastify';
import {
  AUTH_ERROR,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types';

// import { getAuthMenuItems, getGuestMenuItems } from './menuItems';

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');
    //  dispatch(getAuthMenuItems());
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// @route    GET api/auth/google
// @desc     Register User using Google Oauth
// @access   Public
export const googleSignIn = setResponse => async dispatch => {
  try {
    await api.get('/auth/google');
    dispatch(loadUser());
  } catch (err) {
    setResponse(err.response.data.msg, err.response.status);
  }
};

// @route    POST api/user/register
// @desc     Register User
// @access   Public
export const register = (formData, setResponse) => async dispatch => {
  try {
    const res = await api.post('/user/register', formData);
    setResponse('', res.status);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    setResponse(err.response.data.msg, err.response.status);
  }
};

// @route    POST api/auth/login
// @desc     Login in user
// @access   Public
export const login = (formData, setResponse) => async dispatch => {
  try {
    const res = await api.post('/auth/login', formData);
    setResponse('', res.status, {});
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    setResponse(
      err.response.data.msg,
      err.response.status,
      err.response.data.errors,
    );
  }
};

// @route    POST api/auth/forgotPassword
// @desc     Forgot Password
// @access   Public
export const forgotPassword = (
  textChangeAfterSubmit,
  setError,
  email,
) => async dispatch => {
  try {
    textChangeAfterSubmit('Sending...');
    const res = await api.post('/auth/forgotpassword', { email });
    textChangeAfterSubmit('Link Sent');
    console.log(res);
    toast.success(res.data.msg);
  } catch (err) {}
};

// @route    POST api/auth/reset-password
// @desc     Reset Password
// @access   Private
export const resetPassword = (
  formData,
  textChangeAfterSubmit,
  setErrors,
  history,
) => async dispatch => {
  try {
    textChangeAfterSubmit('Resetting...');
    const res = await api.post('/auth/reset-password', formData);
    textChangeAfterSubmit('Success');
    toast.success(res.data.msg);
    history.push('/login');
  } catch (err) {}
};

export const logout = () => async dispatch => {
  localStorage.removeItem('prevPath');
  dispatch({ type: LOGOUT });
  //   dispatch(getGuestMenuItems());
};
