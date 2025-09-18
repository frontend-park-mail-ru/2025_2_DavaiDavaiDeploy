export default class LoginPage {
    #parent;
    #self;

    constructor(rootElement) {
        this.#parent = rootElement;
    }
        
    get template() {
        return  Handlebars.templates[`loginPage.hbs`]({ text: 'Login' });
    }

    render() {
        this.#parent.innerHTML = '';
        this.#self = document.createElement('div');
        this.#self.id = 'login-page';
        this.#parent.appendChild(this.#self);
        this.#self.insertAdjacentHTML('afterbegin', this.template);
    }
}