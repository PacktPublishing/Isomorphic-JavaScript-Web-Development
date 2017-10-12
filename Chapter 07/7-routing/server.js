import React from 'react'
import express from 'express'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { StaticRouter } from 'react-router'
import App from './modules/App'

import path from 'path';

const app = express();

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  
  const context = {};
  const html = renderToString(
    <StaticRouter
      location={req.url}
      context={context} >
    
      <App />
    
    </StaticRouter>
  );
  
  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    res.redirect(302, context.url);
  } else {
    res.set('content-type', 'text/html');
    res.send(renderPage(html, {}));
    //res.sendFile('index.html'); // -> without initial data
  }
});

function renderPage(appHtml, initialState) {
  return `
    <!doctype html>
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
    <script type="text/javascript" charset="utf-8">
      window.__INITIAL_STATE__ = '${JSON.stringify(initialState)}';
    </script>
   `
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log('Production Express server running at localhost:' + PORT)
});