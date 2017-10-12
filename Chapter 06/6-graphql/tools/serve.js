/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import path from 'path';
import cp from 'child_process';
import Promise from 'bluebird';
import build from './build';
import run from './run';

async function serve() {
  const watch = true;
  const gaze = Promise.promisify(require('gaze'));
  await run(build, { watch });
  await new Promise((resolve, reject) => {
    function start() {
      const server = cp.spawn(
        'node',
        [path.join(__dirname, '../build/server.js')],
        {
          env: Object.assign({ NODE_ENV: 'development' }, process.env),
          silent: false
        }
      );

      server.stdout.on('data', (data) => {
        process.stdout.write(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
        process.stdout.write(data);
        if (data.toString('utf8').includes('Node.js server is listening at')) {
          resolve();
        }
      });
      server.stderr.on('data', data => process.stderr.write(data));
      server.once('error', err => reject(err));
      process.on('exit', () => server.kill('SIGTERM'));
      return server;
    }

    let server = start();

    if (watch) {
      gaze('build/server.js').then((watcher) => {
        watcher.on('changed', () => {
          server.kill('SIGTERM');
          server = start();
        });
      });
    }
  });
}

export default serve;
