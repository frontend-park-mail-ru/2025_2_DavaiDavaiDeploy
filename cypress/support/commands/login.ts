import * as allure from 'allure-js-commons';

// Команда для логина
Cypress.Commands.add('login', (login = 'user_login', password = '1234') => {
	allure.epic('Authentication');
	allure.feature('User Login');
	allure.story('Successful Login');
	allure.severity(allure.Severity.BLOCKER);

	allure.step('Navigate to login page', () => {
		cy.visit('/login');
	});

	allure.step('Set localStorage flag for onboarding', () => {
		cy.window().then((win) => {
			win.localStorage.setItem('onb_shown', 'true');
		});
	});

	allure.step('Click on login button to open form', () => {
		allure.description('Enter valid credentials');
		cy.get('[data-test-id="login"]').click();
	});

	allure.step('Fill login field', () => {
		cy.get('input[name="login"]').type(login);
	});

	allure.step('Fill password field', () => {
		cy.get('input[name="password"]').type(password);
	});

	allure.step('Submit login form', () => {
		allure.description('Click login button');
		cy.get('button[type="submit"]').click();
	});

	allure.step('Wait for login API call', () => {
		cy.wait('@loginSuccess');
	});

	allure.step('Verify successful redirection to home page', () => {
		allure.description('Verify successful redirection');
		cy.url().should('include', '/');
	});
});
