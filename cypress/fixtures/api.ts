export const AuthMocks = {
	check: {
		unauthorized: {
			method: 'POST' as const,
			url: '/api/auth/check/',
			response: {
				statusCode: 401,
				body: { message: 'Unauthorized', statusCode: 401 },
			},
			alias: 'checkFailed',
		},
		authorized: {
			method: 'POST' as const,
			url: '/api/auth/check/',
			response: {
				statusCode: 200,
				body: {
					login: 'user_login',
					avatar: 'avatars/default.png',
					has_2fa: false,
				},
			},
			alias: 'checkSuccess',
		},
	},

	login: {
		success: {
			method: 'POST' as const,
			url: '/api/auth/login/',
			response: {
				statusCode: 200,
				body: {
					login: 'user_login',
					avatar: 'avatars/default.png',
					has_2fa: false,
				},
			},
			alias: 'loginSuccess',
		},
		error: {
			method: 'POST' as const,
			url: '/api/auth/login/',
			response: {
				statusCode: 400,
				body: { message: 'Invalid credentials' },
			},
			alias: 'loginError',
		},
	},

	register: {
		success: {
			method: 'POST' as const,
			url: '/api/auth/register/',
			response: {
				statusCode: 200,
				body: {
					login: 'user_login',
					avatar: 'avatars/default.png',
					has_2fa: false,
				},
			},
			alias: 'registerSuccess',
		},
	},
} as const;

export const CommonMocks = {
	films: {
		empty: {
			method: 'GET' as const,
			url: '/api/films/',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'filmsEmpty',
		},
		withData: {
			method: 'GET' as const,
			url: '/api/films/',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'filmsWithData',
		},
	},

	promo: {
		empty: {
			method: 'GET' as const,
			url: '/api/promo',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'promoEmpty',
		},
	},

	compilations: {
		empty: {
			method: 'GET' as const,
			url: '/api/compilations/',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'compilationsEmpty',
		},
	},

	recommendations: {
		empty: {
			method: 'GET' as const,
			url: '/api/users/recommendations',
			response: { statusCode: 200, body: [] },
			alias: 'recommendationsEmpty',
		},
	},

	calendar: {
		empty: {
			method: 'GET' as const,
			url: '/api/films/calendar?count=6&offset=0',
			response: { statusCode: 200, body: [] },
			alias: 'calendarEmpty',
		},
	},

	genres: {
		empty: {
			method: 'GET' as const,
			url: '/genres/?count=24&offset=0',
			response: { statusCode: 200, body: [] },
			alias: 'genresEmpty',
		},
	},
} as const;
