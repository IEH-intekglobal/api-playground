'use strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Sequelize, DataTypes } from 'sequelize';

const basename = import.meta.dirname;

export default async function setupDatabase() {
  const app = this;

  const config = {
    database: 'apiboxdb',
    username: 'username',
    password: 'password',
    host: 'localhost',
    dialect: 'sqlite',
    logging: msg => app.logger.debug(msg),
    storage: 'dataset.sqlite'
  };

  if (process.env.NODE_ENV === 'test') {
    config.storage = 'test/testdb.sqlite';
  }

  const sequelize = new Sequelize(config.database, config.username, config.password, config);

  const { promise: dbLoaded, resolve, reject } = Promise.withResolvers()

  app.dbLoaded = dbLoaded;
  try {
    const dir = await fs.readdir(path.join(basename, 'models'))

    for (const file of dir) {
      const { default: modelCreator } = await import(`./models/${file}`)
      modelCreator(sequelize, DataTypes);
    }

    const db = sequelize.models;
    Object.keys(db).forEach(function (modelName) {
      if ('associate' in db[modelName]) {
        db[modelName].associate(db);
      }
    });
    app.set('sequelizeClient', sequelize);

    resolve();
  } catch (e) {
    reject(e);
    throw e;
  }
}
