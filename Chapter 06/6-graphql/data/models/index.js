/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import faker from 'faker';
import sequelize from '../sequelize';
import User from './User';
import Tag from './Tag';
import Offer from './Offer';

Offer.belongsTo(User, {
  as: 'author'
});

User.hasMany(Offer, {
  as: 'offers',
  foreignKey: 'authorId'
});

Tag.belongsToMany(Offer, {
  as: 'offers',
  through: 'TagOffer'
});

async function sync(options) {
  // Create db tables
  await sequelize.sync(options);
  if (!options.force) return;

  // Import seed data
  for (let i = 0; i < 50; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    await User.create({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password(),
      displayName: faker.name.findName(firstName, lastName)
    });
  }

  for (let i = 0; i < 100; i++) {
    const departament = faker.commerce.department();
    Tag.create({
      slug: departament.toLowerCase().replace(/\s+/g, '_'),
      name: departament
    });
  }
}

export default { sync };
export { User, Tag, Offer };
