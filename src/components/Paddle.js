export default class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.SPEED = 4;
    this.direction = 0;
  }

  move(tableWidth) {
    this.x += this.SPEED * this.direction;
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > tableWidth) this.x = tableWidth - this.width;
  }
}
