import * as allure from 'allure-js-commons';

Cypress.Commands.add('favorites', (filmTitle: string) => {
	allure.epic('Избранное');
	allure.feature('Избранные фильмы пользователя');
	allure.story('Успешное добавление в избранное');
	allure.severity(allure.Severity.BLOCKER);

	allure.step('Переход на страницу фильма', () => {
		cy.visit('/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d');
	});

	allure.step('Ожидание загрузки данных фильма', () => {
		cy.wait('@filmWithData');
		cy.wait('@similarWithData');
		cy.wait('@feedbacksWithData');
		cy.wait('@checkSuccess');
	});

	allure.step('Добавление в избранное', () => {
		allure.description('Клик по кнопке добавления в избранное');
		cy.get('button[data-test-id="fav-btn"]').click();
	});

	allure.step('Переход на страницу пользователя', () => {
		cy.visit('/profile');
	});

	allure.step('Ожидание загрузки данных избранного', () => {
		cy.wait('@favoritesWithData');
	});

	allure.step('Проверка наличия фильма в избранном', () => {
		cy.get('h1[data-test-id="film-title"]').should('have.text', filmTitle);
		allure.attachment('Ожидаемый фильм', filmTitle, allure.ContentType.TEXT);
	});
});
