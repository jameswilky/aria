import { Request, Response, NextFunction } from "express";
import { HttpMethod, Locator, Proxy } from "../../interface";
import { DynamockRoutes } from "../types";
import { DynamockRoute } from "./DynamockRoute";

const reservedRoutes = ["/_set-response", "/_reset"];

export class DynamockRouter {
  // Represents as key value pair for a client and the routes it has available
  private routes: Record<string, DynamockRoutes> = {};
  private keyHeaders: string[] = [];

  public addRoute(
    locator: Locator,
    proxy: Proxy,
    idHeader: { key: string; value: string }
  ) {
    const idHeaderKey = idHeader.key.toLowerCase();

    if (!this.keyHeaders.includes(idHeaderKey)) {
      this.keyHeaders.push(idHeaderKey);
    }
    const key = `${idHeaderKey}:${idHeader.value}`;

    if (!this.routes[key]) {
      this.routes[key] = {};
    }

    if (!this.routes[key][locator.url]) {
      this.routes[key][locator.url] = {};
    }

    if (!this.routes[key][locator.url][locator.method]) {
      this.routes[key][locator.url][locator.method] = [
        new DynamockRoute(locator, proxy),
      ];
    } else {
      this.routes[key][locator.url][locator.method].push(
        new DynamockRoute(locator, proxy)
      );
    }
  }

  public handle(req: Request, res: Response) {
    try {
      const keyHeader = this.keyHeaders.find((key) => key in req.headers);
      if (!keyHeader) {
        res
          .status(404)
          .send(
            "Could not find a key header that was known to the server. recieved headers: " +
              JSON.stringify(req.headers)
          );
        return;
      }

      const handler =
        this.routes[`${keyHeader}:${req.headers[keyHeader]}`][req.originalUrl][
          req.method as HttpMethod
        ][0];

      handler.handle(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

export async function dynamockRouteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (reservedRoutes.includes(req.originalUrl)) {
    next();
    return;
  }
  req.dynamock.handle(req, res);
}
