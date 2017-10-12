import React from 'react'
import express from 'express'
// we'll use this to render our app to an html string
import {renderToString} from 'react-dom/server'
// and these to match the url to routes and then render
import {StaticRouter} from 'react-router'
import Root from './src/components/Root'

import path from 'path';
import {matchRoutes} from 'react-router-config'
import routes from './routesConfig'
import {Provider} from 'react-redux'
import { createStore } from 'redux';
import reducers from './src/reducers';

const app = express();

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

const loadBranchData = (location) => {
  const branch = matchRoutes(routes, location);
  
  const promises = branch.map(({route, match}) => {
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null)
  });
  
  return Promise.all(promises)
};

app.get('*', (req, res) => {
  
  loadBranchData(req.url).then((initialData) => {
    const context = {};
    
    initialData = { auth: { authenticated : false}};
    
    const store = createStore(reducers, initialData);
    
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}>
          <Root initialData={initialData}/>
        </StaticRouter>
      </Provider>
    );
    
    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      console.log(`REDIRECTED! to ${context.url}`);
      res.redirect(302, context.url);
    } else {
      res.set('content-type', 'text/html');
      console.log("initial data from server");
      console.log(initialData);
      res.send(renderPage(html, initialData));
      //res.sendFile('index.html'); // -> without initial data
    }
  });
  
});

function renderPage(appHtml, initialState) {
  return `
    <!doctype html>
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script type="text/javascript" charset="utf-8">
      window.__INITIAL_STATE__ = '${JSON.stringify(initialState)}';
      console.log(window.__INITIAL_STATE__);
    </script>
    <script src="/bundle.js"></script>
   `
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log('Production Express server running at localhost:' + PORT)
});