import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { createUser } from '$lib/server/backend-interface';

export const load: PageServerLoad = () => {
	return {
		form: superValidate(formSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, formSchema);
		if (!form.valid) {
			return message(form, 'Account details were invalid, please try again');
		}
		const result = await createUser(form.data);
		if (!result.success) {
			console.log(result.error);
			return message(form, 'Oops, something went wrong.', { status: 500 });
		}
		const user = result.value;

		event.cookies.set('AuthorizationToken', `Bearer ${user.token}`, {
			httpOnly: true,
			path: '/',
			//secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		throw redirect(302, '/dashboard');
	}
};
