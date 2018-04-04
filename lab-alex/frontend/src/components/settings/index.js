import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../profile-form';
import {profileCreateRequest} from '../../actions/profile-actions.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfileCreate = this.handleProfileCreate.bind(this);
  }
  handleProfileCreate(profile) {
    return this.props.profileCreate(profile)
      .then( res => {
        console.log('profile created:', res);
      })
      .catch(console.error);
  }

  render() {
    let handleComplete = this.props.profile ? this.handleProfileCreate : null;

    return(
      <section className='settings'>
        <h2>Settings:</h2>
        <ProfileForm
          buttonText='create profile'
          onComplete={this.handleProfileCreate} />
      </section>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);