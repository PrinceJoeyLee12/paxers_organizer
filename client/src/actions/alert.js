import { SET_BACKDROP, SET_DIALOG_BOX } from './types';

export const setBackdrop = state => async dispatch => {
  dispatch({
    type: SET_BACKDROP,
    payload: state,
  });
};

export const setDialogBox = (state, title) => async dispatch => {
  dispatch({
    type: SET_DIALOG_BOX,
    payload: {
      isOpen: state,
      title,
    },
  });
};
