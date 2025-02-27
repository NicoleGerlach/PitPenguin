
class StatusBarPoison extends DrawableObject {
    x = 510;
    y = 0;
    height = 50;
    width = 190;
    IMAGES = [
        'img/StatusBarBottle/0_.png',
        'img/StatusBarBottle/20_.png',
        'img/StatusBarBottle/40_.png',
        'img/StatusBarBottle/60_.png',
        'img/StatusBarBottle/80_.png',
        'img/StatusBarBottle/100_.png'
    ]

    percentage = 0;

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