import { Request, Response } from "express";
import { Locator, Proxy } from "../../interface";

export class DynamockRoute {
  private locator: Locator;
  private proxy: Proxy;

  constructor(locator: Locator, proxy: Proxy) {
    this.locator = locator;
    this.proxy = proxy;
  }

  public handle(req: Request, res: Response) {
    res.status(this.proxy.status).send(this.proxy.body);
  }
}
