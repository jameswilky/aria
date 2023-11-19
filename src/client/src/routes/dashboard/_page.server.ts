// import type { PageServerLoad, Actions } from './$types';
// import { message, superValidate } from 'sveltekit-superforms/server';
// import { githubFormSchema } from './githubFormSchema';
// import { redirect } from '@sveltejs/kit';
// export const load: PageServerLoad = () => {
// 	return {
// 		form: superValidate(githubFormSchema)
// 	};
// };
// export const actions: Actions = {
// 	default: async (event) => {
// 		const form = await superValidate(event, githubFormSchema);
// 		if (!form.valid) {
// 			return message(form, 'Repository details where invalid');
// 		}

// 		throw redirect(302, `/dashboard/conversation/1`);
// 	}
// };
