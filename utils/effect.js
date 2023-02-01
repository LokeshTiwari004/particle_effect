import Particle from "./particles.js";

export default class Effect {
    constructor(context, canvas, imgInfo) {
        this.context = context        
        this.width = canvas.width;
        this.height = canvas.height;
        this.imgInfo = imgInfo;

        this.particleArray;
        this.skip = 1
        this.mouse = {
            RXR: 6400,
            x: undefined,
            y: undefined
        }
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.x
            this.mouse.y = e.y
        })
    }

    init() {
        const height = this.imgInfo.height;
        const width = this.imgInfo.width;
        const topLeftX = this.imgInfo.topLeftX;
        const topLeftY = this.imgInfo.topLeftY;

        const imageData = this.context.getImageData(
            topLeftX,
            topLeftY,
            width,
            height
        )
        
        const skip = this.skip + 1
        const pixels = []
        for (let r = 0; r < height; r+= skip) {
            for (let c = 0; c < width; c+= skip) {
                const index = 4 * (c + r * width);
                const alpha = imageData.data[index + 3]
                if (alpha < 32) {
                    continue;
                }

                const red = imageData.data[index]
                const green = imageData.data[index + 1]
                const blue = imageData.data[index + 2]

                const x0 = topLeftX + c
                const y0 = topLeftY + r

                pixels.push(new Particle(
                    this,
                    x0,
                    y0,
                    `rgb(${red},${green},${blue})`
                ))
            }
        }
        this.particleArray = pixels
    }

    draw() {
        this.particleArray.forEach(particle => particle.draw());
    }

    update() {
        this.particleArray.forEach(particle => particle.update());
    }
    
    warp(button) {
        button.addEventListener('click', () => {
            this.particleArray.forEach(particle => particle.warp())
        })
    }

    clearCanvas() {
        this.context.clearRect(
            0,
            0,
            this.width,
            this.height
        )
    }

    animate = () => {
        this.clearCanvas();
        this.particleArray.forEach(particle => {
            particle.draw()
            particle.update()
        })
        requestAnimationFrame(() => this.animate())
    }
}