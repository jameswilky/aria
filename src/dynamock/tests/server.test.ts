import { dynamockClient } from "../src/client/dynamockClient";
import { Locator, Proxy } from "../src/interface";
import { test, expect, it, describe } from "vitest";
import fetch from "node-fetch";

const host = "http://localhost:4000";
const headerIdKey = "Authorization";

describe("Happy paths", () => {
  it("Should intercept post request with an auth token and return proxy values", async () => {
    // Arrange
    const client = dynamockClient({
      host,
      headerIdKey,
      headerIdValue: (id) => `Bearer ${id}`,
    });

    const locator: Locator = { url: "/friends", method: "GET" };
    const proxy = {
      body: {
        users: ["john", "jane"],
      },
      heaaders: { headerKey: client.id },
      status: 200,
    };

    // Act
    client.intercept(locator, proxy);
    const res = await fetch(`${host}${locator.url}`, {
      method: locator.method,
    });

    // Assert
    expect(res.status).toBe(proxy.status);
    const body = await res.json();
    expect(body).toMatchObject(proxy.body);
  });
});
