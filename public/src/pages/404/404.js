export default class Error404 {
    #parent;
    #self;

    constructor(rootElement) {
        this.#parent = rootElement;
    }

    render() {
        this.#self = document.createElement('div');
        this.#self.id = 'error404-page';
        this.#parent.appendChild(this.#self);
        this.#self.insertAdjacentHTML('afterbegin', Handlebars.templates[`404.hbs`]());
    }
}
