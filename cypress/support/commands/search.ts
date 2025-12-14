import * as allure from 'allure-js-commons';

Cypress.Commands.add('search', (request = 'Начало') => {
	allure.epic('Authentication');
	allure.feature('User Login');
	allure.story('Successful Login');
	allure.severity(allure.Severity.BLOCKER);

	allure.step('Navigate to login page', () => {
		cy.visit('/');
	});

	allure.step('Fill login field', () => {
		cy.get('input[name="search"]').type(request);
	});

	allure.step('Verify login field matches user data', () => {
		cy.get('h3[data-test-id="search-film-title"]').should('have.text', request);
		allure.attachment('Expected Login', request, allure.ContentType.TEXT);
	});

	allure.step('Submit login form', () => {
		allure.description('Click login button');
		cy.get('button[data-test-id="loupe"]').click();
	});

	allure.step('Verify login field matches user data', () => {
		cy.get('h1[data-test-id="search-film-title"]').should('have.text', request);
		allure.attachment('Expected Login', request, allure.ContentType.TEXT);
	});
});
