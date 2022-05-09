import { createElement } from '../utils';

const makeHtml = () => `<textarea class="output"></textarea>`;

class Output {
  constructor({ symbolKeys, digitKeys, letterKeys }) {
    this.keys = {
      ...symbolKeys,
      ...digitKeys,
      ...letterKeys,
    };

    this.element = this.generateElement();
    this.text = this.element.value;

    this.selectMode = false;
  }

  generateElement() {
    return createElement(makeHtml());
  }

  setState(state) {
    this.state = state;
  }

  update(code) {
    if (code === 'Delete' || code === 'Backspace') {
      this.remove(code);
    } else if (
      code === 'ArrowLeft' ||
      code === 'ArrowRight' ||
      code === 'ArrowUp' ||
      code === 'ArrowDown'
    ) {
      this.navigate(code);
    } else {
      if (!this.keys[code]) return;
      this.add(code);
    }
  }

  navigate(code) {
    if (this.element.selectionStart === this.element.selectionEnd) {
      if (code === 'ArrowLeft' && this.element.selectionStart !== 0) {
        this.element.selectionStart -= 1;
        this.element.selectionEnd = this.element.selectionStart;
      } else if (code === 'ArrowRight' && this.element.selectionStart < this.element.textLength) {
        this.element.selectionStart += 1;
        this.element.selectionEnd = this.element.selectionStart;
      } else if (code === 'ArrowUp') {
        this.element.selectionStart = 0;
        this.element.selectionEnd = 0;
      } else if (code === 'ArrowDown') {
        this.element.selectionStart = this.element.textLength;
        this.element.selectionEnd = this.element.textLength;
      }
    } else if (code === 'ArrowLeft') {
      this.element.selectionEnd = this.element.selectionStart;
    } else if (code === 'ArrowRight') {
      this.element.selectionStart = this.element.selectionEnd;
    } else if (code === 'ArrowUp') {
      this.element.selectionStart = 0;
      this.element.selectionEnd = 0;
    } else if (code === 'ArrowDown') {
      this.element.selectionStart = this.element.textLength;
      this.element.selectionEnd = this.element.textLength;
    }
  }

  add(code) {
    let property;

    if (code === 'Enter' || code === 'Tab') {
      property = 'value';
    } else if (this.state.leftShift || this.state.rightShift) {
      property = 'shiftKey';
    } else if (this.state.capslock) {
      property = this.keys[code][this.state.lang].capsLock ? 'capsLock' : 'key';
    } else {
      property = 'key';
    }

    if (this.element.selectionStart === this.element.selectionEnd) {
      this.text =
        this.text.slice(0, this.element.selectionStart) +
        this.keys[code][this.state.lang][property] +
        this.text.slice(this.element.selectionStart);

      const selectionPosition = this.element.selectionStart;
      this.element.value = this.text;
      this.element.selectionEnd = selectionPosition + 1;
    } else {
      const selectionPosition = this.element.selectionStart;
      this.element.setRangeText(this.keys[code][this.state.lang][property]);
      this.text = this.element.value;
      this.element.selectionStart = selectionPosition + 1;
      this.element.selectionEnd = this.element.selectionStart;
    }
  }

  remove(code) {
    if (this.element.selectionStart === this.element.selectionEnd) {
      if (code === 'Backspace' && this.element.selectionStart !== 0) {
        this.text =
          this.text.slice(0, this.element.selectionStart - 1) +
          this.text.slice(this.element.selectionStart);

        const selectionPosition = this.element.selectionStart;
        this.element.value = this.text;
        this.element.selectionEnd = selectionPosition - 1;
      } else if (code === 'Delete') {
        this.text =
          this.text.slice(0, this.element.selectionStart) +
          this.text.slice(this.element.selectionStart + 1);

        const selectionPosition = this.element.selectionStart;
        this.element.value = this.text;
        this.element.selectionEnd = selectionPosition;
      }
    } else {
      this.element.setRangeText('');
      this.text = this.element.value;
    }
  }
}

export default Output;
