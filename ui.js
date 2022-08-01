export default class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "monospace";
    this.lives = document.getElementById("lives");
    this.width = this.lives.width * 0.6;
    this.height = this.lives.height * 0.6;
  }
  draw(ctx) {
    ctx.font = this.fontSize + "px " + this.fontFamily;
    ctx.textAligin = "left";
    ctx.fillStyle = this.game.fontColor;
    ctx.fillText("Score: " + this.game.score, 20, 50);

    // live

    for (let i = 0; i < this.game.player.lives; ++i) {
      ctx.drawImage(
        this.lives,
        20 + this.width * i,
        60,
        this.width,
        this.height
      );
    }
  }
}
