import * as allure from 'allure-js-commons';

Cypress.Commands.add('search', (request = 'Начало') => {
	allure.epic('Поиск');
	allure.feature('Поиск фильмов');
	allure.story('Успешный поиск фильма');
	allure.severity(allure.Severity.BLOCKER);

	allure.step('Переход на главную страницу', () => {
		cy.visit('/');
	});

	allure.step('Ввод поискового запроса', () => {
		cy.get('input[name="search"]').type(request);
	});

	allure.step('Проверка отображения запроса в выпадающем списке', () => {
		cy.get('h3[data-test-id="search-film-title"]').should('have.text', request);
		allure.attachment('Ожидаемый фильм', request, allure.ContentType.TEXT);
	});

	allure.step('Выполнение поиска', () => {
		allure.description('Клик по кнопке поиска');
		cy.get('button[data-test-id="loupe"]').click();
	});

	allure.step('Проверка результатов на странице поиска', () => {
		cy.get('h1[data-test-id="search-film-title"]').should('have.text', request);
		allure.attachment('Ожидаемый фильм', request, allure.ContentType.TEXT);
	});
});
