import React from 'react';
import {connect} from 'react-redux';

import PicForm from '../pic-form';
import * as util from '../../lib/util.js';
import * as picActions from '../../actions/pic-actions.js';

class Pic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleDelete.bind(this);
  }

  handleDelete() {
    return this.props.deletePic(this.props.pic)
      .then(util.log)
      .catch(util.logError);
  }

  handleUpdate(pic) {
    return this.props.updatePic(pic)
      .then(() => {
        this.setState({editing: false});
      })
      .catch(util.logError);
  }

  render() {
    let {pic} = this.props;
    return(
      <div>
        {util.renderIf(!this.state.editing,
          <div>
            <img src={pic.url}/>
            <p>{pic.desc}</p>
            <i onClick={this.handleDelete}
              className='fa fa-trash-o fa-3x' />
            <i onClick={() => this.setState({editing: true})}
              className='fa fa-pencil fa-3x' />
          </div>
        )}

        {util.renderIf(this.state.editing,
          <div>
            <PicForm
              pic={this.props.pic}
              buttonText='update pic'
              onComplete={this.handleUpdate} />
          </div>
        )}
      </div>
    );
  }
}
let mapDispatchToProps = (dispatch) => ({
  deletePic: (pic) => dispatch(picActions.picDeleteRequest(pic)),
  updatePic: (pic) => dispatch(picActions.picUpdateRequest(pic)),
});

export default connect(null, mapDispatchToProps)(Pic);