import Keyboard from './components/Keyboard';
import Output from './components/Output';
import keysData from './keys.json';
import { createElement } from './utils';

const makeInfoHtml = () => `
<div class="info">
  <div class="tumbler">
    <ul class="tumbler__lines">
      <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
    </ul>
    <div  class="tumbler__shadow"></div>
    <div  class="tumbler__knob"></div>
  </div>
  <div class="info__text">
    <p>The keyboard was created and tested in the macOS.</p>
    <p>
      To switch the language use the key combination:<br />
      control + option (ctrl + alt on windows).
    </p>
  </div>
  <div class="info__lang">
  </div>
</div>
`;

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

    this.infoElement = createElement(makeInfoHtml());

    this.infoLangElement = this.infoElement.querySelector('.info__lang');
    this.toggleInfoLang();

    this.tumblerElement = this.infoElement.querySelector('.tumbler');
    this.tumblerKnobElement = this.infoElement.querySelector('.tumbler__knob');
    this.tumblerKnobElement.addEventListener('click', () => {
      this.tumblerElement.classList.toggle('_active');
      this.keyboardElement.classList.toggle('_colorful');
    });

    this.mainElement.append(outputElement);
    this.mainElement.append(this.keyboardComponent.element);
    this.mainElement.append(this.infoElement);
  }

  toggleInfoLang() {
    this.infoLangElement.innerHTML = `
    <span>${this.state.lang.toUpperCase()}</span>
    <span>${this.state.lang === 'en' ? '🇺🇸' : '🇷🇺'}</span>
    `;
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
      this.toggleInfoLang();
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
