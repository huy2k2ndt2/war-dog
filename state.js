import { Dust, Fire, Splash } from "./particles.js";

const states = {
  STTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Stting extends State {
  constructor(game) {
    super("STTING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrameX = 4;
  }

  hanldeInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight"))
      this.game.player.setState(states.RUNNING, 1);
    else if (input.includes("Enter"))
      this.game.player.setState(states.ROLLING, 1);
  }
}

export class Running extends State {
  constructor(game) {
    super("RUNNING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrameX = 8;
  }

  hanldeInput(input) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height
      )
    );
    if (input.includes("ArrowDown"))
      this.game.player.setState(states.STTING, 0);
    else if (input.includes("ArrowUp"))
      this.game.player.setState(states.JUMPING, 1);
    else if (input.includes("Enter"))
      this.game.player.setState(states.ROLLING, 2);
  }
}

export class Jumping extends State {
  constructor(game) {
    super("JUMPING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 1;
    if (this.game.player.onGround()) {
      this.game.player.vy -= 15;
    }
    this.game.player.maxFrameX = 6;
  }

  hanldeInput(input) {
    if (this.game.player.vy > 0) this.game.player.setState(states.FALLING, 1);
    else if (input.includes("Enter"))
      this.game.player.setState(states.ROLLING, 2);
    else if (input.includes("ArrowDown"))
      this.game.player.setState(states.DIVING, 0);
  }
}

export class Falling extends State {
  constructor(game) {
    super("FALLING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 2;
    this.game.player.maxFrameX = 6;
  }

  hanldeInput(input) {
    if (this.game.player.onGround())
      this.game.player.setState(states.RUNNING, 1);
    else if (input.includes("ArrowDown"))
      this.game.player.setState(states.DIVING, 0);
  }
}

export class Rolling extends State {
  constructor(game) {
    super("ROLLING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrameX = 6;
  }

  hanldeInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );

    if (!input.includes("Enter") && this.game.player.onGround())
      this.game.player.setState(states.RUNNING, 1);
    else if (!input.includes("Enter") && !this.game.player.onGround())
      this.game.player.setState(states.FALLING, 1);
    else if (input.includes("ArrowDown") && !this.game.player.onGround())
      this.game.player.setState(states.DIVING, 0);
    else if (
      input.includes("Enter") &&
      input.includes("ArrowUp") &&
      this.game.player.onGround()
    )
      this.game.player.vy -= 18;
  }
}

export class Diving extends State {
  constructor(game) {
    super("DIVING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrameX = 6;
    this.game.player.vy = 25;
  }

  hanldeInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (input.includes("Enter") && this.game.player.onGround())
      this.game.player.setState(states.ROLLING, 1);
    else if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
      for (let i = 0; i < 30; ++i) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height
          )
        );
      }
    }
  }
}

export class Hit extends State {
  constructor(game) {
    super("HIT", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 4;
    this.game.player.maxFrameX = 10;
  }

  hanldeInput(input) {
    if (
      this.game.player.frameX >= this.game.player.maxFrameX &&
      this.game.player.onGround()
    )
      this.game.player.setState(states.ROLLING, 1);
    else if (
      this.game.player.frameX >= this.game.player.maxFrameX &&
      !this.game.player.onGround()
    )
      this.game.player.setState(states.FALLING, 1);
  }
}
