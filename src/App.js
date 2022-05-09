import Keyboard from './components/Keyboard';
import Output from './components/Output';
import keysData from './keys.json';

class App {
  constructor(containerElement) {
    this.state = {
      capslock: false,
      leftShift: false,
      rightShift: false,
      lang: 'en',
    };

    this.mainElement = document.createElement('main');
    containerElement.append(this.mainElement);

    this.keyboardComponent = new Keyboard(keysData);
    this.outputComponent = new Output(keysData);

    this.keyByCode = {
      ...keysData.symbolKeys,
      ...keysData.digitKeys,
      ...keysData.letterKeys,
      ...keysData.metaKeys,
    };
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    document.addEventListener('keyup', this.keyupHandler.bind(this));

    this.mainElement.append(this.outputComponent.element);
    this.mainElement.append(this.keyboardComponent.element);
  }

  keydownHandler(e) {
    e.preventDefault();

    const codeKey = e.code;

    if (!this.keyByCode[codeKey]) return;

    if (codeKey === 'CapsLock') {
      this.state.capslock = e.getModifierState('CapsLock');
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
      // ... смена языка ...
    }

    this.outputComponent.setState(this.state);

    // if (
    //   e.shiftKey &&
    //   (codeKey === 'ArrowLeft' ||
    //     codeKey === 'ArrowRight' ||
    //     codeKey === 'ArrowUp' ||
    //     codeKey === 'ArrowDown')
    // ) {
    //   this.outputComponent.select(codeKey);
    // }

    this.outputComponent.update(codeKey);
    this.keyboardComponent.toggleActiveClass(codeKey, true);

    // if (
    //   !(codeKey === 'ShiftLeft') &&
    //   !(codeKey === 'ShiftRight') &&
    //   !(codeKey === 'CapsLock') &&
    //   !e.ctrlKey &&
    //   !e.altKey &&
    //   !e.metaKey
    // ) {
    //   this.outputComponent.update(codeKey);
    // }
  }

  keyupHandler(e) {
    e.preventDefault();

    const codeKey = e.code;

    if (!this.keyByCode[codeKey]) return;

    if (codeKey === 'CapsLock') {
      this.state.capslock = e.getModifierState('CapsLock');
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleCapsLock();
    } else if (codeKey === 'ShiftLeft') {
      this.state.leftShift = false;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleShift();
    } else if (codeKey === 'ShiftRight') {
      this.state.rightShift = false;
      this.keyboardComponent.setState(this.state);

      this.keyboardComponent.toggleShift();
    } else if (e.ctrlKey && e.altKey) {
      // ... смена языка ...
    }

    this.keyboardComponent.toggleActiveClass(codeKey, false);
  }
}

export default App;
