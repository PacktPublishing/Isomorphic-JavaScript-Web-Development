/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import 'babel-core/register';
import path from 'path';
import express from 'express';
import graphql from 'express-graphql';
import React from 'react';
import ReactDOM from 'react-dom/server';
import models from './data/models';
import schema from './data/schema';
import Router from './core/Router';
import Html from './components/Html/Html';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (typeof req.query.admin !== 'undefined') {
    req.user = { id: 1 }; // eslint-disable-line no-param-reassign
  } else {
    req.user = null; // eslint-disable-line no-param-reassign
  }
  next();
});

app.use('/graphql', graphql({
  schema,
  rootValue: { user: { id: 1 } },
  pretty: process.env.NODE_ENV !== 'production',
  graphiql: true
}));

app.get('*', (req, res) => {
  const state = { user: req.user };
  const [component, page] = Router.match(req, state);
  const body = ReactDOM.renderToString(component);
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title={page.title}
      description={page.description}
      body={body}
      state={state}
    />
  );
  res.status(page.status).send(`<!doctype html>\n${html}`);
});

/* eslint-disable no-console */
models.sync({ force: process.env.NODE_ENV !== 'production' })
  .catch(err => console.error(err.stack))
  .then(() => {
    app.listen(port, () => console.log(
      `Node.js server is listening at http://localhost:${port}/`
    ));
  });
/* eslint-enable no-console */
