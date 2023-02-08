# particle_effect
https://user-images.githubusercontent.com/85821171/216156678-6af95a1d-d190-4939-8854-88b87f69cfed.mp4

## How to Use
### html file
```html
    <canvas id="canvas1"></canvas>
    <div class="controls"></div>

    <script type="module" src="script.js"></script>
```
---
### javascript file -- script.js
```javascript
// copy the utils folder into your project and then import the Effect
import Effect from "./utils/effect.js";

// Catch the canvas element and set the desirable height and width
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// created a container div tag in html file for adding controls i.e. buttons for various actions
// catch that container in our script.js file 
const container = document.querySelector(".controls")


const effect = new Effect(canvas, container);

let img = new Image();
img.onload = function () {
  // drawing the image on the canvas 
  effect.drawImage(this);
  // initialize particle system
  effect.init();
  // adding the wrap button
  effect.warp();
  // setting the recorder and starting the recording by providing argument as 1 
  effect.recorder(1);
  // starting the animation loop
  effect.animate();
}

img.src = "url/imageName.ext"
```
