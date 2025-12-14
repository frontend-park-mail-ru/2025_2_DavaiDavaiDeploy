import * as allure from 'allure-js-commons';

Cypress.Commands.add('verifyProfile', (user) => {
	allure.epic('Профиль пользователя');
	allure.feature('Информация профиля');
	allure.story('Проверка данных пользователя');
	allure.severity(allure.Severity.CRITICAL);

	allure.step('Открытие меню с профилем', () => {
		cy.get('[data-test-id="user-avatar-container"]').realHover();
	});

	allure.step('Проверка соответствия логина пользователя', () => {
		cy.get('h2[data-test-id="user-profile-login"]').should(
			'have.text',
			user.login,
		);

		allure.attachment('Ожидаемый логин', user.login, allure.ContentType.TEXT);
	});
});
