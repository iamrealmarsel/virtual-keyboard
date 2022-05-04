import Keyboard from './components/Keyboard';

class App {
  constructor() {
    this.keyboard = new Keyboard('Ура! ЗАПУСТИЛСЯ !!!');
  }

  init() {
    this.keyboard.alert();
  }
}

export default App;
