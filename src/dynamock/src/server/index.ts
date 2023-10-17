import express, { Request, Response, NextFunction } from "express";
import { processArgs } from "./cli";
import { setupRoutes } from "./routes";
import { dynamicRouteMiddleware } from "./middleware";
import { dynamockRouteHandler } from "./dynamicRouter/DynamockRouter";

const options = processArgs(process.argv);
const port = options.port;
const app = express();
app.use(express.json());
app.use(dynamicRouteMiddleware);
app.use(dynamockRouteHandler);
setupRoutes(app);

app.listen(port, () => {
  console.log(`dynamock server started. Listening on http://localhost:${port}`);
});
