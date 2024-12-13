export default class Paddle {
  constructor(x, y, w, h, speed = 4) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.speed = speed;
    this.direction = 0;
  }

  move(tableWidth) {
    this.x += this.speed * this.direction;
    // проверка границ
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > tableWidth) this.x = tableWidth - this.width;
  }
}
