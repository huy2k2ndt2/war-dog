class Enemy {
  constructor(game) {
    this.game = game;
    this.frameX = 0;
    this.frameY = 0;
    this.frameTimer = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.markForDeletion = false;
  }
  update() {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.x < -this.width) this.markForDeletion = true;
  }
  draw(ctx, deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrameX) ++this.frameX;
      else this.frameX = 0;
    } else this.frameTimer += deltaTime;

    if (this.game.debug)
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class FlyEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById("enemy_fly");
    this.width = 60;
    this.height = 44;
    this.x = this.game.gameWidth + Math.random() * this.game.gameWidth * 0.5;
    this.y = Math.random() * this.game.gameHeight * 0.5;
    this.speedX = Math.random() + 1 + 0.1;
    this.maxFrameX = 5;
    this.speedY = 0;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.speedY = Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById("enemy_plant");
    this.width = 60;
    this.height = 87;
    this.x = this.game.gameWidth;
    this.y = this.game.gameHeight - this.height - this.game.groundMargin;
    this.speedX = 0;
    this.maxFrameX = 1;
    this.speedY = 0;
  }
}

export class ClibingEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = document.getElementById("enemy_spider_big");
    this.width = 120;
    this.height = 144;
    this.x = this.game.gameWidth + this.width;
    this.y = Math.random() * (this.game.gameHeight * 0.5);
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrameX = 5;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.y < -this.height) this.markForDeletion = true;
    else if (
      this.y >
      this.game.gameHeight - this.height - this.game.groundMargin
    )
      this.speedY *= -1;
  }
  draw(ctx, deltaTime) {
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, 0);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2 + 20);
    ctx.closePath();
    ctx.stroke();
    super.draw(ctx, deltaTime);
  }
}
