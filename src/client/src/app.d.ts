// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { Profile } from '$lib/server/backend-interface';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			profile: Profile;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
