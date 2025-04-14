
class Coin extends MovableObject {
    height = 50;
    width = 50;

    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 80
    }

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }

    //     drawFrame(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = "5";
    //     ctx.strokeStyle = "blue";
    //     ctx.rect(this.x, this.y, this.width, this.height);
    //     ctx.stroke();
    // }
} 