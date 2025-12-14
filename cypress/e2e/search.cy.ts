describe('Регистрация и профиль пользователя', () => {
	beforeEach(() => {
		cy.setupAuthMocks('unauthorized');
		cy.viewport(1920, 1080);
	});

	it('Успешная авторизация и проверка данных профиля', () => {
		cy.search('Начало');
	});
});
