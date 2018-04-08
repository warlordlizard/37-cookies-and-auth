import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';
import * as photoActions from '../../actions/photo-actions.js';

import PhotoForm from '../photo-form';
import Photo from '../photo';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.photosFetch()
      .catch(util.logError);
  }

  render() {
    return(
      <div className='gallery'>
        <h2>Gallery</h2>
        <PhotoForm
          buttonText='post'
          onComplete={(photo) =>{
            return this.props.photoCreate(photo)
              .catch(util.log);
          }}/>
        {this.props.photos.map(photo => 
          <Photo key={photo._id} photo={photo} />
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  photos: state.photos,
});

let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoActions.photoCreateRequest(photo)),
  photosFetch: (photos) => dispatch(photoActions.photosFetchRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);