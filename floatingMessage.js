export default class FloaingtMessage {
  constructor(value, x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.targetX = targetX;
    this.targetY = targetY;
    this.markForDeletion = false;
    this.timer = 0;
    this.maxTime = 100;
    this.fontSize = 20;
  }
  update(deltaTime) {
    this.x += this.targetX - this.x * 0.03;
    this.y += this.targetY - this.y * 0.03;
    if (
      this.x < this.targetY + this.fontSize ||
      this.y < this.targetY + this.fontSize
    )
      this.markForDeletion = true;
    // if (this.timer > this.maxTime) this.markForDeletion = true;
    // else this.timer += deltaTime;
  }
  draw(ctx) {
    ctx.font = this.fontSize + "px Creepster";
    // ctx.fillStyle = "white";
    // ctx.fillText(this.value, this.x, this.y);
    ctx.fillStyle = "black";
    ctx.fillText(this.value, this.x + 2, this.y + 2);
  }
}
