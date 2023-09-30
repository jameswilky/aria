import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";


export const load : LayoutServerLoad= (event) => {
    const profile = event.locals.profile
    console.log(profile)
    if(!profile) throw redirect(302, "/auth/login")

    return {
        profile : profile.toJSON()
    };
  };