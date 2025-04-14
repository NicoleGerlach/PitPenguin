class Heart extends MovableObject {
    height = 45;
    width = 55;

    offset = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    }

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }

    //     drawFrame(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = "5";
    //     ctx.rect(this.x, this.y, this.width, this.height);
    //     ctx.stroke();
    // }
}