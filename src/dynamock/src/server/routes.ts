import express, { Request, Response } from "express";

export function setupRoutes(app: express.Express) {
  app.post("/_set-response", async (req: Request, res: Response) => {
    const { locator, proxy, idHeader } = req.body;
    req.dynamock.addRoute(locator, proxy, idHeader);
    console.log("_set-response");
  });

  app.post("/_reset", async (req: Request, res: Response) => {
    console.log("reset called", req.body);
  });
}
