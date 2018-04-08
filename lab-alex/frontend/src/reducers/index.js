import {combineReducers} from 'redux';
import auth from './auth.js';
import profile from './profile.js';
import photo from './photo.js';


export default combineReducers({
  auth,
  profile,
  photo,
});
