import '../build/precompiled.js';
import router from './router/router.js';
import HomePage from './pages/homePage/homePage.js';
import LoginPage from './pages/loginPage/loginPage.js';
import RegistrationPage from './pages/registrationPage/registrationPage.js';
import Error404 from './pages/404/404.js';

const routes = {
    home: {
        href: '/',
        class: HomePage
    },
    login: {
        href: '/login',
        class: LoginPage
    },
    register: {
        href: '/register',
        class: RegistrationPage
    },
    error404: {
        href: '/error',
        class: Error404
    },
}

router.configurate(routes);
router.start();