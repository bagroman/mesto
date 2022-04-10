export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    //добавление элемента в контайнер
    addItem(element) {
        this._container.prepend(element);
    }
    
    //отрисовка элементов
    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}