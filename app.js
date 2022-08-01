/**@type {HTMLCanvasElement}  */

import Player from "./player.js";
import InputHandler from "./input.js";
import BackGround from "./background.js";
import UI from "./ui.js";
import { FlyEnemy, GroundEnemy, ClibingEnemy } from "./enemies.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 500;

  class Game {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.groundMargin = 85;
      this.speed = 0;
      this.maxSpeed = 3;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.background = new BackGround(this);
      this.enmenies = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.enemmyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = "#333";
      this.gameOver = false;
      // this.player.currentState = this.player.states[0];
      // this.player.currentState.enter();
      this.particles = [];
      this.maxParticles = 50;
    }
    update(deltaTime) {
      //enemy
      if (this.enemmyTimer > this.enemyInterval) {
        this.enemmyTimer = 0;
        this.addEnemy();
      } else this.enemmyTimer += deltaTime;
      this.enmenies.forEach((enemy) => enemy.update(deltaTime));
      this.enmenies = this.enmenies.filter((enemy) => !enemy.markForDeletion);
      //bg
      this.background.update(deltaTime);
      //player
      this.player.update(this.input.keys, deltaTime);
      //particles
      if (this.particles.lenght > 50)
        this.particles = this.particles.slice(0, 50);
      this.particles.forEach((particle) => particle.update(deltaTime));
      this.particles = this.particles.filter(
        (particle) => !particle.markForDeletion
      );

      //collison
      this.collisions.forEach((collison) => collison.update(deltaTime));
      this.collisions = this.collisions.filter(
        (collison) => !collison.markForDeletion
      );

      //floatingMessages

      this.floatingMessages.forEach((floatingMessage) =>
        floatingMessage.update(deltaTime)
      );
      this.floatingMessages = this.floatingMessages.filter(
        (floatingMessage) => !floatingMessage.markForDeletion
      );
    }
    draw(ctx, deltaTime) {
      this.background.draw(ctx, deltaTime);

      this.enmenies.forEach((enemy) => enemy.draw(ctx, deltaTime));

      this.player.draw(ctx, deltaTime);
      this.ui.draw(ctx);

      this.particles.forEach((particle) => particle.draw(ctx, deltaTime));

      this.collisions.forEach((collison) => collison.draw(ctx, deltaTime));

      this.floatingMessages.forEach((floatingMessage) =>
        floatingMessage.draw(ctx, deltaTime)
      );
    }

    addEnemy() {
      const numberNandom = Math.random();
      if (this.speed && numberNandom > 0.5)
        this.enmenies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enmenies.push(new ClibingEnemy(this));
      this.enmenies.push(new FlyEnemy(this));
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx, deltaTime);
    game.update(deltaTime);
    if (!game.gameOver) requestAnimationFrame(animate);
  };
  animate(0);
});
