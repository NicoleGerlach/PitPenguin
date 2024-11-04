class Poison extends MovableObject {
    height = 80;
    width = 60;
    y = 310;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x
    }
}