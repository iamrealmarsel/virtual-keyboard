import { createElement } from '../utils';

const makeHtml = (data) =>
  `<div class="key ${data.keyCode.toLowerCase()}">${data.values.en.key}</div>`;

class Key {
  constructor(data) {
    this.data = data;
    this.element = createElement(makeHtml(this.data));
  }

  getElement() {
    return this.element;
  }

  addActiveClass() {
    this.element.classList.add('_active');
  }

  removeActiveClass() {
    this.element.classList.remove('_active');
  }
}

export default Key;
