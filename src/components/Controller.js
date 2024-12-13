export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    document.getElementById("run").addEventListener("click", () => {
      this.run();
    });

    document.getElementById("reload").addEventListener("click", () => {
      location.reload();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.game.paddle.direction = -1;
      if (e.key === "ArrowRight") this.game.paddle.direction = 1;
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight")
        this.game.paddle.direction = 0;
    });
  }

  run() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.game.isGameOver) {
          clearInterval(this.interval);
          this.interval = null;
          console.log("done");
          return;
        }
        this.game.step();
        this.view.draw();
      }, 10);
    }
  }
}
