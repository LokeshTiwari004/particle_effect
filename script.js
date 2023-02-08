import Effect from "./utils/effect.js";

const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const container = document.querySelector(".controls")

const effect = new Effect(canvas, container);

let img = new Image();
img.onload = main;
function main() {
  effect.drawImage(this);
  effect.init();
  effect.warp();
  effect.recorder();
  effect.animate();
}

img.src = "./images/fish.png";
