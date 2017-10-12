import { MemoryRouter } from 'react-router-dom'
import About from '../components/About'
import chai, {expect} from 'chai';

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './../reducers';

import React from 'react';

import { configure, mount, shallow, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());

suite('Enzyme test suite', function () {
  
  test('simple dom test', function () {
    const component = render(
      <About />
    );
    expect(component.find('.about-msg')).to.have.text('Hello');
  });
  
  test('simple test', function () {
    const $node = shallow(
      <About />
    );
    expect($node.find('.about-msg')).to.have.text('Hello');
  });
  
  test('test router', function () {
    const $node = mount(
      <Provider store={createStore(reducers)}>
        <MemoryRouter >
          <About />
        </MemoryRouter>
      </Provider>
    );
    
    $node.find('.about-btn').simulate('click');
    
    expect($node.find('.about-msg').text()).to.equal('World');
  });
  
  
  
});