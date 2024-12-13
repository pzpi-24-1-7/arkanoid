import Paddle from "./Paddle.js";
import Bricks from "./Bricks.js";

export default class Game {
  constructor(table, ball) {
    this.table = table;
    this.ball = ball;
    this.paddle = new Paddle((table.w - 100) / 2, table.h - 20, 100, 10);
    this.bricks = new Bricks(800, 50, 20);
    this.bricks.initBricks(2);
    this.isGameOver = false;
  }

  step() {
    if (this.isGameOver) return;

    const b = this.ball;
    const p = this.paddle;
    const t = this.table;
    const br = this.bricks;

    b.x += b.vx;
    b.y += b.vy;

    if (b.x - b.r <= 0 || b.x + b.r >= t.w) {
      b.vx = -b.vx;
    }

    if (b.y - b.r <= 0) {
      b.vy = -b.vy;
    }

    if (b.y + b.r >= t.h) {
      this.showMessage("Game Over!");
      this.resetBall();
      return;
    }

    p.move(t.w);

    if (b.x > p.x && b.x < p.x + p.width && b.y + b.r >= p.y) {
      if (
        (b.x - b.r <= p.x && b.vx > 0) ||
        (b.x + b.r >= p.x + p.width && b.vx < 0)
      ) {
        b.vx = -b.vx;
      }
      b.vy = -b.vy;
    }

    for (const brick of br.bricks) {
      if (brick.status === 1) {
        if (
          b.x > brick.x &&
          b.x < brick.x + br.blockWidth &&
          ((b.y - b.r <= brick.y + br.blockHeight && b.y - b.r >= brick.y) ||
            (b.y + b.r >= brick.y && b.y + b.r <= brick.y + br.blockHeight))
        ) {
          b.vy = -b.vy;
          brick.status = 0;
        }

        if (
          b.y > brick.y &&
          b.y < brick.y + br.blockHeight &&
          ((b.x - b.r <= brick.x + br.blockWidth && b.x - b.r >= brick.x) ||
            (b.x + b.r >= brick.x && b.x + b.r <= brick.x + br.blockWidth))
        ) {
          b.vx = -b.vx;
          brick.status = 0;
        }
      }
    }

    const remainingBricks = br.bricks.some((brick) => brick.status === 1);
    if (!remainingBricks) {
      this.showMessage("You Win!");
      this.resetBall();
    }
  }

  resetBall() {
    this.ball.x = 400;
    this.ball.y = 200;
    this.ball.vx = 0;
    this.ball.vy = 0;
    this.isGameOver = true;
  }

  showMessage(message) {
    const overlay = document.getElementById("gameOverlay");
    const messageSpan = document.getElementById("gameMessage");
    messageSpan.textContent = message;
    overlay.style.display = "flex";
  }
}
