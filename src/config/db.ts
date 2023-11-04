import { Sequelize } from 'sequelize';
import { config } from './config';

const { db } = config;

const sequelize = new Sequelize({
  database: db.database,
  username: db.username,
  password: db.password,
  host: db.host,
  dialect: 'mysql',
});

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw new Error("Unable to connect to the database");
  }
}

authenticate();

export { sequelize };
