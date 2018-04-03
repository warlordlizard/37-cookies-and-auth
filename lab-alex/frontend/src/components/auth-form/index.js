'use strict';

import React from 'react';
import * as util from '../../lib/util.js';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password:'',
      usernameError: null,
      passwordError: null,
      emailError: null,
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    let {name, value} = e.target;

    this.setState({
      [name]: value,
      usernameError: name === 'username' && !value ? 'username required' : null,
      emailError: name === 'email' && !value ? 'email required' : null,
      passwordError: name === 'password' && !value ? 'password required' : null,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state)
      .then( () => {
        this.setState({ username: '', email: '', password: ''});
      })
      .catch(error => {
        console.error(error);
        this.setState({error});
      }); 
  }

  render() {
    return(
      <form className='auth-form' onSubmit={this.handleSubmit}>
        {util.renderIf(this.props.auth === 'signup', 
          <input
            type='email'
            name='email'
            placeholder='enter email'
            value={this.state.email}
            onChange={this.handleChange} />
        )}
        <input
          type='text'
          name='username'
          placeholder='enter username'
          value={this.state.username}
          onChange={this.handleChange} />
        <input
          type='password'
          name='password'
          placeholder='enter password'
          value={this.state.password}
          onChange={this.handleChange} />
        <button type='submit'>{this.props.auth}</button>
      </form>
    );
  }
}