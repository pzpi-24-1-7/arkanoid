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
    this.score = 0;
    this.updateScore();
  }

  step() {
    if (this.isGameOver) return;

    this.ballMove();
    this.wallCollision();
    this.paddleCollision();
    this.brickCollision();
    this.paddle.move(this.table.w);
    this.gameOver();
    this.victory();
  }

  ballMove() {
    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;
  }

  wallCollision() {
    const b = this.ball;
    if (b.x - b.r <= 0 || b.x + b.r >= this.table.w) b.vx = -b.vx;
    if (b.y - b.r <= 0) b.vy = -b.vy;
  }

  paddleCollision() {
    const b = this.ball;
    const p = this.paddle;

    if (b.x > p.x && b.x < p.x + p.width && b.y + b.r >= p.y) {
      if (
        (b.x - b.r <= p.x && b.vx > 0) ||
        (b.x + b.r >= p.x + p.width && b.vx < 0)
      ) {
        b.vx = -b.vx;
      }
      b.vy = -b.vy;
    }
  }

  brickCollision() {
    const b = this.ball;
    const br = this.bricks;

    const activeBricks = br.bricks.filter((brick) => brick.status === 1);

    activeBricks.forEach((brick) => {
      const isVerticalCollision =
        b.x > brick.x &&
        b.x < brick.x + br.blockWidth &&
        ((b.y - b.r <= brick.y + br.blockHeight && b.y - b.r >= brick.y) ||
          (b.y + b.r >= brick.y && b.y + b.r <= brick.y + br.blockHeight));

      const isHorizontalCollision =
        b.y > brick.y &&
        b.y < brick.y + br.blockHeight &&
        ((b.x - b.r <= brick.x + br.blockWidth && b.x - b.r >= brick.x) ||
          (b.x + b.r >= brick.x && b.x + b.r <= brick.x + br.blockWidth));

      if (isVerticalCollision || isHorizontalCollision) {
        if (isVerticalCollision) b.vy = -b.vy;
        if (isHorizontalCollision) b.vx = -b.vx;
        brick.status = 0;
        this.updateScore();
      }
    });
  }

  updateScore() {
    const scoreElement = document.getElementById("score");
    const remainingBricks = this.bricks.bricks.filter(
      (brick) => brick.status === 1
    ).length;
    this.score = this.bricks.bricks.length - remainingBricks;

    if (scoreElement) {
      scoreElement.textContent = `Score: ${this.score}`;
    }
  }

  victory() {
    const remainingBricks = this.bricks.bricks.some(
      (brick) => brick.status === 1
    );
    if (!remainingBricks) {
      this.showMessage("You Win!");
      this.isGameOver = true;
    }
  }

  gameOver() {
    if (this.ball.y + this.ball.r >= this.table.h) {
      this.showMessage("Game Over!");
      this.isGameOver = true;
      return;
    }
  }

  showMessage(message) {
    const overlay = document.getElementById("gameOverlay");
    const messageSpan = document.getElementById("gameMessage");
    messageSpan.textContent = message;
    overlay.style.display = "flex";
  }
}
