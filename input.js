const keyBoards = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"];

export default class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];

    window.addEventListener("keydown", (e) => {
      if (keyBoards.includes(e.key) && this.keys.indexOf(e.key) === -1)
        this.keys.push(e.key);
      else if (e.key === "d") {
        this.game.debug = !this.game.debug;
        console.log(this.game.debug);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (keyBoards.includes(e.key))
        this.keys.splice(this.keys.indexOf(e.key), 1);
    });
  }
}
