import { AuthMocks, CommonMocks } from '../../fixtures/api';
import { MockUtils } from '../utils/mock-utils';

Cypress.Commands.add(
	'setupAuthMocks',
	(authState: 'authorized' | 'unauthorized') => {
		if (authState === 'unauthorized') {
			MockUtils.intercept(AuthMocks.check.unauthorized);
		} else {
			MockUtils.intercept(AuthMocks.check.authorized);
		}

		MockUtils.intercept(AuthMocks.login.success);
		MockUtils.intercept(AuthMocks.register.success);

		MockUtils.intercept(CommonMocks.films.withData);
		MockUtils.intercept(CommonMocks.promo.withData);
		MockUtils.intercept(CommonMocks.compilations.withData);
		MockUtils.intercept(CommonMocks.recommendations.withData);
		MockUtils.intercept(CommonMocks.calendar.withData);
		MockUtils.intercept(CommonMocks.genres.withData);
		MockUtils.intercept(CommonMocks.film.withData);
		MockUtils.intercept(CommonMocks.feedback.withData);
		MockUtils.intercept(CommonMocks.rating.withData);
		MockUtils.intercept(CommonMocks.similar.withData);
		MockUtils.intercept(CommonMocks.search.withData);
		MockUtils.intercept(CommonMocks.feedbacks.withData);
		MockUtils.intercept(CommonMocks.favorites.withData);
		MockUtils.intercept(CommonMocks.save.withData);
	},
);
