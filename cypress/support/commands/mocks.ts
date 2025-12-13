import { AuthMocks, CommonMocks } from 'fixtures/api';
import { MockUtils } from '../utils/mock-utils';

Cypress.Commands.add(
	'setupAuthMocks',
	(authState: 'authorized' | 'unauthorized') => {
		// Аутентификация
		if (authState === 'unauthorized') {
			MockUtils.intercept(AuthMocks.check.unauthorized);
		} else {
			MockUtils.intercept(AuthMocks.check.authorized);
		}

		// Общие моки
		MockUtils.intercept(CommonMocks.films.empty);
		MockUtils.intercept(CommonMocks.promo.empty);
		MockUtils.intercept(CommonMocks.compilations.empty);
		MockUtils.intercept(CommonMocks.recommendations.empty);
		MockUtils.intercept(CommonMocks.calendar.empty);
		MockUtils.intercept(CommonMocks.genres.empty);

		// Логин и регистрация всегда доступны
		MockUtils.intercept(AuthMocks.login.success);
		MockUtils.intercept(AuthMocks.register.success);
	},
);
