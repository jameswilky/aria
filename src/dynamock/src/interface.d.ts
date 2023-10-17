export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
// | "PATCH"
// | "HEAD"
// | "OPTIONS"
// | "CONNECT"
// | "TRACE";

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
