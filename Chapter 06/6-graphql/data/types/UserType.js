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

const UserType = new ObjectType({

  name: 'User',

  fields: {

    id: { type: new NonNull(ID) },

    username: { type: new NonNull(StringType) },

    email: { type: new NonNull(StringType) },

    displayName: { type: new NonNull(StringType) }

  }

});

export default UserType;
