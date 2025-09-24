import '../build/precompiled.js'
import HTTPClient from './modules/HTTPClient/index.js'
import router from './modules/router/index.js'
import Error404 from './pages/404/404.js'
import TestPage from './pages/homePage/apiTestPage.js'
import HomePage from './pages/homePage/homePage.js'
import LoginPage from './pages/loginPage/loginPage.js'
import RegistrationPage from './pages/registrationPage/registrationPage.js'

const routes = {
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

HTTPClient.configurate({ baseUrl: 'https://dummyjson.com' })

let contentContainer = document.createElement('div')
contentContainer.id = 'app'
document.body.appendChild(contentContainer)

router.configurate(routes, contentContainer)
router.start()
