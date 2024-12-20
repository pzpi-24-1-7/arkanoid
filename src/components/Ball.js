export default class Ball {
  constructor(x, y, vx, vy, r) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.setRandomVelocityX();
  }

  setRandomVelocityX() {
    const isNegativeRange = Math.random() < 0.5;

    if (isNegativeRange) {
      this.vx = Math.random() * (-2 - -3) + -3;
    } else {
      this.vx = Math.random() * (3 - 2) + 2;
    }
  }
}
