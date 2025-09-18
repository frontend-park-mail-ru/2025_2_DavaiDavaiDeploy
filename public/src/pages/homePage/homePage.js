export default class Home {
    #parent;
    #self;

    constructor(rootElement) {
        this.#parent = rootElement;
    }

    render() {
        this.#self = document.createElement('div');
        this.#self.id = 'home-page';
        this.#parent.appendChild(this.#self);
        this.#self.insertAdjacentHTML('afterbegin', Handlebars.templates[`homePage.hbs`]({ text: 'Home' }));
    }
}