/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

import UserType from './UserType';

const OfferType = new ObjectType({

  name: 'Offer',

  fields: {

    id: { type: new NonNull(ID) },

    title: { type: new NonNull(StringType) },

    author: { type: new NonNull(UserType) },

    description: { type: new NonNull(StringType) }

  }

});

export default OfferType;
