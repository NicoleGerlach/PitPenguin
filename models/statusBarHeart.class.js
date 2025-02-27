
class StatusBarHeart extends DrawableObject {
    x = 20;
    y = 0;
    height = 50;
    width = 190;
    IMAGES = [
        'img/StatusBarHeart/0_ .png',
        'img/StatusBarHeart/20__1.png',
        'img/StatusBarHeart/40_ .png',
        'img/StatusBarHeart/60_ .png',
        'img/StatusBarHeart/80_ .png',
        'img/StatusBarHeart/100_ .png' 
    ]

    percentage = 50;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
    
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}