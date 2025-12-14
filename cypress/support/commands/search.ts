import * as allure from 'allure-js-commons';

Cypress.Commands.add('search', (request = 'Начало') => {
	allure.epic('Authentication');
	allure.feature('User Login');
	allure.story('Successful Login');
	allure.severity(allure.Severity.BLOCKER);

	allure.step('Navigate to login page', () => {
		cy.visit('/register');
	});

	allure.step('Fill login field', () => {
		cy.get('input[name="login"]').type(request);
	});

	allure.step('Submit login form', () => {
		allure.description('Click login button');
		cy.get('button[type="submit"]').click();
	});

	allure.step('Wait for login API call', () => {
		cy.wait('@registerSuccess');
	});

	allure.step('Verify successful redirection to home page', () => {
		allure.description('Verify successful redirection');
		cy.url().should('include', '/');
	});
});
