
class Coin extends MovableObject {
    height = 50;
    width = 50;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }

        drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
} 