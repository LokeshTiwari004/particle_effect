import drawImage from "./utils/drawImage.js";
import Effect from "./utils/effect.js";


const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

const warpButton = document.getElementById('warpButton')

let img = new Image();
img.onload = main;
function main() {
    const imgInfo = drawImage(this, canvas, context);
    const effect = new Effect(canvas.width, canvas.height, imgInfo);
    effect.init(context);
    effect.warp(warpButton);
    effect.animate(context);
}

img.src = "./images/fish.png"