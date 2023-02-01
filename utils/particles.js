export default class Particle {
    constructor(effect, x0, y0, color) {
        this.effect = effect;

        this.x0 = x0
        this.y0 = y0

        this.x = Math.random() * effect.width
        this.y = Math.random() * effect.height

        this.vx = 0
        this.vy = 0
        
        this.color = color
        this.size0 = this.effect.skip + 1;
        this.size = this.size0 * (5 * Math.random() + 1);
        
        this.ease = 0.03 * Math.random() + 0.04
    }
    
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    
    update() {
        this.x += (this.x0 - this.x) * this.ease
        this.y += (this.y0 - this.y) * this.ease
        this.size += (this.size0 - this.size) * this.ease;
    }
    
    warp() {
        this.x = Math.random() * this.effect.width
        this.y = Math.random() * this.effect.height
        this.size = this.size0 * (7 * Math.random() + 1);
    }
}