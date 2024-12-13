import Ball from "./components/Ball.js";
import Game from "./components/Game.js";
import Table from "./components/Table.js";
import Controller from "./components/Controller.js";
import View from "./layout/View.js";

document.addEventListener("DOMContentLoaded", () => {
  const ball = new Ball(400, 300, 2, -3, 7);
  const table = new Table(0, 0, 800, 400);
  const game = new Game(table, ball);
  const view = new View(game);
  const controller = new Controller(game, view);
  view.draw();
});
