class TouchMixin {
  constructor () {
    this.deltaX = 0;
    this.deltaY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
  }
  touchStart = (event) => {
    this.resetTouchStatus();
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }
  touchMove = (event) => {
    var touch = event.touches[0];
    this.deltaX = touch.clientX - this.startX;
    this.deltaY = touch.clientY - this.startY;
    this.offsetX = Math.abs(this.deltaX);
    this.offsetY = Math.abs(this.deltaY);
  }
  resetTouchStatus = () => {
    this.deltaX = 0;
    this.deltaY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
  }
}

export default TouchMixin;