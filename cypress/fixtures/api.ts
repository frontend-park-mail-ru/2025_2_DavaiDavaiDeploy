/* eslint-disable sonarjs/no-duplicate-string */
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
					login: 'userlogin',
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
			url: '/api/auth/signin',
			response: {
				statusCode: 200,
				body: {
					login: 'userlogin',
					avatar: 'avatars/default.png',
					has_2fa: false,
				},
			},
			alias: 'loginSuccess',
		},
		error: {
			method: 'POST' as const,
			url: '/api/auth/signin',
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
			url: '/api/auth/signup',
			response: {
				statusCode: 200,
				body: {
					login: 'userlogin',
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
			url: '/api/films/promo',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'promoEmpty',
		},
		withData: {
			method: 'GET' as const,
			url: '/api/films/promo',
			response: {
				statusCode: 200,
				body: [
					{
						id: '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
						image: 'posters/pic44.jpg',
						title: 'Гарри Поттер и философский камень',
						rating: 8.5,
						short_description:
							'Мальчик-сирота узнает, что он волшебник, и поступает в школу магии Хогвартс.',
						year: 2001,
						genre: 'Фэнтези',
						duration: 152,
						created_at: '0001-01-01T00:00:00Z',
						updated_at: '0001-01-01T00:00:00Z',
					},
				],
			},
			alias: 'promoWithData',
		},
	},

	compilations: {
		empty: {
			method: 'GET' as const,
			url: '/api/compilations',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'compilationsEmpty',
		},
		withData: {
			method: 'GET' as const,
			url: '/api/compilations',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'compilationsWithData',
		},
	},

	recommendations: {
		empty: {
			method: 'GET' as const,
			url: '/api/users/recommendations',
			response: { statusCode: 200, body: [] },
			alias: 'recommendationsEmpty',
		},
		withData: {
			method: 'GET' as const,
			url: '/api/users/recommendations',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'recommendationsWithData',
		},
	},

	calendar: {
		empty: {
			method: 'GET' as const,
			url: '/api/films/calendar?count=6&offset=0',
			response: { statusCode: 200, body: [] },
			alias: 'calendarEmpty',
		},
		withData: {
			method: 'GET' as const,
			url: '/api/films/calendar?count=6&offset=0',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'calendarWithData',
		},
	},

	genres: {
		empty: {
			method: 'GET' as const,
			url: '/api/genres/?count=24&offset=0',
			response: { statusCode: 200, body: [] },
			alias: 'genresEmpty',
		},
		withData: {
			method: 'GET' as const,
			url: '/api/genres/?count=24&offset=0',
			response: {
				statusCode: 200,
				body: [],
			},
			alias: 'genresWithData',
		},
	},

	film: {
		empty: {
			method: 'GET' as const,
			url: '/api/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
			response: { statusCode: 200, body: [] },
			alias: 'filmEmpty',
		},
		withData: {
			method: 'GET' as const,
			url: '/api/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
			response: {
				statusCode: 200,
				body: [
					{
						id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
						title: 'Начало',
						original_title: 'Inception',
						cover: 'films/pic15.png',
						poster: 'posters/pic15.jpg',
						genre: 'Фантастика',
						short_description:
							'Вор, специализирующийся на краже идей из снов, получает задание внедрить идею в подсознание.',
						description:
							'Дом Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна.',
						age_category: '12+',
						budget: 160000000,
						worldwide_fees: 836000000,
						trailer_url: 'trailers/trailer15.mp4',
						film_url:
							'https://rutube.ru/video/27c335dcbef386ff6adfd3fb392465c0/',
						number_of_ratings: 7,
						year: 2010,
						rating: 7.6,
						country: 'США',
						slogan: 'Your mind is the scene of the crime.',
						duration: 148,
						image1: 'gallery/pic15-1.jpg',
						image2: 'gallery/pic15-2.jpg',
						image3: 'gallery/pic15-3.jpg',
						actors: [
							{
								id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
								russian_name: 'Джозеф Гордон-Левитт',
								original_name: 'Joseph Gordon-Levitt',
								photo: '/actors/pic15.png',
								height: 176,
								birth_date: '1981-02-17T00:00:00Z',
								zodiac_sign: 'Водолей',
								birth_place: 'Лос-Анджелес, Калифорния, США',
								marital_status: 'Женат',
								created_at: '0001-01-01T00:00:00Z',
								updated_at: '0001-01-01T00:00:00Z',
							},
							{
								id: 'a3bb189e-8bf9-3888-9912-6c2d5c7c5b9a',
								russian_name: 'Леонардо ДиКаприо',
								original_name: 'Leonardo DiCaprio',
								photo: 'actors/pic6.png',
								height: 183,
								birth_date: '1974-11-11T00:00:00Z',
								zodiac_sign: 'Скорпион',
								birth_place: 'Лос-Анджелес, Калифорния, США',
								marital_status: 'Не женат',
								created_at: '0001-01-01T00:00:00Z',
								updated_at: '0001-01-01T00:00:00Z',
							},
							{
								id: '6e7f8a9b-0c1d-2e3f-4a5b-6c7d8e9f0a1b',
								russian_name: 'Кристиан Бейл',
								original_name: 'Christian Bale',
								photo: '/actors/pic24.png',
								height: 183,
								birth_date: '1974-01-30T00:00:00Z',
								zodiac_sign: 'Водолей',
								birth_place: 'Хаверфордуэст, Уэльс',
								marital_status: 'Женат',
								created_at: '0001-01-01T00:00:00Z',
								updated_at: '0001-01-01T00:00:00Z',
							},
						],
						is_reviewed: false,
						genre_id: '7f2d3f26-fff8-fdfa-2ffb-1b1f9f5f71f3',
						is_liked: false,
						is_out: true,
					},
				],
			},
			alias: 'filmWithData',
		},
	},

	feedbacks: {
		empty: {
			method: 'GET' as const,
			url: '/api/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/feedbacks?count=100&offset=0',
			response: { statusCode: 200, body: [] },
			alias: 'feedbacksEmpty',
		},
		withData: {
			method: 'GET' as const,
			url: '/api/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/feedbacks?count=100&offset=0',
			response: {
				statusCode: 200,
				body: [
					[
						{
							id: 'f001a2b3-c4d5-6789-abcd-ef0123456057',
							user_id: 'b4c5d6e7-f8a9-0123-4f56-456789abcdef',
							film_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
							title: 'Мозг взрывается',
							text: '5 уровней сна — это гениально!',
							rating: 10,
							created_at: '2025-12-13T20:26:07.186489Z',
							updated_at: '2025-12-13T20:26:07.186489Z',
							user_login: 'hans_muller',
							user_avatar: 'avatars/default-1.png',
							is_mine: false,
							new_film_rating: 0,
						},
						{
							id: 'f002b3c4-d5e6-7890-bcde-f01234560581',
							user_id: 'c5d6e7f8-a9b0-1234-5f67-56789abcdef0',
							film_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
							title: 'Сложно следить',
							text: 'Нужен второй просмотр.',
							rating: 7,
							created_at: '2025-12-13T20:26:07.186489Z',
							updated_at: '2025-12-13T20:26:07.186489Z',
							user_login: 'anna_schmidt',
							user_avatar: 'avatars/default-2.png',
							is_mine: false,
							new_film_rating: 0,
						},
						{
							id: 'f003c4d5-e6f7-8901-cdef-012345605911',
							user_id: 'd6e7f8a9-b0c1-2345-6f78-6789abcdef01',
							film_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
							title: 'Финал — открытый',
							text: 'Волшебный юла!',
							rating: 9,
							created_at: '2025-12-13T20:26:07.186489Z',
							updated_at: '2025-12-13T20:26:07.186489Z',
							user_login: 'raj_patel',
							user_avatar: 'avatars/default-3.png',
							is_mine: false,
							new_film_rating: 0,
						},
						{
							id: 'f004d5e6-f7a8-9012-def0-123456606011',
							user_id: 'e7f8a9b0-c1d2-3456-7f89-789abcdef012',
							film_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
							title: 'Не ясна мораль фильма',
							text: 'Просто убил время',
							rating: 4,
							created_at: '2025-12-13T20:26:07.186489Z',
							updated_at: '2025-12-13T20:26:07.186489Z',
							user_login: 'priya_sharma',
							user_avatar: 'avatars/default-4.png',
							is_mine: false,
							new_film_rating: 0,
						},
						{
							id: 'f9a0b1c2-d3e4-5678-9012-345678901234',
							user_id: 'b8c9d0e1-f2a3-4567-89ab-890123456789',
							film_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
							title: 'Слишком сложно',
							text: 'Интересная задумка, но слишком запутанный сюжет.',
							rating: 6,
							created_at: '2025-12-13T20:26:07.08939Z',
							updated_at: '2025-12-13T20:26:07.08939Z',
							user_login: 'ivan_ivanov',
							user_avatar: 'avatars/default-3.png',
							is_mine: false,
							new_film_rating: 0,
						},
						{
							id: 'e8f9a0b1-c2d3-4567-8901-234567890123',
							user_id: 'f2a3b4c5-d6e7-8901-2f34-23456789abcd',
							film_id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
							title: 'Гениальная концепция',
							text: 'Уникальная идея и великолепное исполнение!',
							rating: 10,
							created_at: '2025-12-13T20:26:07.08939Z',
							updated_at: '2025-12-13T20:26:07.08939Z',
							user_login: 'emma_watson',
							user_avatar: 'avatars/default-4.png',
							is_mine: false,
							new_film_rating: 0,
						},
					],
				],
			},
			alias: 'feedbacksWithData',
		},
	},

	similar: {
		empty: {
			method: 'GET' as const,
			url: '/api/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/similar',
			response: { statusCode: 200, body: [] },
			alias: 'similarEmpty',
		},
		withData: {
			method: 'GET' as const,
			url: '/api/films/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d/similar',
			response: {
				statusCode: 200,
				body: [
					[
						{
							id: '2c53a9cc-c630-474f-afd8-bf39aebcb89c',
							cover: 'films/pic114.webp',
							title: 'Звёздные войны: Эпизод 5 – Империя наносит ответный удар',
							rating: 9.8,
							year: 1980,
							genre: 'Фантастика',
							created_at: '0001-01-01T00:00:00Z',
						},
						{
							id: '802d0adf-ac14-4ffd-ac99-0c70719ae4b3',
							cover: 'films/pic351.webp',
							title: 'Игры разума',
							rating: 9.6,
							year: 2001,
							genre: 'Драмы',
							created_at: '0001-01-01T00:00:00Z',
						},
						{
							id: '4c5d6e7f-8a9b-0c1d-2e3f-4a5b6c7d8e9f',
							cover: 'films/pic22.png',
							title: 'Список Шиндлера',
							rating: 9.444444444444445,
							year: 1993,
							genre: 'Драмы',
							created_at: '0001-01-01T00:00:00Z',
						},
						{
							id: '6e7f8a9b-0c1d-2e3f-4a5b-6c7d8e9f0a1b',
							cover: 'films/pic24.png',
							title: 'Темный рыцарь',
							rating: 9.444444444444445,
							year: 2008,
							genre: 'Фантастика',
							created_at: '0001-01-01T00:00:00Z',
						},
						{
							id: '5a3d5c34-385c-4bec-a841-c188da3acf93',
							cover: 'films/pic321.webp',
							title: 'Собачий полдень',
							rating: 9.2,
							year: 1975,
							genre: 'Триллеры',
							created_at: '0001-01-01T00:00:00Z',
						},
						{
							id: 'ff63d78b-de4e-433c-9dc0-84193f26d59c',
							cover: 'films/pic223.webp',
							title: 'Звёздные войны: Эпизод 6 – Возвращение Джедая',
							rating: 9.2,
							year: 1983,
							genre: 'Фантастика',
							created_at: '0001-01-01T00:00:00Z',
						},
					],
				],
			},
			alias: 'similarWithData',
		},
	},
} as const;
