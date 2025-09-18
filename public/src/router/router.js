class Router {
    constructor() {
        if (Router.instance) {
            return Router.instance;
        }

        Router.instance = this;
        this.routes = {};

        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePopState = this.handlePopState.bind(this);

        this.createContainer();
        this.initEventListeners();
    }

    configurate(routes) {
        this.routes = routes;
    }

    createContainer() {
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'app';
        document.body.appendChild(this.contentContainer);
    }

    initEventListeners() {
        window.addEventListener('popstate', this.handlePopState);
        window.addEventListener('click', this.handleClick);
    }

    handlePopState(event) {
        const path = window.location.pathname;
        this.handleRouteChange(path, false);
    }

    handleClick(event) {
        const link = event.target.closest('a');
        if (link) {
            event.preventDefault();
            const url = new URL(link.href);
            this.handleRouteChange(url.pathname);
        }
    }

    async handleRouteChange(path, addToHistory = true) {
        let routeName = Object.keys(this.routes).find(key =>
            this.routes[key].href === path
        );

        let route = this.routes[routeName];

        if (route) {
            if (addToHistory) {
                window.history.pushState({ path }, '', path);
            }
            this.contentContainer.innerHTML = '';
            const page = new route.class(this.contentContainer);
            page.render();
            return true;
        }

        return false;
    }

    start() {
        this.handleRouteChange(window.location.pathname);
    }
}

export default new Router();
