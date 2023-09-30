// TODO https://www.okupter.com/blog/handling-auth-with-jwt-in-sveltekit
import { getProfile } from "$lib/server/aria/aria";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("AuthorizationToken")
    console.log(`Token from cookies : ${token}`)
    if(token){
      const result = await getProfile(token);
      console.log(result)
      if (result.success)event.locals.profile = result.value;
      else console.log("User is not authorized, or does not exist")
    }
    return await resolve(event);
  };