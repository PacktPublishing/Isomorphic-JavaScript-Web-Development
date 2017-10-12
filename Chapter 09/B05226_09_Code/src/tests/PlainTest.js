import TestUtils from 'react-dom/test-utils';
import { Route, Link, MemoryRouter } from 'react-router-dom'
import About from '../components/About'
import chai, {expect} from 'chai';
import chaiJquery from 'chai-jquery';
import {JSDOM} from 'jsdom';
import jquery from 'jquery';

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './../reducers';

import React from 'react';
import ReactDOM from 'react-dom';


function setupTests() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  global.window = dom.window;
  global.document = dom.window.document;
  const $ = jquery(global.window);
  // Set up chai-jquery
  chaiJquery(chai, chai.util, $);
  
  return $;
}

require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;

suite('test suite', function () {
  
  const $ = setupTests();
  
  test('simple dom test', function () {
    const component = TestUtils.renderIntoDocument(
      <About />
    );
    const renderedComponent = ReactDOM.findDOMNode(component);
    expect(renderedComponent.querySelector('.about-msg').textContent).to.equal('Hello');
  });
  
  test('simple test', function () {
    const $node = $(ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <About />
    )));
    expect($node.find('.about-msg')).to.have.text('Hello');
  });
  
  test('test router', function () {
    const $node = $(ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={createStore(reducers)}>
        <MemoryRouter >
          <About />
        </MemoryRouter>
      </Provider>
    )));
    
    TestUtils.Simulate.click($node.find('.about-btn')[0], {
      button: 0
    });
    
    expect($node.find('.about-msg').text()).to.equal('World');
  });
  
  
  
});