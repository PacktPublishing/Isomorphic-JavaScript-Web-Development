/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import React from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

function CurrentTime() {
  const elem = canUseDOM && document.querySelector('.time[data-time]');
  const time = elem ? +elem.dataset.time : Date.now();
  return (
    <p className="time" data-time={time}>
      Current time (timestamp in ms): {time}
    </p>
  );
}

export default CurrentTime;
