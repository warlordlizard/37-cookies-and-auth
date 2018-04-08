import React from 'react';
import {connect} from 'react-redux';

import PhotoForm from '../photo-form';
import * as util from '../../lib/util.js';
import * as photoActions from '../../actions/photo-actions.js';

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleDelete.bind(this);
  }

  handleDelete() {
    return this.props.deletePhoto(this.props.photo)
      .then(util.log)
      .catch(util.logError);
  }

  handleUpdate(photo) {
    return this.props.updatePhoto(photo)
      .then(() => {
        this.setState({editing: false});
      })
      .catch(util.logError);
  }

  render() {
    let {photo} = this.props;
    return(
      <div>
        {util.renderIf(!this.state.editing,
          <div>
            <img src={photo.url}/>
            <p>{photo.desc}</p>
            <i onClick={this.handleDelete}
              className='fa fa-trash-o fa-3x' />
            <i onClick={() => this.setState({editing: true})}
              className='fa fa-pencil fa-3x' />
          </div>
        )}

        {util.renderIf(this.state.editing,
          <div>
            <PhotoForm
              photo={this.props.photo}
              buttonText='update photo'
              onComplete={this.handleUpdate} />
          </div>
        )}
      </div>
    );
  }
}
let mapDispatchToProps = (dispatch) => ({
  deletePhoto: (photo) => dispatch(photoActions.photoDeleteRequest(photo)),
  updatePhoto: (photo) => dispatch(photoActions.photoUpdateRequest(photo)),
});

export default connect(null, mapDispatchToProps)(Photo);