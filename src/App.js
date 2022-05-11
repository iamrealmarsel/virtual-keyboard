import Keyboard from './components/Keyboard';
import Output from './components/Output';
import keysData from './keys.json';
import { createElement } from './utils';

const makeInfoHtml = () =>
  `<div class="info">
  <p>Клавиатура создана и протестирована в операционной системе macOs.</p>
  <p>Для переключения языка используйте комбинацию клавиш:<br> control + option (ctrl + alt на windows).</p>
  </div>`;

class App {
  constructor(containerElement) {
    this.state = {
      capslock: false,
      leftShift: false,
      rightShift: false,
      lang: !localStorage.getItem('lang') ? 'en' : localStorage.getItem('lang'),
    };

    this.mainElement = document.createElement('main');
    containerElement.append(this.mainElement);

    this.keyboardComponent = new Keyboard(keysData, this.state);
    this.outputComponent = new Output(keysData);

    this.keyByCode = {
      ...keysData.symbolKeys,
      ...keysData.digitKeys,
      ...keysData.letterKeys,
      ...keysData.metaKeys,
    };

    this.keyboardElement = this.keyboardComponent.element;

    this.mouseTarget = null;
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    document.addEventListener('keyup', this.keyupHandler.bind(this));

    this.keyboardElement.addEventListener('mousedown', this.mousedownHandler.bind(this));
    this.keyboardElement.addEventListener('mouseup', this.mouseupHandler.bind(this));

    const outputElement = createElement(`<div class="output"></div>`);
    outputElement.append(this.outputComponent.element);

    this.mainElement.append(outputElement);
    this.mainElement.append(this.keyboardComponent.element);
    this.mainElement.append(createElement(makeInfoHtml()));
  }

  mousedownHandler(e) {
    e.preventDefault();

    const codeKey = e.target.dataset.code;

    if (!this.keyByCode[codeKey]) return;

    this.mouseTarget = codeKey;

    if (codeKey === 'CapsLock') {
      this.state.capslock = !this.state.capslock;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleCapsLock();
    } else if (codeKey === 'ShiftLeft') {
      this.state.leftShift = true;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleShift();
    } else if (codeKey === 'ShiftRight') {
      this.state.rightShift = true;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleShift();
    }

    this.outputComponent.setState(this.state);
    this.outputComponent.update(codeKey);
    this.keyboardComponent.toggleActiveClass(codeKey, true);
  }

  mouseupHandler(e) {
    e.preventDefault();

    if (this.mouseTarget === 'ShiftLeft') {
      this.state.leftShift = false;
    } else if (this.mouseTarget === 'ShiftRight') {
      this.state.rightShift = false;
    }

    this.keyboardComponent.setState(this.state);
    this.keyboardComponent.toggleShift();
    this.keyboardComponent.toggleActiveClass('all', false);
  }

  keydownHandler(e) {
    e.preventDefault();

    const codeKey = e.code;

    if (!this.keyByCode[codeKey]) return;

    if (codeKey === 'CapsLock') {
      this.state.capslock = !this.state.capslock;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleCapsLock();
    } else if (codeKey === 'ShiftLeft') {
      this.state.leftShift = true;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleShift();
    } else if (codeKey === 'ShiftRight') {
      this.state.rightShift = true;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleShift();
    } else if (e.ctrlKey && e.altKey) {
      this.state.lang = this.state.lang === 'en' ? 'ru' : 'en';
      localStorage.setItem('lang', this.state.lang);
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleLang();
    }

    this.outputComponent.setState(this.state);
    this.outputComponent.update(codeKey);
    this.keyboardComponent.toggleActiveClass(codeKey, true);
  }

  keyupHandler(e) {
    e.preventDefault();

    const codeKey = e.code;

    if (!this.keyByCode[codeKey]) return;

    if (codeKey === 'ShiftLeft') {
      this.state.leftShift = false;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleShift();
    } else if (codeKey === 'ShiftRight') {
      this.state.rightShift = false;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleShift();
    }

    this.keyboardComponent.toggleActiveClass(codeKey, false);
  }
}

export default App;
