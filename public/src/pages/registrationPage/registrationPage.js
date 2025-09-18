export default class RegistrationPage {
    #parent;
    #self;

    constructor(rootElement) {
        this.#parent = rootElement;
    }

    render() {
        this.#self = document.createElement('div');
        this.#self.id = 'registration-page';
        this.#parent.appendChild(this.#self);
        this.#self.insertAdjacentHTML('afterbegin', Handlebars.templates[`registrationPage.hbs`]({ text: 'Registration' }));
    }
}
