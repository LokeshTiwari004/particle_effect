import Particle from "./particles.js";

export default class Effect {
    constructor(width, height, effectArea) {        
        this.width = width;
        this.height = height;
        
        this.effectArea = effectArea;

        this.particleArray;
        this.skip = 1
    }

    init(context) {
        const height = this.effectArea.height;
        const width = this.effectArea.width;
        const topLeftX = this.effectArea.topLeftX;
        const topLeftY = this.effectArea.topLeftY;

        const imageData = context.getImageData(
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
                    `rgb(${red},${green},${blue})`,
                    // [red, green , blue, alpha],
                ))
            }
        }
        this.particleArray = pixels
    }

    draw(context) {
        this.particleArray.forEach(particle => particle.draw(context));
    }

    update() {
        this.particleArray.forEach(particle => particle.update());
    }
    
    warp(button) {
        button.addEventListener('click', () => {
            this.particleArray.forEach(particle => particle.warp())
        })
    }

    clearCanvas(context) {
        context.clearRect(
            0,
            0,
            this.width,
            this.height
        ) // clears whole canvas
    }

    // animate = (context) => {
    //     this.clearCanvas(context);
    //     this.draw(context);
    //     this.update();
    //     requestAnimationFrame(() => this.animate(context))
    // }

    animate = (context) => {
        this.clearCanvas(context);
        this.particleArray.forEach(particle => {
            particle.draw(context);
            particle.update();
        })
        requestAnimationFrame(() => this.animate(context))
    }
}