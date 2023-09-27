// TODO https://www.okupter.com/blog/handling-auth-with-jwt-in-sveltekit
import { AriaUserClient, IConfig } from "$lib/server/generated/aria";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("AuthorizationToken")

    if(token){
      const client = new AriaUserClient( new IConfig(), "");
      //event.locals
    }
    return await resolve(event);
  };