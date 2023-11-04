import dotenv from 'dotenv';
dotenv.config();
const { env } = process;

export const config = {
env: env,
port: env.PORT || 8000,
db: {
        username: env.MYSQL_USERNAME || 'root',
        password: env.MYSQL_PASSWORD || 'root',
        host: env.MYSQL_HOST || 'localhost',
        port: env.MYSQL_PORT || '27017',
        database: env.MYSQL_DATABASE || 'coolblue',
        dialect: 'mysql',

},
};
