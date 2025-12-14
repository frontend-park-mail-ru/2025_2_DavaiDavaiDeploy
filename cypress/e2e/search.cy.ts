describe('Поиск', () => {
	beforeEach(() => {
		cy.setupAuthMocks('unauthorized');
		cy.viewport(1920, 1080);
	});

	it('Поиск фильма, получение результатов в саджестах и на странице результатов поиска', () => {
		cy.search('Начало');
	});
});
