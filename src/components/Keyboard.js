import { createElement } from '../utils';
import Key from './Key';

const makeHtml = () => `<div class="keyboard"></div>`;
const makeLineHtml = () => `<div class="keyboard__keys"></div>`;
const makeLineWrapHtml = () => `<div class="keyboard__keys keyboard__keys_wrap"></div>`;
const makeLineColHtml = () => `<div class="keyboard__keys keyboard__keys_col"></div>`;
const makeArrowHtml = () => `<div class="keyboard__arrowKeys"></div>`;

class Keyboard {
  constructor({ symbolKeys, digitKeys, metaKeys, letterKeys }) {
    this.keyComponents = {
      symbolKeys: this.generateKeyComponents(symbolKeys),
      digitKeys: this.generateKeyComponents(digitKeys),
      metaKeys: this.generateKeyComponents(metaKeys),
      letterKeys: this.generateKeyComponents(letterKeys),
    };

    this.keyComponentsByCode = {
      ...this.keyComponents.symbolKeys,
      ...this.keyComponents.digitKeys,
      ...this.keyComponents.metaKeys,
      ...this.keyComponents.letterKeys,
    };

    this.shiftDependentKeyComponents = [
      ...Object.values(this.keyComponents.letterKeys),
      ...Object.values(this.keyComponents.digitKeys),
      ...Object.values(this.keyComponents.symbolKeys),
    ];

    this.capsLockDependentKeyComponents = [...Object.values(this.keyComponents.letterKeys)];

    this.element = this.generateElement();
  }

  generateElement() {
    const keyboardElement = createElement(makeHtml());
    const firstLineElement = createElement(makeLineHtml());
    const secondLineElement = createElement(makeLineHtml());
    const thirdLineElement = createElement(makeLineHtml());
    const forthLineElement = createElement(makeLineHtml());
    const fifthLineElement = createElement(makeLineHtml());
    const lineWrapElement = createElement(makeLineWrapHtml());
    const lineColElement1 = createElement(makeLineColHtml());
    const lineColElement2 = createElement(makeLineColHtml());

    const { symbolKeys, metaKeys, digitKeys, letterKeys } = this.keyComponents;
    const { Backquote, Minus, Equal, Tab, IntlBackslash, Slash, Space, Enter } = symbolKeys;
    const {
      Backspace,
      CapsLock,
      ShiftLeft,
      ShiftRight,
      Delete,
      ControlLeft,
      AltLeft,
      MetaLeft,
      MetaRight,
      AltRight,
      ArrowLeft,
      ArrowUp,
      ArrowDown,
      ArrowRight,
    } = metaKeys;
    const digitKeyElements = Object.values(digitKeys).map((item) => item.element);
    const letterKeyElements = Object.values(letterKeys).map((item) => item.element);

    const arrowWrapperElement = createElement(makeArrowHtml());
    arrowWrapperElement.append(ArrowUp.element, ArrowDown.element);

    const firstLineKeyElements = [
      Backquote.element,
      ...digitKeyElements,
      Minus.element,
      Equal.element,
      Backspace.element,
    ];
    const secondLineKeyElements = [Tab.element, ...letterKeyElements.slice(0, 12)];
    const thirdLineKeyElements = [CapsLock.element, ...letterKeyElements.slice(12, 24)];
    const forthLineKeyElements = [
      ShiftLeft.element,
      IntlBackslash.element,
      ...letterKeyElements.slice(24, 33),
      Slash.element,
      ShiftRight.element,
    ];
    const fifthLineKeyElements = [
      Delete.element,
      ControlLeft.element,
      AltLeft.element,
      MetaLeft.element,
      Space.element,
      MetaRight.element,
      AltRight.element,
      ArrowLeft.element,
      arrowWrapperElement,
      ArrowRight.element,
    ];

    firstLineElement.append(...firstLineKeyElements);
    secondLineElement.append(...secondLineKeyElements);
    thirdLineElement.append(...thirdLineKeyElements);
    forthLineElement.append(...forthLineKeyElements);
    fifthLineElement.append(...fifthLineKeyElements);

    lineColElement1.append(secondLineElement, thirdLineElement);
    lineColElement2.append(Enter.element);
    lineWrapElement.append(lineColElement1, lineColElement2);

    keyboardElement.append(firstLineElement, lineWrapElement, forthLineElement, fifthLineElement);

    return keyboardElement;
  }

  generateKeyComponents(data) {
    const arr = Object.entries(data);
    const components = {};

    arr.forEach((item) => {
      const keyData = {};
      [keyData.keyCode, keyData.values] = item;
      components[keyData.keyCode] = new Key(keyData);
    });

    return components;
  }

  setState(state) {
    this.state = state;
  }

  toggleActiveClass(code, toggler) {
    if (!this.keyComponentsByCode[code]) return;

    const isActive = code === 'CapsLock' ? this.state.capslock : toggler;

    if (isActive) {
      this.keyComponentsByCode[code].addActiveClass();
    } else {
      this.keyComponentsByCode[code].removeActiveClass();
    }
  }

  toggleCapsLock() {
    if (this.state.capslock) {
      this.capsLockDependentKeyComponents.forEach((item) => {
        item.showCapsValues();
      });
    } else {
      this.capsLockDependentKeyComponents.forEach((item) => {
        item.hideCapsValues();
      });
    }
  }

  toggleShift() {
    if (this.state.leftShift || this.state.rightShift) {
      this.shiftDependentKeyComponents.forEach((item) => {
        item.showShiftValues();
      });
    } else {
      this.shiftDependentKeyComponents.forEach((item) => {
        item.hideShiftValues();
      });
    }
  }
}

export default Keyboard;
