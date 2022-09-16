import { createElement } from '../utils';

const makeHtml = (keyCode, values, lang) =>
  `<div class="key ${keyCode.toLowerCase()}" data-code=${keyCode}>${values[lang].key}</div>`;

class Key {
  constructor({ keyCode, values }, lang) {
    this.keyCode = keyCode;
    this.values = values;
    this.element = createElement(makeHtml(this.keyCode, this.values, lang));
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

  showShiftValues(lang) {
    if (this.keyCode === 'Tab' || this.keyCode === 'Enter') return;

    this.element.textContent = this.values[lang].shiftKey;
  }

  hideShiftValues(lang) {
    if (this.keyCode === 'Tab' || this.keyCode === 'Enter') return;

    this.element.textContent = this.values[lang].key;
  }

  showCapsValues(lang) {
    if (lang === 'en') {
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
    }

    this.element.textContent = this.values[lang].shiftKey;
  }

  hideCapsValues(lang) {
    if (lang === 'en') {
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
    }

    this.element.textContent = this.values[lang].key;
  }

  toggleLang(lang, key) {
    if (this.keyCode === 'Tab' || this.keyCode === 'Enter') return;
    let property = key;
    if (key === 'capsLock') {
      property = this.values[lang].capsLock ? 'capsLock' : 'key';
    }
    this.element.textContent = this.values[lang][property];
  }
}

export default Key;
