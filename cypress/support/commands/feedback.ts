/* eslint-disable sonarjs/no-duplicate-string */
import * as allure from 'allure-js-commons';

Cypress.Commands.add(
	'feedback',
	(title: string, text: string, rating: string) => {
		allure.epic('Оценки и отзывы');
		allure.feature('Работа с отзывами');
		allure.story('Успешное добавление оценки и отзыва о фильме');
		allure.severity(allure.Severity.BLOCKER);

		allure.step('Переход на страницу фильма', () => {
			cy.visit('/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d');
		});

		allure.step('Ожидание загрузки данных фильма', () => {
			cy.wait('@filmWithData');
			cy.wait('@similarWithData');
			cy.wait('@feedbacksWithData');
			cy.wait('@checkSuccess');
		});

		allure.step('Выставление оценки фильму', () => {
			allure.description('Клик по кнопке оценки рейтинга');
			cy.get('[data-test-id="rating-input"]')
				.find('[data-test-id="rating-10-btn"]')
				.click();
		});

		allure.step('Заполнение заголовка отзыва', () => {
			cy.get('input[name="title"]').type(title);
		});

		allure.step('Заполнение текста отзыва', () => {
			cy.get('[data-test-id="feedback-text-input"]')
				.find('textarea')
				.type(text);
		});

		allure.step('Отправление отзыва', () => {
			allure.description('Click fav button');
			cy.get('button[data-test-id="feedback-btn"]').click();
		});

		allure.step('Проверка добавленного отзыва', () => {
			cy.get('[data-test-id="user-feedback"]')
				.find('[data-test-id="feedback-title"]')
				.should('have.text', title);

			cy.get('[data-test-id="user-feedback"]')
				.find('[data-test-id="feedback-text"]')
				.should('have.text', text);

			cy.get('[data-test-id="user-feedback"]')
				.find('[data-test-id="film-feedback-rating"]')
				.should('contain.text', rating);

			const feedbackData = {
				Заголовок: title,
				Текст: text,
				Оценка: rating,
			};

			allure.attachment(
				'Ожидаемые данные отзыва',
				JSON.stringify(feedbackData, null, 2),
				'application/json',
			);
		});
	},
);
