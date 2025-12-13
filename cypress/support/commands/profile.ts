import * as allure from 'allure-js-commons';

Cypress.Commands.add('verifyProfile', (user) => {
	allure.epic('User Profile');
	allure.feature('Profile Information');
	allure.story('Verify Profile Data');
	allure.severity(allure.Severity.CRITICAL);

	allure.step('Navigate to profile section', () => {
		cy.get('[data-test-id="user-avatar-container"]').trigger('mouseover');
	});

	allure.step('Verify login field matches user data', () => {
		cy.get('h2[data-test-id="user-profile-login"]').should(
			'have.value',
			user.login,
		);

		allure.attachment('Expected Login', user.login, allure.ContentType.TEXT);
	});
});
