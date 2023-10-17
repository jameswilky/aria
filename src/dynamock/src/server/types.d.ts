import { DynamockRouter } from "./dynamicRouter/DynamockRouter";

declare global {
  namespace Express {
    interface Request {
      dynamock: DynamockRouter;
    }
  }
}

type DynamockRoutes = {
  [path: string]: Record<HttpMethod, [DynamockRoute]>;
};
