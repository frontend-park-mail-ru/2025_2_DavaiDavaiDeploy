import * as allure from 'allure-js-commons';

Cypress.Commands.add('register', (login = 'userlogin', password = '123456') => {
	allure.epic('Регистрация');
	allure.feature('Создание аккаунта');
	allure.story('Успешная регистрация пользователя');
	allure.severity(allure.Severity.BLOCKER);

	allure.step('Переход на страницу регистрации', () => {
		cy.visit('/register');
	});

	allure.step('Заполнение логина пользователя', () => {
		cy.get('input[name="login"]').type(login);
	});

	allure.step('Заполнение пароля пользователя', () => {
		cy.get('input[name="password"]').type(password);
	});

	allure.step('Заполнение подтверждения пароля пользователя', () => {
		cy.get('input[name="repeat-password"]').type(password);
	});

	allure.step('Отправка формы регистрации', () => {
		allure.description('Клик по кнопке регистрации');
		cy.get('button[type="submit"]').click();
	});

	allure.step('Ожидание ответа от API', () => {
		cy.wait('@registerSuccess');
	});

	allure.step('Проверка успешного перенаправления на главную страницу', () => {
		cy.url().should('include', '/');
	});
});
