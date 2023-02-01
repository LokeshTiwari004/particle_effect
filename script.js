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
    const effect = new Effect(context, canvas, imgInfo);
    effect.init();
    effect.warp(warpButton);
    effect.animate();
}

img.src = "./images/fish.png"







// var link = document.createElement('a')
// var video = document.getElementById('test');


// var videoStream = canvas.captureStream(60);
// var mediaRecorder = new MediaRecorder(videoStream);

// var chunks = []
// mediaRecorder.ondataavailable = e => {
//     chunks.push(e.data)
// }
// mediaRecorder.onstop = () => {
//     var blob = new Blob(chunks, {'type' : 'video/mp4'});
//     chunks = []
//     var blobURL = URL.createObjectURL(blob);
//     video.src = blobURL
//     link.href = blobURL
//     link.download = "video.mp4"
// }


// const save = document.getElementById('save');
// save.addEventListener('click', () => link.click())


// var recording = 0
// function record(e) {
//     if (recording) {
//         recording = 0
//         mediaRecorder.stop()
        
//         e.target.innerHTML = 'Start Recording'
//         save.style.display = 'inline'
//     } else {
//         recording = 1
//         mediaRecorder.start()
        
//         e.target.innerHTML = 'Stop Recording'
//         save.style.display = 'none';
//     }
// }

// const toggleRecord = document.getElementById('toggleRecorder')
// toggleRecord.addEventListener('click', (e) => record(e))