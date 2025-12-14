import * as allure from 'allure-js-commons';

Cypress.Commands.add('login', (login = 'userlogin', password = '123456') => {
	allure.epic('Авторизация');
	allure.feature('Вход в приложение');
	allure.story('Успешный вход в аккаунт');
	allure.severity(allure.Severity.BLOCKER);

	allure.step('Переход на страницу входа', () => {
		cy.visit('/login');
	});

	allure.step('Заполнение логина пользователя', () => {
		cy.get('input[name="login"]').type(login);
	});

	allure.step('Заполнение пароля пользователя', () => {
		cy.get('input[name="password"]').type(password);
	});

	allure.step('Вход в аккаунт', () => {
		allure.description('Клик по кнопке входа');
		cy.get('button[type="submit"]').click();
	});

	allure.step('Ожидание ответа от API', () => {
		cy.wait('@loginSuccess');
	});

	allure.step('Проверка успешного перенаправления на главную страницу', () => {
		cy.url().should('include', '/');
	});
});
