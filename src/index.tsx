import 'babel-polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import App from './components/app';
import ContentForm from './components/ContentForm';

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='content/:type/:id(/:lang)/' component={ContentForm} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))