import { Request, Response, NextFunction } from "express";
import { HttpMethod, Locator, Proxy } from "../../interface";
import { DynamockRoutes } from "../types";

const reservedRoutes = ["_set-response", "_reset"];

export class DynamockRouter {
  // Represents as key value pair for a client and the routes it has available
  private routes: Record<string, DynamockRoutes> = {};

  public addRoute(locator: Locator, proxy: Proxy, clientId: string) {}

  public handle(req: Request, res: Response) {}
}

export async function dynamockRouteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const x = req.headers;
  const y = req.connection.remoteAddress;
  if (reservedRoutes.includes(req.originalUrl)) next();
  req.dynamock.handle(req, res);
}
