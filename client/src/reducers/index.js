import { combineReducers } from 'redux';

//reducers
import auth from './auth';
import menuItems from './menuItems';
import alert from './alert';

export default combineReducers({
  auth,
  menuItems,
  alert,
});
