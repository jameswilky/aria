import { AriaUserClient, IConfig, RegisterUser, type IRegisterUser, AuthenticatedUser } from "./aria.generated"

type ClientArgs = [
    configuration: IConfig, 
    baseUrl: string, 
    http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }];

type AriaResult<T> = 
    | { success: true; value: T }
    | { success: false; error: unknown };

const BASE_URI : string = "http://127.0.0.1:5156";
const defaultClientArgs : ClientArgs = [new IConfig(), BASE_URI, {fetch}];

export const createUser = async (user : IRegisterUser) : Promise<AriaResult<AuthenticatedUser>> =>  {
    const client = new AriaUserClient(...defaultClientArgs);
    try {
        const createdUser = await client.create(new RegisterUser(user));
        return { success: true, value: createdUser };
    } catch (error) { 
      return { success: false, error };
    }
} 