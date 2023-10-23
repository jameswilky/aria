import type { IConfig } from "./ariaClient.extensions";

export type ClientArgs = [
  configuration: IConfig,
  baseUrl: string,
  http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
];

export type AriaResult<T> =
  | { success: true; value: T }
  | { success: false; error: unknown };
