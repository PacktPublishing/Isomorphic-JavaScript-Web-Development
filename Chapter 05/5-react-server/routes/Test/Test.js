/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from '../../core/fetch';
import CurrentTime from '../../components/CurrentTime';
import LikeButton from '../../components/LikeButton';
import Layout from '../../components/Layout';

const path = '/test';
const action = () => <Layout><Test /></Layout>;

class Test extends Component {

  static contextTypes = {
    page: PropTypes.shape({
      title: PropTypes.string
    }),
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
  };

  state = { data: 'loading...' };

  componentDidMount2() {
    fetch('/api/test').then(x => x.json()).then(data => this.setState({ data }));
  }
  async componentWillMount() {
    try {
      const response = await fetch('/api/test');
      const data = await response.text();
      console.log('>>> data:', data);
      this.setState({ data });
    } catch (err) {
      console.error(err);
      this.setState({ data: 'Error: ' + err.message });
    }
  }

  render() {
    const { page, user } = this.context;
    page.title = 'Test Page';

    return (
      <div>
        <h1>{page.title}</h1>
        <div><LikeButton likes={5} liked={false}/></div>
        <hr />
        <p>Welcome, {user ? user.name : 'Guest'}!</p>
        <CurrentTime />
        <p>Server response: {this.state.data}</p>
      </div>
    );
  }
}

export default { path, action };
