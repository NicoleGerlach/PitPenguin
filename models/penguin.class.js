
class Penguin extends MovableObject {
    height = 300;
    width = 400;
    y = 130;
    x = 2000;
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
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_01.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_02.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_03.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_04.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_05.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_06.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_07.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_08.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_09.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_10.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_11.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_12.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_13.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_14.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_15.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_16.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_17.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_18.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_19.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_20.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_21.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_22.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_23.png',
        'img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_24.png'
    ];
    IMAGES_HURT = [
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_00.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_02.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_04.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_06.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_08.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_10.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_12.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_14.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_16.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_18.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_20.png',
        'img/Penguin/Character09/Confused/All Characters-Character09-Confused_22.png'
    ]
    IMAGES_DEAD = [
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_00.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_02.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_04.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_06.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_08.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_10.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_12.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_14.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_16.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_18.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_20.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_22.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_24.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_26.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_28.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_30.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_32.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_34.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_36.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_38.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_40.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_42.png',
        'img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_44.png'
    ];

    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio ('audio/ouch.mp3');
    world;

    offset = {
        top: 50,
        left: 160,
        right: 130,
        bottom: 20
    }

    constructor() {
        super().loadImage('img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_00.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {
        let movementPenguin = setInterval(() => {
            if (this.isAboveGround()) {
                this.walking_sound.pause();
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.walking_sound.play();
                } else {
                    this.walking_sound.pause();
                }
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > this.world.level.level_start_x) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);
        gameIntervals.push(movementPenguin);
        console.log('Id von movementintervall penguin ist:', movementPenguin);
    
        let hasCollidedWithEnemy = false; // Flag für Kollision mit Feind
        let animationPenguinInterval = setInterval(() => {
            if (this.isDead()) {
                // this.playAnimation(this.IMAGES_DEAD);
                this.playDeadAnimation();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!hasCollidedWithEnemy) {
                    this.hurt_sound.play(); // Spiele den Sound ab
                    hasCollidedWithEnemy = true; // Setze die Flag auf true
                }
            } else {
                hasCollidedWithEnemy = false;
                if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                } else { 
                    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                }
            }
        }, 50);
        gameIntervals.push(animationPenguinInterval);
        console.log('Id von animationintervall penguin 2 ist:', animationPenguinInterval);
    }

    playDeadAnimation() {
        let deadAnimationPenguinInterval = setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
            }
        }, 2500 / 60);
        setTimeout(() => {
            stopGame();
        }, 200);
        gameIntervals.push(deadAnimationPenguinInterval);
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "red";
        ctx.rect(this.x + 140, this.y + 105, this.width - 290, this.height - 150);
        ctx.stroke();
    }
}