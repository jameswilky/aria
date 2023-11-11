import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'bash ./start_test_server.sh',
		port: 4173

		// For using when debugging the server and getting faster startup times
		//reuseExistingServer: true
		// port:5173
	},
	testDir: 'tests/playwright',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'chromium',
			use: {
				// Specify browser to use. In this case, chromium
				channel: 'chromium',
				// Other launch options can be set here
				launchOptions: {
					args: ['--window-size=1200,800', '--window-position=200,200']
				}
			}
		}
	],
	reporter: 'github'
};

export default config;
