import { allureCypress } from 'allure-cypress/reporter';

import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		defaultBrowser: 'chrome',
		setupNodeEvents(on, config) {
			allureCypress(on, config, {
				resultsDir: 'allure-results',
			});

			return config;
		},
		reporter: 'junit',
		reporterOptions: {
			mochaFile: 'cypress/results/test-results-[hash].xml',
			toConsole: false,
		},
	},
});
