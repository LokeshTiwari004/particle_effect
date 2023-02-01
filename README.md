# particle_effect
https://user-images.githubusercontent.com/85821171/216156678-6af95a1d-d190-4939-8854-88b87f69cfed.mp4

## How to Use
```html
    <canvas id="canvas1"></canvas>

    <div class="controls">
        <button id="warpButton">Warp</button>
    </div>

    <script type="module" src="script.js"></script>
```
---
```javascript
// copy the utils folder into your project and
// then import the following
import drawImage from "./utils/drawImage.js";
import Effect from "./utils/effect.js";


// Catch the canvas element and set the deirable height and width
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

// you can leave this button part and the effect.warp(warpButton) in the main function
// this button is mainly to randomise the particles anytime we want
const warpButton = document.getElementById('warpButton')

let img = new Image();
img.onload = main;
function main() {
    // drawing the image on the canvas 
    const imgInfo = drawImage(this, canvas, context);
    
    // declaring and initialising the effct 
    const effect = new Effect(context, canvas, imgInfo);
    effect.init();
    
    effect.warp(warpButton);
    
    // this part is to set the recording feature
    // the fisrt argument asks for the html container for the controls
    // setting the second argument to 1 starts recording automatically at the beggining 
    // setting the second argument to 0 ( also defalut value ) asks for recording
    effect.initRecording(document.querySelector('.controls'), 1)
    
    // starting the rendering loop
    effect.animate();
}

img.src = "url/image.ext"
```
