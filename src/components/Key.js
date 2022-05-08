import { createElement } from '../utils';

const makeHtml = (keyCode, values) =>
  `<div class="key ${keyCode.toLowerCase()}">${values.en.key}</div>`;

class Key {
  constructor({ keyCode, values }) {
    this.keyCode = keyCode;
    this.values = values;
    this.element = createElement(makeHtml(this.keyCode, this.values));
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

  showShiftValues() {
    if (this.keyCode === 'Tab' || this.keyCode === 'Enter') return;
    this.element.textContent = this.values.en.shiftKey;
  }

  hideShiftValues() {
    if (this.keyCode === 'Tab' || this.keyCode === 'Enter') return;
    this.element.textContent = this.values.en.key;
  }

  showCapsValues() {
    if (
      this.keyCode === 'BracketLeft' ||
      this.keyCode === 'BracketRight' ||
      this.keyCode === 'Quote' ||
      this.keyCode === 'Semicolon' ||
      this.keyCode === 'Backslash' ||
      this.keyCode === 'Comma' ||
      this.keyCode === 'Period'
    )
      return;

    this.element.textContent = this.values.en.shiftKey;
  }

  hideCapsValues() {
    if (
      this.keyCode === 'BracketLeft' ||
      this.keyCode === 'BracketRight' ||
      this.keyCode === 'Quote' ||
      this.keyCode === 'Semicolon' ||
      this.keyCode === 'Backslash' ||
      this.keyCode === 'Comma' ||
      this.keyCode === 'Period'
    )
      return;

    this.element.textContent = this.values.en.key;
  }
}

export default Key;
