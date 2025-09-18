import '../build/precompiled.js';
import router from './router/router.js';
import HomePage from './pages/homePage/homePage.js';
import LoginPage from './pages/loginPage/loginPage.js';
import RegistrationPage from './pages/registrationPage/registrationPage.js';

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
}

router.configurate(routes);
router.start();