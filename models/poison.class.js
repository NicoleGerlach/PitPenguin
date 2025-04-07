
class Poison extends MovableObject {
    height = 80;
    width = 60;

    offset = {
        top: 20,
        left: 50,
        right: 20,
        bottom: 0
    }

    constructor(imagePath, x, y, id) {
        super();
        this.loadImage(imagePath);
        this.x = x
        this.y = y;
        this.id = id;
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}