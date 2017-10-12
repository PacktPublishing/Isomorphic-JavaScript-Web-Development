/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import viewer from './queries/viewer';
import greeting from './queries/greeting';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      viewer,
      greeting
    }
  })
});

export default schema;
