export default class LoginPage {
    #parent;
    #self;

    constructor(rootElement) {
        this.#parent = rootElement;
    }

    render() {
        this.#self = document.createElement('div');
        this.#self.id = 'login-page';
        this.#parent.appendChild(this.#self);
        this.#self.insertAdjacentHTML('afterbegin', Handlebars.templates[`loginPage.hbs`]({ text: 'Login' }));
    }
}