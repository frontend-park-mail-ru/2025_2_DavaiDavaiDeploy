export const TOPFILM = {
	id: 2,
	image: '../assets/img/dune.jpg',
	title: 'Дюна: Часть вторая',
	year: '2024',
	genre: 'Фантастика',
	duration: 169,
	desription:
		'Продолжение эпической саги о Поле Атрейдесе. Он продолжает путь к тому, чтобы стать МуадДибом, в то время как его враги плетут заговоры против него.',
}

export function getFilmsMocks(limit, offset = 0) {
	const result = []
	if (offset + limit > 300) {
		return result
	}
	const length = FILMS.length

	for (let i = 0; i < limit; i++) {
		const index = (offset + i) % length
		FILMS[index].id = offset + i
		result.push(FILMS[index])
	}
	return result
}

export let FILMS = [
	{
		id: 1,
		title: 'Интерстеллар',
		genres: [
			{ id: 1, title: 'Фантастика' },
			{ id: 2, title: 'Драма' },
			{ id: 3, title: 'Приключения' },
		],
		year: 2014,
		country: 'США',
		rating: 7.8,
		budget: 165000000,
		fees: 677000000,
		premierDate: new Date(2014, 9, 26),
		duration: 169,
		createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
		updatedAt: new Date(),
	},
	{
		id: 2,
		title: 'Крестный отец',
		genres: [
			{ id: 1, title: 'Криминал' },
			{ id: 2, title: 'Драма' },
		],
		year: 1972,
		country: 'США',
		rating: 3,
		budget: 6000000,
		fees: 245000000,
		premierDate: new Date(1972, 2, 15),
		duration: 175,
		createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
		updatedAt: new Date(),
	},
	{
		id: 3,
		title: 'Темный рыцарь',
		genres: [
			{ id: 1, title: 'Боевик' },
			{ id: 2, title: 'Криминал' },
			{ id: 3, title: 'Драма' },
		],
		year: 2008,
		country: 'США',
		rating: 9.0,
		budget: 185000000,
		fees: 1005000000,
		premierDate: new Date(2008, 6, 18),
		duration: 152,
		createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
		updatedAt: new Date(),
	},
	{
		id: 4,
		title: 'Брат',
		genres: [
			{ id: 1, title: 'Криминал' },
			{ id: 2, title: 'Драма' },
			{ id: 3, title: 'Боевик' },
		],
		year: 1997,
		country: 'Россия',
		rating: 8.3,
		budget: 10000,
		fees: 1000000,
		premierDate: new Date(1997, 11, 12),
		duration: 100,
		createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
		updatedAt: new Date(),
	},
	{
		id: 5,
		title: 'Назад в будущее',
		genres: [
			{ id: 1, title: 'Фантастика' },
			{ id: 2, title: 'Комедия' },
			{ id: 3, title: 'Приключения' },
		],
		year: 1985,
		country: 'США',
		rating: 6,
		budget: 19000000,
		fees: 381000000,
		premierDate: new Date(1985, 6, 3),
		duration: 116,
		createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
		updatedAt: new Date(),
	},
	{
		id: 6,
		title: 'Леон',
		genres: [
			{ id: 1, title: 'Боевик' },
			{ id: 2, title: 'Криминал' },
			{ id: 3, title: 'Драма' },
		],
		year: 1994,
		country: 'Франция',
		rating: 8.5,
		budget: 16000000,
		fees: 45000000,
		premierDate: new Date(1994, 8, 14),
		duration: 110,
		createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
		updatedAt: new Date(),
	},
	{
		id: 7,
		title: 'Джентльмены',
		genres: [
			{ id: 1, title: 'Криминал' },
			{ id: 2, title: 'Комедия' },
			{ id: 3, title: 'Боевик' },
		],
		year: 2019,
		country: 'Великобритания',
		rating: 2.0,
		budget: 22000000,
		fees: 115000000,
		premierDate: new Date(2019, 11, 3),
		duration: 113,
		createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
		updatedAt: new Date(),
	},
]
