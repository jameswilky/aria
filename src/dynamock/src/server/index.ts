import express, { Request, Response, NextFunction } from 'express';
import {processArgs} from "./cli"
import { setupRoutes } from './routes';

const options = processArgs(process.argv)
const port = options.port;
const app = express();

setupRoutes(app);

app.listen(port, () => {
  console.log(`dynamock server started. Listening on http://localhost:${port}`);
});
