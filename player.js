import {
  Stting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from "./state.js";

import { CollisionAnimation } from "./collisionAnimation.js";
import FloatingMessage from "./floatingMessage.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.states = [
      new Stting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ];
    this.currentState = this.states[0];
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.gameHeight - this.height - this.game.groundMargin;
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 5;
    this.maxFrameX = 4;
    this.speed = 0;
    this.maxSpeed = 5;
    this.vy = 0;
    this.weight = 0.5;
    this.fps = 10;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.lives = 10;
  }

  update(input) {
    this.checkCollision();
    this.currentState.hanldeInput(input);
    this.x += this.speed;
    if (this.currentState.state !== "HIT") {
      if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
      else if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
      else this.speed = 0;
    } else this.speed = 0;
    if (this.x <= 0) this.x = 0;
    else if (this.x >= this.game.gameWidth - this.width)
      this.x = this.game.gameWidth - this.width;
    this.y += this.vy;

    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    if (this.y > this.game.gameHeight - this.height - this.game.groundMargin)
      this.y = this.game.gameHeight - this.height - this.game.groundMargin;
  }

  onGround() {
    return (
      this.y >= this.game.gameHeight - this.height - this.game.groundMargin
    );
  }
  draw(ctx, deltalTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrameX) ++this.frameX;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else this.frameTimer += deltalTime;
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

  setState(state, speed) {
    this.currentState = this.states[state];
    this.currentState.enter();
    this.game.speed = this.game.maxSpeed * speed;
  }

  checkCollision() {
    this.game.enmenies.forEach((enemy) => {
      if (
        enemy.x + enemy.width > this.x &&
        enemy.x < this.x + this.width &&
        enemy.y + enemy.height > this.y &&
        enemy.y < this.y + this.height
      ) {
        if (
          this.currentState.state === "ROLLING" ||
          this.currentState.state === "DIVING"
        ) {
          ++this.game.score;
          console.log(this.game.floatingMessages);
          this.game.floatingMessages.push(
            new FloatingMessage("+1", enemy.x, enemy.y, 0, 0)
          );
        } else {
          this.setState(6, 0);
          --this.game.score;
          --this.lives;
          if (this.lives <= 0) this.game.gameOver = true;
          this.game.collisions.push(
            new CollisionAnimation(
              this.game,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );
        }
        enemy.markForDeletion = true;
      }
    });
  }
}
