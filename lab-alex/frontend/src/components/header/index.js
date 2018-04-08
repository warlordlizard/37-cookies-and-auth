'use strict';

import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return(
      <header className='header'>
        <h2>PictoGram</h2>
        <nav>
          <ul>
            <li><Link to='/signup'>signup</Link></li>
            <li><Link to='/login'>login</Link></li>
            <li><Link to='/settings'>settings</Link></li>
            <li><Link to='/gallery'>gallery</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}