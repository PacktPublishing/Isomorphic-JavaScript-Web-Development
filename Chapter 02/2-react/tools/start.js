/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import path from 'path';
import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import run from './run';
import runServer from './runServer';
import webpackConfig from './webpack.config';

// Launch the development web server with Browsersync and HMR
async function start() {
  await run(require('./clean'));
  await new Promise((resolve) => {
    // Inject HMR functionality into client-side bundle configurations
    /* eslint-disable no-param-reassign */
    webpackConfig.filter(x => x.target !== 'node').forEach((x) => {
      x.entry = [x.entry, 'webpack-hot-middleware/client'];
      x.plugins.push(new webpack.HotModuleReplacementPlugin());
      x.plugins.push(new webpack.NoErrorsPlugin());
    });
    /* eslint-enable no-param-reassign */

    const bundler = webpack(webpackConfig);
    const middleware = [
      webpackDevMiddleware(bundler, {
        stats: webpackConfig[0].stats
      }),
      ...(bundler.compilers
        .filter(compiler => compiler.options.target !== 'node')
        .map(compiler => webpackHotMiddleware(compiler)))
    ];
    let handleServerBundleComplete = () => {
      runServer((err, host) => {
        if (!err) {
          const bs = Browsersync.create();
          bs.init({
            proxy: { target: host, middleware },
            serveStatic: [
              path.join(__dirname, '../public'),
              path.join(__dirname, '../node_modules/graphiql'),
              path.join(__dirname, '../node_modules/react/dist'),
              path.join(__dirname, '../node_modules/react-dom/dist'),
              path.join(__dirname, '../node_modules/whatwg-fetch')
            ]
          }, resolve);
          handleServerBundleComplete = runServer;
        }
      });
    };

    bundler.plugin('done', () => handleServerBundleComplete());
  });
}

export default start;

