import TouchMixin from './touchMixin';
import { getDom, isFn, preventDefault } from './util';
class Slider {
  constructor (options = {}) {
    this.options = {
      min: 0,
      max: 100,
      step: 1,
      value: 0,
      ...options
    };
    this.min = this.options.min;
    this.max = this.options.max;
    this.step = this.options.step;
    this.value = this.options.value;
    this.el = getDom(this.options.el);
    this.dragStatus = '';
    this.scope = this.max - this.min;
    this.initHtml();
    this.updateValue(this.value);
    const el = this.el.querySelector('.v-slider__button-wrapper');
    this.bindTouchEvent(el);
    this.touchMixin = new TouchMixin();
    this.el.addEventListener('click', this.onClick);
  }
  initHtml = () => {
    const html = `
      <div class="v-slider-bar">
        <div class="v-slider__button-wrapper">
          <div class="v-slider__button"></div>
        </div>
      </div>
    `;
    this.el.style.background = this.options.inactiveColor;
    this.el.innerHTML = html;
    this.el.querySelector('.v-slider__button').style.width = this.options.buttonSize;
    this.el.querySelector('.v-slider__button').style.height = this.options.buttonSize;
    if (this.options.barHeight) {
      this.el.style.height = this.options.barHeight;
      this.el.querySelector('.v-slider-bar').style.height = this.options.barHeight;
    }
  }
  updateValue = (value, end) => {
    value = this.format(value);
    const input = this.options.input;
    const change = this.options.change;
    if (input) {
      if (isFn(input)) {
        input.call(this, value);
      } else {
        console.warn(`input is not a function`);
      }
    }
    if (end && change) {
      if (isFn(change)) {
        change.call(this, value);
      } else {
        console.warn('change is not a function');
      }
    }
    this.value = value;
    this.render();
  }
  format = (value) => {
    return (
      Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step
    );
  }
  onClick = (event) => {
    event.stopPropagation();
    const rect = this.el.getBoundingClientRect();
    const delta = event.clientX - rect.left;
    const total = rect.width;
    let value = +this.min + (delta / total) * this.scope;
    this.startValue = this.value;
    this.updateValue(value, true);
  }
  onTouchStart = (event) => {
    this.touchMixin.touchStart(event);
    this.currentValue = this.value;
    this.startValue = this.format(this.value);
    this.dragStatus = 'start';
  }
  onTouchMove = (event) => {
    const dragStart = this.options.dragStart;
    if (this.dragStatus === 'start' && dragStart) {
      if (isFn(dragStart)) {
        dragStart();
      } else {
        console.warn('dragStart is not a function');
      }
    }
    this.el.querySelector('.v-slider-bar').style.transition = 'none 0s ease 0s';
    preventDefault(event, true);
    this.touchMixin.touchMove(event);
    this.dragStatus = 'draging';
    const rect = this.el.getBoundingClientRect();
    const delta = this.touchMixin.deltaX;
    const total = rect.width;
    const diff = (delta / total) * this.scope;


    this.currentValue = this.startValue + diff;
    this.updateValue(this.currentValue);
  }
  onTouchEnd = () => {
    if (this.dragStatus === 'draging') {
      this.updateValue(this.currentValue, true);
      const dragEnd = this.options.dragEnd;
      if (dragEnd) {
        if (isFn(dragEnd)) {
          dragEnd();
        } else {
          console.warn('dragEnd is not a function');
        }
      }
    }
    this.el.querySelector('.v-slider-bar').style.transition = null;
    this.dragStatus = '';
  }
  bindTouchEvent = (el) => {
    let onTouchStart = this.onTouchStart,
        onTouchMove = this.onTouchMove,
        onTouchEnd = this.onTouchEnd;
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchmove', onTouchMove);

    if (onTouchEnd) {
      el.addEventListener('touchend', onTouchEnd);
      el.addEventListener('touchcancel', onTouchEnd);
    }
  }
  // 计算选中条长度百分比
  calcMainAxis = () => {
    const { value, min, scope } = this;
    return `${((value - min) * 100) / scope}%`;
  }
  // 计算选中条开始位置的偏移量
  calcOffset = () => {
    const { value, min, scope } = this;
    return null;
  }
  render = () => {
    const barStyle = {
      width: this.calcMainAxis(),
      background: this.options.activeColor
    };
    const el = this.el.querySelector('.v-slider-bar');
    el.style.width = barStyle.width;
    el.style.background = barStyle.background;
  }
}

export default Slider;