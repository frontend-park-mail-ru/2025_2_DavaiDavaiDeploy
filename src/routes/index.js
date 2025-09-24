import Error404 from '../pages/404/404.js'
import HomePage from '../pages/homePage/apiTestPage.js'
import TestPage from '../pages/homePage/homePage.js'
import LoginPage from '../pages/loginPage/loginPage.js'
import RegistrationPage from '../pages/registrationPage/registrationPage.js'

export const routes = {
	home: {
		href: '/',
		component: HomePage,
	},
	apitest: {
		href: '/test',
		component: TestPage,
	},
	login: {
		href: '/login',
		component: LoginPage,
	},
	register: {
		href: '/register',
		component: RegistrationPage,
	},
	error404: {
		href: '/error',
		component: Error404,
	},
}
