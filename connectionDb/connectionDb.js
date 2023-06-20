import { Sequelize } from 'sequelize';
import 'dotenv/config.js';

import {
  database,
  username,
  password,
  host,
  dialect,
  port,
} from "../config/config.js";

const connectionDb = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
  });

  try {
    await connectionDb.authenticate();
        console.log('Connection has been established successfully.');
  } catch (error) {
        console.error('Unable to connect to the database:', error);
  }

export default  connectionDb;