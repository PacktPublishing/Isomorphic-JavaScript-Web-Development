import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Root from './modules/Root'

const initialData = JSON.parse(window.__INITIAL_STATE__);

render((
  <BrowserRouter >
    <Root initialData={initialData}/>
  </BrowserRouter>
), document.getElementById('app'));