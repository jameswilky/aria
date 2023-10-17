import express, { Request, Response } from "express";

export function setupRoutes(app: express.Express) {
  app.post("/_set-response", async (req: Request, res: Response) => {
    const { locator, proxy, clientId } = req.body;
    req.dynamock.addRoute(locator, proxy, clientId);
    console.log("_set-response");
  });

  app.post("/_reset", async (req: Request, res: Response) => {
    console.log("reset called", req.body);
  });
}
