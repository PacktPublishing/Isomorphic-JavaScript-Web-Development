import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './reducers';

import Root from './components/Root'

const initialData = JSON.parse(window.__INITIAL_STATE__);

const store = createStore(reducers, initialData);

render((
  <Provider store={store}>
    <BrowserRouter >
      <Root />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));