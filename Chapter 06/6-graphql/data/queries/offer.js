/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull
} from 'graphql';

import Offer from '../models/Offer';
import OfferType from '../types/OfferType';

const viewer = {

  type: OfferType,

  args: {
    id: { type: new NonNull(ID) }
  },

  resolve(root, { id }) {
    return Offer.findById(id);
  }

};

export default viewer;
