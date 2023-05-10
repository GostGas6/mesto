export default class Section {
    constructor(data, containerSelector) {
        this._items = data.items;
        this._renderer = data.renderer;
        this._container = document.querySelector(containerSelector);
    };

    render() {
        this._items.forEach(this._renderer);
    };

    addItem(element) {
        this._container.prepend(element);
    };
}