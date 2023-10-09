import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema";
import { createUser } from "$lib/server/aria/aria";

export const load: PageServerLoad = () => {
  return {
    form: superValidate(formSchema)
  };
};

export const actions: Actions = {
  default: async (event) => {
    console.log("test")
    const form = await superValidate(event, formSchema);
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    const result = await createUser(form.data);
    if (!result.success) return fail(500, { form });
    const user = result.value;

    event.cookies.set('AuthorizationToken', `Bearer ${user.token}`, {
      httpOnly: true,
      path: '/',
      //secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });

    throw redirect(302, "/dashboard")
  }
};