class Heart extends MovableObject {
    height = 70;
    width = 70;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}