export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.LEFT = -1
    this.RIGHT = 1;
    this.STOP = 0
    document.getElementById("run").addEventListener("click", () => {
      this.run();
    });

    document.getElementById("reload").addEventListener("click", () => {
      location.reload();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.game.paddle.direction = this.LEFT;
      if (e.key === "ArrowRight") this.game.paddle.direction = this.RIGHT;
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight")
        this.game.paddle.direction = this.STOP;
    });
  }

  run() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.game.isGameOver) {
          clearInterval(this.interval);
          this.interval = null;
          return;
        }
        this.game.step();
        this.view.draw();
      }, 10);
    }
  }
}
