import cors from 'cors';
import express, { Express } from 'express';
import { config } from './config/config';
import { initRoutes } from './routes';

const app: Express = express();
const port = config.port;

app.use(cors());
app.use(express.json());

initRoutes(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});