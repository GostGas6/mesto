export default class Section {
    constructor(data, containerSelector) {
        this._items = data.items;
        this._renderer = data.renderer;
        this._container = document.querySelector(containerSelector);
    };

    render(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    };


    addItem(element) {
        this._container.prepend(element);
    };

    addItemsReverse(element) {
        this._container.append(element);
    }
}