
class ThrowableObject extends MovableObject {

    offset = {
        top: 20,
        left: 50,
        right: 20,
        bottom: 0
    }

    constructor(x, y) {
        super().loadImage('assets/img/Poison/Animada/1.png');
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