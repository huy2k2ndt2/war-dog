class Layer {
  constructor(game, width, height, speeModifier, image) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.image = image;
    this.speeModifier = speeModifier;
    this.width = width;
    this.height = height;
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speeModifier;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y);
    ctx.drawImage(this.image, this.x + this.width, this.y);
  }
}

export default class BackGround {
  constructor(game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1 = document.getElementById("bg1");
    this.layer2 = document.getElementById("bg2");
    this.layer3 = document.getElementById("bg3");
    this.layer4 = document.getElementById("bg4");
    this.layer5 = document.getElementById("bg5");
    this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layer1);
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      1.2,
      this.layer2
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      1.4,
      this.layer3
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      1.6,
      this.layer4
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1.8,
      this.layer5
    );
    this.layers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }

  update() {
    this.layers.forEach((layer) => layer.update());
  }
  draw(ctx) {
    this.layers.forEach((layer) => layer.draw(ctx));
  }
}
