/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const Tag = Model.define('Tag', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  slug: {
    type: DataType.TEXT
  },

  name: {
    type: DataType.TEXT
  }

});

export default Tag;
