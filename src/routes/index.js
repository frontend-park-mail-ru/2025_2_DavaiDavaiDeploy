import Error404 from '../pages/404/404.js'
import GenrePage from '../pages/genrePage/genrePage.js'
import HomePage from '../pages/homePage/homePage.js'
import LoginPage from '../pages/loginPage/loginPage.js'
import RegistrationPage from '../pages/registrationPage/registrationPage.js'

export const routes = {
	home: {
		href: '/',
		component: HomePage,
	},
	login: {
		href: '/login',
		component: LoginPage,
		hasHeader: false,
		hasFooter: false,
	},
	register: {
		href: '/register',
		component: RegistrationPage,
		hasHeader: false,
		hasFooter: false,
	},
	genre: {
		href: '/genre',
		component: GenrePage,
	},
	error404: {
		href: '/error',
		component: Error404,
		hasHeader: false,
		hasFooter: false,
	},
}
