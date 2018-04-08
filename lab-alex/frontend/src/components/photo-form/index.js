import React from 'react';
import * as util from '../../lib/util.js';

class PicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.pic ? props.pic : {desc: '', preview: '', pic: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let {name} = e.target;
    if(name === 'desc'){
      this.setState({desc: e.target.value});
    }
    if(name === 'pic'){
      let {files} = e.target;
      let pic = files[0];
      this.setState({pic});
      util.photoToDataUrl(pic)
        .then(preview => this.setState({preview}))
        .catch(util.logError);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    return this.props.onComplete(this.state)
      .then(() => {
        if(!this.props.profile){
          this.setState({desc: '', preview: '', pic: null});
        }
      });
  }

  render() {
    return(
      <form
        className='pic-form'
        onSubmit={this.handleSubmit}>

        {util.renderIf(this.state.preview,
          <img className='pic-preview' src={this.state.preview || this.state.url ||''} />)}
        <input
          name='pic'
          type='file'
          onChange={this.handleChange} />
        <input
          name='desc'
          type='text'
          value={this.state.desc}
          onChange={this.handleChange} />
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    );
  }
}

export default PicForm;