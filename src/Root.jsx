/* eslint-disable react/no-children-prop */
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './redux/store';

const routes = null; // TODO
const history = syncHistoryWithStore(browserHistory, store);

const Root = () => (
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>
);

export default Root;
