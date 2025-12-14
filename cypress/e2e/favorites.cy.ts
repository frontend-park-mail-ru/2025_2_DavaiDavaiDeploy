describe('Избранное', () => {
	beforeEach(() => {
		cy.setupAuthMocks('authorized');
		cy.viewport(1920, 1080);
	});

	it('Добавление фильма в избранное и раздел избранное в профиле', () => {
		cy.favorites('Начало');
	});
});
