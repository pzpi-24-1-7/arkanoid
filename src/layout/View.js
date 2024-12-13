export default class View {
  constructor(game) {
    this.game = game;
    const canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
  }

  draw() {
    this.clearCanvas();
    this.drawTable();
    this.drawBall(this.game.ball);
    this.drawPaddle(this.game.paddle);
    this.drawBricks(this.game.bricks);
  }

  clearCanvas() {
    const canvas = document.getElementById("canvas");
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawTable() {
    const image = document.getElementById("bg");
    const t = this.game.table;
    this.ctx.fillStyle = "grey";
    this.ctx.drawImage(image, t.x, t.y, t.w, t.h);
  }

  drawBall(ball) {
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(
      this.game.table.x + ball.x,
      this.game.table.y + ball.y,
      ball.r,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }

  drawPaddle(paddle) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  }

  drawBricks(bricks) {
    const image = document.getElementById("brick");
    for (const brick of bricks.bricks) {
      if (brick.status === 1) {
        this.ctx.drawImage(
          image,
          brick.x,
          brick.y,
          bricks.blockWidth,
          bricks.blockHeight
        );
      }
    }
  }
}
