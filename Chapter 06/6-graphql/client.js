/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import 'babel-core/register';
import ReactDOM from 'react-dom';
import Router from './core/Router';

function run() {
  const location = { path: window.location.pathname };
  const [component, page] = Router.match(location, window.AppState);
  ReactDOM.hydrate(component, document.getElementById('app'), () => {
    document.title = page.title;
  });
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}
