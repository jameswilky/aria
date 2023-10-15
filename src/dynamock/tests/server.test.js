// tests/server.test.ts
import { test, assert } from "vitest";
import { dynamockClient } from "../src/client/dynamockClient";
import fetch from "node-fetch";

const host = "http://localhost:4000";
test("should return the specified response", async () => {
  const client = dynamockClient({ host });

  client.intercept(
    {
      url: "/test",
      method: "GET"
    },
    {
      body: { name: "john" },
      status: 200,
    }
  );

  const res = await fetch(`${host}/test`, {method:"GET"});
  const json = await res.json();

  assert.equal(json["name"], "john");
  assert.equal(json["status"], 200);
});
