import Keyboard from './components/Keyboard';
import keysData from './keys.json';

class App {
  constructor(containerElement) {
    this.state = {
      capslock: false,
      leftShift: false,
      rightShift: false,
    };

    this.mainElement = document.createElement('main');
    containerElement.append(this.mainElement);

    this.keyboardComponent = new Keyboard(keysData);
  }

  init() {
    document.addEventListener('keydown', this.keydownHadler.bind(this));
    document.addEventListener('keyup', this.keyupHadler.bind(this));

    this.mainElement.append(this.keyboardComponent.element);
  }

  keydownHadler(e) {
    e.preventDefault();

    const codeKey = e.code;

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

    this.keyboardComponent.toggleActiveClass(codeKey, true);
  }

  keyupHadler(e) {
    e.preventDefault();

    const codeKey = e.code;

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
