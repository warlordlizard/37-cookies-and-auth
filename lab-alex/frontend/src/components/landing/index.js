'use strict';

import React from 'react';
import { connect } from 'react-redux';
import AuthForm from '../auth-form';
import * as util from '../../lib/util.js';
import {signupRequest, loginRequest} from '../../actions/auth-actions.js';
import {profileFetchRequest} from '../../actions/profile-actions.js';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.auth && props.profile)
      props.history.replace('/gallery');
    if (props.auth && !props.profile)
      props.history.replace('/settings');
  }

  handleLogin(user) {
    let {profileFetch, history} = this.props;
    return this.props.login(user)
      .then(() => profileFetch())
      .then(() => history.push('/gallery'))
      .catch(util.logError);
  }

  handleSignup(user) {
    return this.props.signup(user)
      .then(() => {
        this.props.history,push('/settings');
      })
      .catch(util.logError);
  }

  render() {
    let {params} = this.props.match;
    let handleComplete = params.auth === 'login' ? this.handleLogin : this.handleSignup;

    return(
      <section>
        <AuthForm auth={params.auth} onComplete={handleComplete} />
      </section>
    );
  }
}

let mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signupRequest(user)),
    login: (user) => dispatch(loginRequest(user)),
    profileFetch: () => dispatch(profileFetchRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);