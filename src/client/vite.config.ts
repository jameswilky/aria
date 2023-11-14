import { sveltekit } from '@sveltejs/kit/vite';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
	let plugins = [sveltekit()];
	if (mode === 'development') {
		//@ts-ignore
		plugins = [nodeLoaderPlugin(), ...plugins];
	}

	return {
		// ... your code ...
		plugins,
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}', 'tests/vitest/*.{test,spec}.{js,ts}'],
			exclude: [
				'tests/playwright/**/*.{test,spec}.{js,ts}',
				'src/tests/playwright/**/*.{test,spec}.{js,ts}'
			]
		}
	};
});
