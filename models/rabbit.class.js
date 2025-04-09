
class Rabbit extends MovableObject {
    y = 240;
    IMAGES_WALKING = [
        'img/Rabbit/Monster5/Moving/Moving_00.png',
        'img/Rabbit/Monster5/Moving/Moving_02.png',
        'img/Rabbit/Monster5/Moving/Moving_04.png',
        'img/Rabbit/Monster5/Moving/Moving_06.png',
        'img/Rabbit/Monster5/Moving/Moving_08.png',
        'img/Rabbit/Monster5/Moving/Moving_10.png',
        'img/Rabbit/Monster5/Moving/Moving_12.png',
        'img/Rabbit/Monster5/Moving/Moving_14.png',
        'img/Rabbit/Monster5/Moving/Moving_16.png',
        'img/Rabbit/Monster5/Moving/Moving_18.png',
        'img/Rabbit/Monster5/Moving/Moving_19.png'
    ];

    offset = {
        top: 45,
        left: 60,
        right: 40,
        bottom: 10
    }

    constructor() {
        super().loadImage('img/Rabbit/Monster5/Moving/Moving_00.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.x = 400 + Math.random() * 1900;
        this.speed = 0.85 + Math.random() * 0.25;
        this.moveLeft();
    }

    animate() {
        let animateRabbits = setInterval(() => {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }, 60);
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x + 25, this.y + 45, this.width - 50, this.height - 55);
        ctx.stroke();
    }
}