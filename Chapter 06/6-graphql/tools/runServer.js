/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import path from 'path';
import cp from 'child_process';
import webpackConfig from './webpack.config';

// Should match the text string used in `server.js/server.listen(...)`
const RUNNING_REGEXP = /Node\.js server is listening at http:\/\/(.*?)\//;

let server;
const { output } = webpackConfig.find(x => x.target === 'node');
const serverPath = path.join(output.path, output.filename);

// Launch or restart the Node.js server
function runServer(cb) {
  function onStdOut(data) {
    const time = new Date().toTimeString();
    const match = data.toString('utf8').match(RUNNING_REGEXP);

    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stdout.write(data);

    if (match) {
      server.stdout.removeListener('data', onStdOut);
      server.stdout.on('data', message => process.stdout.write(message));
      if (cb) {
        cb(null, match[1]);
      }
    }
  }

  if (server) {
    server.kill('SIGTERM');
  }

  server = cp.spawn('node', [serverPath], {
    env: Object.assign({ NODE_ENV: 'development' }, process.env),
    silent: false
  });

  server.stdout.on('data', onStdOut);
  server.stderr.on('data', x => process.stderr.write(x));
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

export default runServer;

