/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import React from 'react';
import PropTypes from 'prop-types';

function Header({ children }) {
  return (
    <header>
      <div>
        <span>My App</span>
        {
          !children &&
          <form><input type="search" /></form>
        }
        <div>
          <span>Username</span>
          <img src="#" alt="" />
        </div>
      </div>
      {children}
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.element
};

export default Header;
