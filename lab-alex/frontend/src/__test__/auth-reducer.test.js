import authReducer from '../reducers/auth.js';

describe('Auth Reducer', () => {
  it('should have initial state of null', () => {
    let result = authReducer(undefined, {type:null});
    expect(result).toEqual(null);
  });
  it('should return state if no action.type', () => {
    let state = {username: 'bob', email:'bob@email.com', password:'123456789'};
    let result = authReducer(state, {type:null});
    expect(result).toEqual(state);
  });
});