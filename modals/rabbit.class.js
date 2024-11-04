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

    constructor() {
        super().loadImage('img/Rabbit/Monster5/Moving/Moving_00.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.moveLeft();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 60);
    }
}