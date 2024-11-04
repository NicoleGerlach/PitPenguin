
class Coin extends MovableObject {
    height = 50;
    width = 50;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}