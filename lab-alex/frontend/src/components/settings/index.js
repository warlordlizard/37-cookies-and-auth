import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../profile-form';
import {profileCreateRequest, profileUpdateRequest} from '../../actions/profile-actions.js';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfileCreate = this.handleProfileCreate.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }
  handleProfileCreate(profile) {
    return this.props.profileCreate(profile)
      .then( () => {
        this.props.history.push('/gallery');
      })
      .catch(console.error);
  }

  handleProfileUpdate(profile) {
    return this.props.profileUpdate(profile)
      .catch(console.error);
  }

  render() {
    let handleComplete = this.props.profile ? this.handleProfileUpdate : this.handleProfileCreate;

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
  profileUpdate: (profile) => dispatch(profileUpdateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);