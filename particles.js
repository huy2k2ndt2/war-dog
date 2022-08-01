class Particle {
  constructor(game) {
    this.game = game;
    this.markForDeletion = false;
  }
  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markForDeletion = true;
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.size = Math.random() * 5 + 10;
    this.color = "black";
    this.timer = 0;
  }
  draw(ctx, deltaTime) {
    ctx.save();
    this.timer += 0.3 + deltaTime;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.timer}, 100%, 50%)`;
    ctx.fill();
    ctx.restore();
  }
}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.size = Math.random() * 100 + 50;
    this.color = "black";
    this.image = document.getElementById("fire");
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }
  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle) * 5;
  }
  draw(ctx, deltaTime) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      0 - this.size * 0.5,
      0 - this.size * 0.5,
      this.size,
      this.size
    );
    ctx.restore();
  }
}

export class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 2 + 2;
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.3;
    this.y = y - this.size * 0.5;
    this.image = document.getElementById("fire");
    this.gravity = 0;
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  draw(ctx, deltaTime) {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}
