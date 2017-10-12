/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2015 Konstantin Tarkus, Packt Publishing
 * All rights reserved.
 */

import 'babel-core/register';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './components/Html';
import App from './components/App';

const server = express();
const port = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, 'public')));

server.get('*', (req, res) => {
  const body = ReactDOM.renderToString(<App />);
  const html = ReactDOM.renderToStaticMarkup(<Html
    title="My App"
    description="Isomorphic web application sample"
    body={body} />);
  res.send('<!doctype html>\n' + html);
});

server.listen(port, () => console.log(
  `Node.js server is listening at http://localhost:${port}/`
));
