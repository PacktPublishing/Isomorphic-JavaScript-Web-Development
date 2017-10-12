/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import User from '../models/User';
import UserType from '../types/UserType';

const viewer = {

  type: UserType,

  resolve({ user }) {
    return User.load(user && user.id);
  }

};

export default viewer;
