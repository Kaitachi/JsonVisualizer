import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			fallback: "index.html"
		}),

		alias: {
			"$components": "./src/lib/components",
			"$static": "./static"
		},

		paths: {
			base: (process.env.NODE_ENV === "production") ? "/JsonVisualizer" : ""
		}
	}
};

export default config;
