import Particle from "./particles.js";
import drawImage from "./drawImage.js";
import recorder from "./recorder.js";
import warp from "./warp.js";

export default class Effect {
  constructor(canvas, controls) {
    this.controls = controls
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.imgInfo = [0, 0, this.width, this.height];

    this.particleArray;
    this.skip;
    this.mouse = {
      RXR: 8000,
      x: undefined,
      y: undefined,
    };
  }

  init(skip = 1) {
    if (skip < 0) {
      throw new Error(
        `\ value of skip argument must be non-negative. Assigned value is ${skip}\n\ arg skip: number of pixels to skip after every pixel selection in a row`
      );
    } else {
      this.skip = skip;

      window.addEventListener("mousemove", (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      });

      const [topLeftX, topLeftY, width, height] = this.imgInfo;
      const imageData = this.context.getImageData(...this.imgInfo);

      const pixels = [];
      for (let r = 0; r < height; r += skip + 1) {
        for (let c = 0; c < width; c += skip + 1) {
          const index = 4 * (c + r * width);
          const alpha = imageData.data[index + 3];
          if (alpha < 32) {
            continue;
          }

          const red = imageData.data[index];
          const green = imageData.data[index + 1];
          const blue = imageData.data[index + 2];

          const x0 = topLeftX + c;
          const y0 = topLeftY + r;

          pixels.push(
            new Particle(this, x0, y0, `rgb(${red},${green},${blue})`)
          );
        }
      }
      this.particleArray = pixels;
      // console.log(this.particleArray.length);
    }
  }

  draw() {
    this.particleArray.forEach((particle) => particle.draw());
  }

  update() {
    this.particleArray.forEach((particle) => particle.update());
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  animate = () => {
    this.clearCanvas();
    this.particleArray.forEach((particle) => {
      particle.draw();
      particle.update();
    });
    requestAnimationFrame(() => this.animate());
  };
}

Effect.prototype.drawImage = drawImage
Effect.prototype.recorder = recorder
Effect.prototype.warp = warp