class Poison extends ThrowableObject {
    height = 80;
    width = 60;
    y = 310;

    // offset = {
    //     top: 20,
    //     left: 50,
    //     right: 20,
    //     bottom: 0
    // }

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}