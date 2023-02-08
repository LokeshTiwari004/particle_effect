export class Base {
  constructor(effect, x0, y0, color) {
    this.effect = effect;
    this.x0 = x0;
    this.y0 = y0;
    this.color = color;
    this.size = this.effect.skip + 1;
  }

  draw() {
    this.effect.context.fillStyle = this.color;
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }
}
