import { AriaUserClient, IConfig, RegisterUser, type IRegisterUser, AuthenticatedUser, Profile } from "./aria.generated"

type ClientArgs = [
    configuration: IConfig, 
    baseUrl: string, 
    http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }];

type AriaResult<T> = 
    | { success: true; value: T }
    | { success: false; error: unknown };

const BASE_URI : string = "http://127.0.0.1:5156";

const error = (error : unknown) : { success: false, error: unknown } => { return { success: false, error } }

const success = <T>(value: T): AriaResult<T> => { return { success: true, value } };

const defaultClientArgs : ClientArgs = [new IConfig(), BASE_URI, {fetch}];

const protectedClientArgs  = (authToken : string) : ClientArgs => [{... new IConfig(), authToken}, BASE_URI, {fetch}];

export const createUser = async (user : IRegisterUser) : Promise<AriaResult<AuthenticatedUser>> =>  {
    try {
        const client = new AriaUserClient(...defaultClientArgs);
        const createdUser = await client.create(new RegisterUser(user));
        return success(createdUser)
    } catch (e) { 
      return error(e);
    }
} 

export const getProfile = async (token: string) : Promise<AriaResult<Profile>> =>  {
    try {
        const client = new AriaUserClient(...protectedClientArgs(token));
        const profile = await client.get();
        return success(profile)
    } catch (e) { 
        return error(e);
      }
} 

// export const getUser = async (token: string) : Promise<AriaResult<AuthenticatedUser>> =>  {
//     const client = new AriaUserClient(...protectedClientArgs(token));
//     try {
//         const user = await client.get();
//         return { success: true, value: user};
//     } catch (error) { 
//       return { success: false, error };
//     }
// } 