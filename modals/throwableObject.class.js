class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/Poison/Animada/1.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw(100, 150);
    }


    throw() {
        this.speedY = 30
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}