class Penguin extends MovableObject {
    height = 300;
    width = 400;
    y = 20;
    speed = 5;
    IMAGES_WALKING = [
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_00.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_02.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_04.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_06.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_08.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_10.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_12.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_14.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_16.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_18.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_20.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_22.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_24.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_26.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_28.png',
        'img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_29.png',
    ];

    IMAGES_JUMPING = [
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_00.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_02.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_04.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_06.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_08.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_10.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_12.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_14.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_16.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_18.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_20.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_22.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_24.png'
    ];

    walking_sound = new Audio('audio/walking.mp3');
    // jumping_sound = new Audio('audio/jump02.mp3');
    world;

    constructor() {
        super().loadImage('img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_00.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > this.world.level.level_start_x) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            if (this.world.keyboard.UP || this.speedY > 0) {
                this.speedY = 20;
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    jump() {
    }
}