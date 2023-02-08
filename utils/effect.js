import Particle from "./particles.js";
import drawImage from "./drawImage.js";

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

  warp() {
    const warpButton = document.createElement('button')
    warpButton.id = 'warpButton'
    warpButton.innerHTML = "Warp"
    warpButton.addEventListener("click", () => {
      this.particleArray.forEach((particle) => particle.warp());
    });
    this.controls.appendChild(warpButton)
    return warpButton
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

  initRecording(recording = 0) {
    if (recording in [0, 1]) {
      var link = document.createElement("a");

      var videoStream = this.canvas.captureStream(60);
      var mediaRecorder = new MediaRecorder(videoStream);

      var chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        var blob = new Blob(chunks, { type: "video/mp4" });
        chunks = [];
        var blobURL = URL.createObjectURL(blob);
        link.href = blobURL;
        link.download = "video.mp4";
      };

      const save = document.createElement("button");
      save.id = "save";
      save.style.display = "none";
      save.innerHTML = "Save";
      save.addEventListener("click", () => {
        link.click();
        save.style.display = "none";
      });

      function toggleRecord(e) {
        if (recording) {
          recording = 0;
          mediaRecorder.stop();

          e.target.innerHTML = "Start Recording";
          save.style.display = "inline";
        } else {
          recording = 1;
          mediaRecorder.start();

          e.target.innerHTML = "Stop Recording";
          save.style.display = "none";
        }
      }

      const toggleRecorder = document.createElement("button");
      toggleRecorder.id = "toggleRecorder";
      toggleRecorder.innerHTML = recording
        ? "Stop Recording"
        : "Start Recording";
      toggleRecorder.addEventListener("click", (e) => toggleRecord(e));

      this.controls.appendChild(toggleRecorder);
      this.controls.appendChild(save);

      recording ? mediaRecorder.start() : undefined;
    } else {
      throw new Error(
        `recording argument has only two acceptable values\n\ 0 (default): sets recorder \n\ 1: sets recorder and starts recording \n\ Assigned value is ${recording}`
      );
    }
  }
}

Effect.prototype.drawImage = drawImage