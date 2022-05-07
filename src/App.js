import Keyboard from './components/Keyboard';

class App {
  constructor(containerElement) {
    this.container = document.createElement('main');
    containerElement.append(this.container);

    this.keyboardComponent = new Keyboard();
  }

  init() {
    document.addEventListener('keydown', this.keydownHadler.bind(this));
    document.addEventListener('keyup', this.keyupHadler.bind(this));

    this.container.append(this.keyboardComponent.element);
  }

  keydownHadler(e) {
    e.preventDefault();
    this.keyboardComponent.pressKeydown(e.code);
  }

  keyupHadler(e) {
    e.preventDefault();
    this.keyboardComponent.pressKeyup(e.code);
  }
}

export default App;
