/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import { GraphQLString as StringType } from 'graphql';

const greeting = {

  type: StringType,

  args: {
    name: {
      type: StringType,
    },
  },

  resolve(_, { name }) {
    return `Welcome, ${name || 'Guest'}!`;
  },

};

export default greeting;
