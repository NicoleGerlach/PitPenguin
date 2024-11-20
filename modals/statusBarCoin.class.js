class StatusBarCoin extends DrawableObject {
    x = 265;
    y = 0;
    height = 50;
    width = 190;
    IMAGES = [
        'img/StatusBarCoin/0_ _1.png',
        'img/StatusBarCoin/20_ .png',
        'img/StatusBarCoin/40_ _1.png',
        'img/StatusBarCoin/60_ _1.png',
        'img/StatusBarCoin/80_ _1.png',
        'img/StatusBarCoin/100__1.png'
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
    
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}