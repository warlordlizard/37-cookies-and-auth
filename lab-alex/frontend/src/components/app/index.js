'use strict';

import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Header from '../header';
import Settings from '../settings';
import Landing from '../landing';
import {tokenSet} from '../../action/auth-actions.js';
import {profileFetchRequest} from '../../action/profile-actions.js';


class App extends React.Component {
  render() {
    return(
      <main className='pictogram'>
        <BrowserRouter>
          <section>
            <Header />
            <Route path='/:auth' component={Landing}/>
            <Route path='/settings' component={Settings}/>
            <Route path='/gallery' component={Gallery} />
          </section>
        </BrowserRouter>
      </main>
    );
  }
}


let mapDispatchToProps = (dispatch) => ({
  tokenSet: (token) => dispatch(tokenSet(token)),
  profileFetch: () => dispatch(profileFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
