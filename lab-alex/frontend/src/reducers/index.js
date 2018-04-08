import {combineReducers} from 'redux';
import auth from './auth.js';
import profile from './profile.js';
import pic from './pic.js';


export default combineReducers({
  auth,
  profile,
  pic,
});
