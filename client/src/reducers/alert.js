import { SET_DIALOG_BOX, SET_BACKDROP } from '../actions/types';

const initialState = {
  backDropOpen: false,
  dialogBox: { isOpen: false, title: '' },
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DIALOG_BOX:
      return {
        ...state,
        dialogBoxOpen: payload,
      };
    case SET_BACKDROP:
      return {
        ...state,
        backDropOpen: payload,
      };
    default:
      return state;
  }
}
