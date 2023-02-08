export default class Particle {
    constructor(effect, x0, y0, color) {
        this.effect = effect;
        this.RXR = this.effect.mouse.RXR

        this.x0 = x0
        this.y0 = y0
        this.x = Math.random() * effect.width
        this.y = Math.random() * effect.height

        this.vx = 0
        this.vy = 0
        this.dx = 0
        this.dy = 0
        this.rxr = 0
        this.angle = 0
        this.acc = 0
        this.drag = 0.95
        
        this.color = color
        this.size = this.effect.skip + 1;
        this.ease = 0.05
    }
    
    draw() {
        this.effect.context.fillStyle = this.color;
        this.effect.context.fillRect(this.x, this.y, this.size, this.size);
    }
    
    update() {
        this.dx = this.effect.mouse.x - this.x
        this.dy = this.effect.mouse.y - this.y
        this.rxr = this.dx * this.dx + this.dy * this.dy
        
        this.vx *= this.drag
        this.vy *= this.drag
        this.x += this.vx + (this.x0 - this.x) * this.ease
        this.y += this.vy + (this.y0 - this.y) * this.ease
        
        if (this.rxr < this.RXR && this.rxr) {
            this.acc = - Math.log10(this.RXR / this.rxr)
            this.angle = Math.atan2(this.dy, this.dx)
            this.vx += this.acc * Math.cos(this.angle)
            this.vy += this.acc * Math.sin(this.angle)
        }
    }

    warp() {
        this.x = Math.random() * this.effect.width
        this.y = Math.random() * this.effect.height
        this.vx = 0
        this.vy = 0
        this.dx = 0
        this.dy = 0
        this.rxr = 0
        this.angle = 0
        this.acc = 0
    }
}