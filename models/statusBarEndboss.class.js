
class StatusBarEndboss extends DrawableObject {
    x = 300;
    y = 0;
    height = 50;
    width = 50;
    IMAGES_HEART = [
        'img/Enemy/heartEndboss.png',
        'img/Enemy/heartEndboss.png',
        'img/Enemy/heartEndboss.png',
        'img/Enemy/heartEndboss.png'
    ];
    IMAGE_BROKENHEART = 'img/Enemy/heartEndbossLost.png';
    heartStatus = [true, true, true, true];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEART);
        this.loadImages([this.IMAGE_BROKENHEART]);
    }

    draw(ctx) {
        for (let i = 0; i < this.heartStatus.length; i++) {
            if (this.heartStatus[i]) {
                // Zeichne das Herz
                ctx.drawImage(this.imageCache[this.IMAGES_HEART[i]], this.x + (i * 40), this.y, this.width, this.height);
            } else {
                // Zeichne das defekte Herz
                ctx.drawImage(this.imageCache[this.IMAGE_BROKENHEART], this.x + (i * 40), this.y, this.width, this.height);
            }
        }
    }

    updateHearts() {
        for (let i = 0; i < this.heartStatus.length; i++) {
            if (this.heartStatus[i]) {
                this.heartStatus[i] = false; // Setze das Herz auf tot
                break; // Beende die Schleife nach dem ersten Treffer
            }
        }
    }
}