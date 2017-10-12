/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Hero from './Hero';

const path = '/';
const action = () => <Layout hero={<Hero />}><Home /></Layout>;

class Home extends Component {
  handleClick(event) {
    event.preventDefault();
    window.location = event.currentTarget.pathname;
  }
  render() {
    return (
      <div>
        <h2>Popular things to rent</h2>
        <div>
          <a href="/s/Tools" onClick={this.handleClick}>
            <span>Tools</span>
          </a>
          <a href="/s/Books" onClick={this.handleClick}>
            <span>Books</span>
          </a>
          ...
        </div>
      </div>
    );
  }
}

export default { path, action };
