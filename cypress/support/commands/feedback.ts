/* eslint-disable sonarjs/no-duplicate-string */
import * as allure from 'allure-js-commons';

Cypress.Commands.add(
	'feedback',
	(title: string, text: string, rating: string) => {
		allure.epic('Favorites');
		allure.feature('User favorites');
		allure.story('Successful adding to favorites');
		allure.severity(allure.Severity.BLOCKER);

		allure.step('Navigate to film page', () => {
			cy.visit('/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d');
		});

		allure.step('Wait for login API call', () => {
			cy.wait('@filmWithData');
			cy.wait('@similarWithData');
			cy.wait('@feedbacksWithData');
			cy.wait('@checkSuccess');
		});

		allure.step('Add to favorites', () => {
			allure.description('Click fav button');
			cy.get('[data-test-id="rating-input"]')
				.find('[data-test-id="rating-10-btn"]')
				.click();
		});

		allure.step('Fill login field', () => {
			cy.get('input[name="title"]').type(title);
		});

		allure.step('Fill password field', () => {
			cy.get('[data-test-id="feedback-text-input"]')
				.find('textarea')
				.type(text);
		});

		allure.step('Add to favorites', () => {
			allure.description('Click fav button');
			cy.get('button[data-test-id="feedback-btn"]').click();
		});

		allure.step('Verify login field matches user data', () => {
			cy.get('[data-test-id="user-feedback"]')
				.find('[data-test-id="feedback-title"]')
				.should('have.text', title);

			allure.attachment('Expected Film', title, allure.ContentType.TEXT);
		});

		allure.step('Verify login field matches user data', () => {
			cy.get('[data-test-id="user-feedback"]')
				.find('[data-test-id="feedback-text"]')
				.should('have.text', text);

			allure.attachment('Expected Film', text, allure.ContentType.TEXT);
		});

		allure.step('Verify login field ', () => {
			cy.get('[data-test-id="user-feedback"]')
				.find('[data-test-id="film-feedback-rating"]')
				.should('contain.text', rating);

			allure.attachment('Expected', rating, allure.ContentType.TEXT);
		});
	},
);
