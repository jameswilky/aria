import { Request, Response, NextFunction } from "express";
import { DynamockRouter } from "./dynamicRouter/DynamockRouter";

const dynamock = new DynamockRouter();

export async function dynamicRouteMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.dynamock = dynamock;
  next();
}
