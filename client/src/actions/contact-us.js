import api from '../utils/api';

// @route    POST api/contact-us
// @desc     Send Concern
// @access   Public
export const sendConcern = (formData, setResponse) => async dispatch => {
  try {
    const res = await api.post('/contact-us', formData);
    setResponse(
      'You successfully reset your password try to login.',
      res.status,
      res.data.errors,
    );
  } catch (err) {
    setResponse(
      err.response.data.msg,
      err.response.status,
      err.response.data.errors,
    );
  }
};
