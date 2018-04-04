'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Header from '../header';
import Settings from '../settings';
import Landing from '../landing';
import appCreateStore from '../../lib/app-create-store.js';

let store = appCreateStore();

export default class App extends React.Component {
  render() {
    return(
      <main className='pictogram'>
        <Provider store={store}>
          <BrowserRouter>
            <section>
              <Header />
              <Route path='/:auth' component={Landing}></Route>
              <Route path='/settings' component={Settings}></Route>
            </section>
          </BrowserRouter>
        </Provider>
      </main>
    );
  }
}