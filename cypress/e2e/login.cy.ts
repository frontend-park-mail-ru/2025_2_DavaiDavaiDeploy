describe('Авторизация и профиль пользователя', () => {
	const TEST_USER = {
		login: 'userlogin',
		password: '123456',
	};

	beforeEach(() => {
		cy.setupAuthMocks('unauthorized');
		cy.viewport(1920, 1080);
	});

	it('Успешная авторизация и проверка данных профиля', () => {
		cy.login(TEST_USER.login, TEST_USER.password);
	});
});
