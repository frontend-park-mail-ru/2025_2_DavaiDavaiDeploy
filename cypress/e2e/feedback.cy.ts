describe('Регистрация и профиль пользователя', () => {
	const FEEDBACK = {
		title: 'Хороший фильм',
		text: 'Фильм всем очень советую, мне понравился',
		rating: '10',
	};

	beforeEach(() => {
		cy.setupAuthMocks('authorized');
		cy.viewport(1920, 1080);
	});

	it('Успешная авторизация и проверка данных профиля', () => {
		cy.feedback(FEEDBACK.title, FEEDBACK.text, FEEDBACK.rating);
	});
});
