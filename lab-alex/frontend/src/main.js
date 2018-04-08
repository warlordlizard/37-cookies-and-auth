'use strict';

import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import appCreateStore from './lib/app-create-store.js';

let store = appCreateStore();

let ProWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDom.render(<ProWrapper />, document.getElementById('root'));