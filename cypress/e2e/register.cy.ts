describe('Регистрация', () => {
	const TEST_USER = {
		login: 'userlogin',
		password: '123456',
	};

	beforeEach(() => {
		cy.setupAuthMocks('unauthorized');
		cy.viewport(1920, 1080);
	});

	it('Успешная регистрация и проверка данных пользователя', () => {
		cy.register(TEST_USER.login, TEST_USER.password);
		cy.verifyProfile(TEST_USER);
	});
});
