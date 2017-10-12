import {JSDOM} from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-dom/test-utils'; // ES6
import ReactDOM from 'react-dom';
import chai, {expect} from 'chai';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(state => state, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  
  return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

// Build helper for simulating events
$.fn.simulate = function (eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export {renderComponent, expect};