/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LikeButton extends Component {
  static propTypes = {
    likes: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired
  };

  state = { liked: this.props.liked };

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ liked: !this.state.liked });
  };

  render() {
    const { likes, ...other } = this.props;
    const color = this.state.liked ? 'inherit' : 'grey';
    const count = likes + (this.state.liked ? 1 : 0);

    return (
      <button {...other} onClick={this.handleClick}>
        <span style={{ color }}>♥</span> Like ({count})
      </button>
    );
  }
}

export default LikeButton;
