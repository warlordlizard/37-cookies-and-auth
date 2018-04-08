import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';
import * as picActions from '../../actions/pic-actions.js';

import PicForm from '../pic-form';
import Pic from '../pic';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.picsFetch()
      .catch(util.logError);
  }

  render() {
    return(
      <div className='gallery'>
        <h2>Gallery</h2>
        <PicForm
          buttonText='post'
          onComplete={(pic) =>{
            return this.props.picCreate(pic)
              .catch(util.log);
          }}/>
        {this.props.pics.map(pic => 
          <Pic key={pic._id} pic={pic} />
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  pics: state.pics,
});

let mapDispatchToProps = (dispatch) => ({
  picCreate: (pic) => dispatch(picActions.picCreateRequest(pic)),
  picsFetch: (pics) => dispatch(picActions.picsFetchRequest(pic)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);