/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import del from 'del';

async function clean() {
  await del(['build/*', '!build/.git'], { dot: true });
}

export default clean;
