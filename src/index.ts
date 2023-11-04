import express, { Express } from 'express';
import { initRoutes } from './routes';
import { config } from './config/config';

const app: Express = express();
const port = config.port;

app.use(express.json());

initRoutes(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});