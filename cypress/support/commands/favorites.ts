import * as allure from 'allure-js-commons';

Cypress.Commands.add('favorites', (filmTitle: string) => {
	allure.epic('Favorites');
	allure.feature('User favorites');
	allure.story('Successful adding to favorites');
	allure.severity(allure.Severity.BLOCKER);

	allure.step('Wait', () => {
		cy.wait('@checkSuccess');
	});

	allure.step('Navigate to film page', () => {
		cy.visit('/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d');
	});

	allure.step('Wait for ', () => {
		cy.wait('@filmWithData');
		cy.wait('@similarWithData');
		cy.wait('@feedbacksWithData');
	});

	allure.step('Add to favorites', () => {
		allure.description('Click fav button');
		cy.get('button[data-test-id="fav-btn"]').click();
	});

	allure.step('Navigate to user page', () => {
		cy.visit('/profile');
	});

	allure.step('Wait for login API call', () => {
		cy.wait('@favoritesWithData');
	});

	allure.step('Verify login field matches user data', () => {
		cy.get('h2[data-test-id="film-title"]').should('have.text', filmTitle);

		allure.attachment('Expected Film', filmTitle, allure.ContentType.TEXT);
	});
});
