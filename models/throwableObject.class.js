
class ThrowableObject extends MovableObject {

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    constructor(x, y) {
        super().loadImage('img/Poison/Animada/1.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw(100, 150);
    }
    
    loadImage(path) {
        this.img = new Image();
         this.img.src = path;
    }
    
    throw() {
        this.speedY = 20
        this.applyGravity();
        setInterval(() => {
            this.x += 8;
        }, 25);
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}