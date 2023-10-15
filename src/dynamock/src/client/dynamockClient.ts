import { v4 as uuidv4 } from "uuid";
/**
 * This interface is used to configure the dynamock client
 */
interface DynamockClientConfig {
  /**
   * Used to point to the currently running dynamock server
   */
  host: string;
}

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "CONNECT"
  | "TRACE";

export interface Locator {
  url: string;
  method: HttpMethod;
  filter?: RequestFilter;
}

export interface Proxy {
  headers?: Record<string, string>;
  body?: object;
  status: number;
}

export interface RequestFilter {
  headers?: Record<string, string>;
  body?: string;
}

export function dynamockClient(config: DynamockClientConfig) {
  const clientId = uuidv4();

  const intercept = async (locator: Locator, proxy: Proxy) => {};

  return {
    intercept,
  };
}
