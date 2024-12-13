export default class Bricks {
  constructor(gameWidth, w, h, offsetTop = 30) {
    this.gameWidth = gameWidth;
    this.blockWidth = w;
    this.blockHeight = h;
    this.offsetTop = offsetTop;
    this.bricks = [];
    this.cols = Math.floor(gameWidth / w);
    this.offsetX = (gameWidth - this.cols * w) / 2;
  }

  initBricks(rows) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const x = col * this.blockWidth + this.offsetX;
        const y = row * this.blockHeight + this.offsetTop;
        this.bricks.push({ x, y, status: 1 });
      }
    }
  }
}
