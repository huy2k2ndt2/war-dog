export class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById("boom");
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + 0.5;
    this.width = this.sizeModifier * this.spriteWidth;
    this.height = this.sizeModifier * this.spriteHeight;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrameX = 4;
    this.markForDeletion = false;
    this.timer = 0;
    this.fps = Math.random() * 20 + 10;
    this.timeInterval = 1000 / this.fps;
  }
  update() {
    this.x -= this.game.speed;
    if (this.frameX > this.maxFrameX) this.markForDeletion = true;
  }
  draw(ctx, deltaTime) {
    if (this.timer > this.timeInterval) {
      this.timer = 0;
      ++this.frameX;
    } else this.timer += deltaTime;
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
