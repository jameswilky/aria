import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (event) => {
	const profile = event.locals.profile;
	return {
		profile: profile ? profile.toJSON() : null
	};
};
