class StatusBarCoin extends DrawableObject {
    x = 20;
    y = 40;
    height = 50;
    width = 190;
    IMAGES = [
        'assets/img/StatusBarCoin/0_ _1.png',
        'assets/img/StatusBarCoin/20_ .png',
        'assets/img/StatusBarCoin/40_ _1.png',
        'assets/img/StatusBarCoin/60_ _1.png',
        'assets/img/StatusBarCoin/80_ _1.png',
        'assets/img/StatusBarCoin/100__1.png'
    ]

    percentage = 20;

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