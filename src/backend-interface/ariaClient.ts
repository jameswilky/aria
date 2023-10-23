import {
  AriaUserClient,
  IConfig,
  AddUser,
  type IAddUser,
  AuthenticatedUser,
  Profile,
  AuthenticateUser,
  type IAuthenticateUser,
  AriaAuthClient,
} from "./ariaClient.generated";

import type { AriaResult, ClientArgs } from "./ariaClient.types";

// const BASE_URI: string = "http://host.docker.internal:5156";
export const createAriaClient = (base_uri: string) => {
  const error = (error: unknown): { success: false; error: unknown } => {
    return { success: false, error };
  };

  const success = <T>(value: T): AriaResult<T> => {
    return { success: true, value };
  };

  const defaultClientArgs: ClientArgs = [new IConfig(), base_uri, { fetch }];

  const protectedClientArgs = (authToken: string): ClientArgs => [
    { ...new IConfig(), authToken },
    base_uri,
    { fetch },
  ];

  const createUser = async (
    user: IAddUser
  ): Promise<AriaResult<AuthenticatedUser>> => {
    try {
      const client = new AriaUserClient(...defaultClientArgs);
      const createdUser = await client.create(new AddUser(user));
      return success(createdUser);
    } catch (e) {
      return error(e);
    }
  };

  const getProfile = async (token: string): Promise<AriaResult<Profile>> => {
    try {
      const client = new AriaUserClient(...protectedClientArgs(token));
      const profile = await client.get();
      return success(profile);
    } catch (e) {
      return error(e);
    }
  };

  const login = async (
    user: IAuthenticateUser
  ): Promise<AriaResult<AuthenticatedUser>> => {
    try {
      const client = new AriaAuthClient(...defaultClientArgs);
      const authenticatedUser = await client.signIn(new AuthenticateUser(user));
      return success(authenticatedUser);
    } catch (e) {
      return error(e);
    }
  };
  return { createUser, getProfile, login };
};
