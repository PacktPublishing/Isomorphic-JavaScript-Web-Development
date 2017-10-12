/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import del from 'del';
import webpack from 'webpack';
import Promise from 'bluebird';
import run from './run';
import webpackConfig from './webpack.config';

async function clean() {
  await del(['build/*', '!build/.git'], { dot: true });
}

async function copy() {
  const ncp = Promise.promisify(require('ncp'));
  await ncp('public', 'build/public');
  await ncp('package.json', 'build/package.json');
}

function bundle({ watch }) {
  return new Promise((resolve, reject) => {
    let bundlerRunCount = 0;
    const bundler = webpack(webpackConfig);
    const cb = (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      console.log(stats.toString(webpackConfig[0].stats));

      if (++bundlerRunCount === (watch ? webpackConfig.length : 1)) {
        resolve();
      }
    };

    if (watch) {
      bundler.watch(200, cb);
    } else {
      bundler.run(cb);
    }
  });
}

async function build(options = { watch: false }) {
  await run(clean);
  await run(copy);
  await run(bundle, options);
}

export default build;
