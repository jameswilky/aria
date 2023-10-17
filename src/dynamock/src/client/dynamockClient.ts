import { v4 as uuidv4 } from "uuid";
import { Locator, Proxy } from "../interface";
import fetch from "node-fetch";

/**
 * This interface is used to configure the dynamock client
 */
interface DynamockClientConfig {
  /**
   * Used to point to the currently running dynamock server
   */
  host: string;
  headerIdKey: string;
  headerIdValue?: (value: string) => string;
}

export function dynamockClient(config: DynamockClientConfig) {
  const id = uuidv4();

  const intercept = async (locator: Locator, proxy: Proxy) => {
    const res = await fetch(`${config.host}/_set-response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        headerKey: id,
      },
      body: JSON.stringify({
        locator,
        proxy,
      }),
    });

    if (res.status !== 200) {
      throw new Error(
        `Error while setting response for locator ${JSON.stringify(
          locator
        )} and proxy ${JSON.stringify(proxy)}`
      );
    }
  };

  return {
    id,
    intercept,
  };
}
