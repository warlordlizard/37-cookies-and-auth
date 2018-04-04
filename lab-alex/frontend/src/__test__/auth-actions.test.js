import {tokenSet, tokenDelete, signupRequest, loginRequest} from '../actions/auth-actions.js';
import superagent from 'superagent';

const randomNum = max => {
  return Math.floor(Math.random() * max);
};

const testUser = {
  username: `mockit${randomNum(999)}`,
  email: `mockit${randomNum(999)}@email.com`,
  password: '123456789',
};

describe('Auth actions', () => {
  let tempUser;
  it('should return TOKEN_SET action when given tokenSet', () => {
    let action = tokenSet({ token: 'a1b2'});
    expect(action.type).toEqual('TOKEN_SET');
    expect(action.payload).toBeTruthy();
    expect(action.payload.token).toEqual('a1b2');
  });

  it('should return a TOKEN_DELETE action when given tokenDelete', () => {
    let token = 'a1b2';
    let action = tokenDelete(token);
    expect(action.type).toEqual('TOKEN_DELETE');
  });

  it('should return a token on signupRequest', done => {
    superagent.post('http://localhost:3000/signup')
      .send(testUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toBeTruthy();
        expect(typeof res.text).toEqual('string');
        expect(err).toEqual(null);
        tempUser= testUser;
        console.log('__SIGNUP__', tempUser);
        done();
      });
  });

  it('should return a token on loginRequest', done => {
    superagent.get('http://localhost:3000/login')
      .auth(tempUser.username, tempUser.password)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toBeTruthy();
        expect(typeof res.text).toEqual('string');
        expect(err).toEqual(null);
        console.log('__LOGIN__', tempUser);
        done();
      });
  });
});