/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

function Layout({ hero, children }) {
  return (
    <div>
      <Header>{hero}</Header>
      <main>
        {children}
      </main>
      <footer>
        <span>© Company Name</span>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  hero: PropTypes.element,
  children: PropTypes.element.isRequired
};

export default Layout;
