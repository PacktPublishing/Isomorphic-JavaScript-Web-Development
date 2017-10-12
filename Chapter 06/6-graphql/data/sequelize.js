/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

import Sequelize from 'sequelize';

const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
const sequelize = new Sequelize(databaseUrl, { define: { freezeTableName: true } });

export default sequelize;
