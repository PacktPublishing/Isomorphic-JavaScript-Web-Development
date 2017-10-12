/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import React from 'react';
import Context from '../components/Context';

const routes = [
  require('../routes/Home').default,
  require('../routes/Test').default,
  require('../routes/NotFound').default
];

const router = {
  match(location, state) {
    let component;
    const page = {
      title: 'My Application',
      description: 'Isomorphic web application sample',
      status: 200
    };
    const route = routes.find(x => x.path === location.path);

    if (route) {
      try {
        component = route.action();
      } catch (err) {
        component = routes.find(x => x.path === '/500').action();
        page.status = 500;
      }
    } else {
      component = routes.find(x => x.path === '/404').action();
      page.status = 404;
    }

    return [<Context {...state} page={page}>{component}</Context>, page];
  }
};

export default router;
