
class Penguin extends MovableObject {
    height = 300;
    width = 400;
    y = 130;
    x = 0;
    speed = 5;
    inactivityTimer; // Timer für Inaktivität
    isSleeping = false; // Standardmäßig nicht schlafen

    IMAGES_WALKING = [
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_00.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_02.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_04.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_06.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_08.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_10.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_12.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_14.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_16.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_18.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_20.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_22.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_24.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_26.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_28.png',
        'assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_29.png',
    ];
    IMAGES_JUMPING = [
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_00.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_01.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_02.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_03.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_04.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_05.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_06.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_07.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_08.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_09.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_10.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_11.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_12.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_13.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_14.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_15.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_16.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_17.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_18.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_19.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_20.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_21.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_22.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_23.png',
        'assets/img/Penguin/Character09/Jump/AllCharacters-Character09-Jump_24.png'
    ];
    IMAGES_HURT = [
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_00.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_02.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_04.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_06.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_08.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_10.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_12.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_14.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_16.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_18.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_20.png',
        'assets/img/Penguin/Character09/Confused/All Characters-Character09-Confused_22.png'
    ]
    IMAGES_DEAD = [
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_00.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_02.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_04.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_06.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_08.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_10.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_12.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_14.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_16.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_18.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_20.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_22.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_24.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_26.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_28.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_30.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_32.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_34.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_36.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_38.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_40.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_42.png',
        'assets/img/Penguin/Character09/Dead/AllCharacters-Character09-Dead_44.png'
    ];
    IMAGES_IDLE = [
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_00.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_01.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_02.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_03.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_04.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_05.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_06.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_07.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_08.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_09.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_10.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_11.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_12.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_13.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_14.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_15.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_16.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_17.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_18.png',
        'assets/img/Penguin/Character09/Idle/AllCharacters-Character09-Idle_19.png'
    ];

    IMAGES_SLEEP = [
        'assets/img/Penguin/Character09/Sleeping/AllCharacters-Character09-Sleep_00.png'
    ];

    world;

    offset = {
        top: 50,
        left: 160,
        right: 130,
        bottom: 20
    }

    constructor() {
        super().loadImage('assets/img/Penguin/Character09/Walk/AllCharacters-Character09-Walk_00.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    animate() {
        let movementPenguin = setInterval(() => {
            this.movePenguin();
        }, 1000 / 60);
        gameIntervals.push(movementPenguin);
        let animationPenguinInterval = setInterval(() => {
            this.animatePenguin();
        }, 50);
        gameIntervals.push(animationPenguinInterval);
    }

    movePenguin() {
        this.checkPlayWalkingSound();
        if (this.canMoveRight())
            this.penguinMoveRight();
        if (this.canMoveLeft())
            this.penguinMoveLeft();
        if (this.canJump())
            this.penguinJump();
        this.world.camera_x = -this.x + 50;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    penguinMoveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.resetInactivityTimer();
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > this.world.level.level_start_x;
    }

    penguinMoveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.resetInactivityTimer();
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    penguinJump() {
        super.jump();
        gameSounds.playJumpingPenguinSound();
        this.resetInactivityTimer();
    }

    checkPlayWalkingSound() {
        if (this.isAboveGround()) {
            gameSounds.stopWalkingPenguinSound();
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                gameSounds.playWalkingPenguinSound();
            } else {
                gameSounds.stopWalkingPenguinSound();
            }
        }
    }

    animatePenguin() {
        let hasCollidedWithEnemy = false;
        if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.SPACE && !this.world.keyboard.D) {
            if (!this.isSleeping) {
                this.playAnimation(this.IMAGES_IDLE);
                if (!this.inactivityTimer) {
                    this.startInactivityTimer();
                }
            }
        } else {
            this.resetInactivityTimer();
            if (this.isDead()) {
                this.playDeadAnimation(false);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!hasCollidedWithEnemy) {
                    gameSounds.playHurtPenguinSound();
                    hasCollidedWithEnemy = true;
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
        }
    }

    startInactivityTimer() {
        clearTimeout(this.inactivityTimer); // Stoppe einen eventuell laufenden Timer
        this.inactivityTimer = setTimeout(() => {
            if (!isGameActive) return;
            this.loadImage(this.IMAGES_SLEEP);
            gameSounds.playSnoringPenguinSound();
            this.isSleeping = true; // Setze den Status auf schlafen    
        }, 8000); // Dauer in Millisekunden (z.B. 5000 für 5 Sekunden)
    }

    resetInactivityTimer() {
        if (!isGameActive) return;
        clearTimeout(this.inactivityTimer); // Stoppe den aktuellen Timer   
        if (this.isSleeping) {
            this.isSleeping = false; // Setze den Status auf nicht schlafen
            gameSounds.stopSnoringPenguinSound();
        }
        this.startInactivityTimer(); // Starte den Timer erneut
    }

    checkPenguinHealth() {
        if (this.penguin.energy <= 0 && !this.penguin.isDead) {
            this.penguin.isDead = true; // Setze isDead auf true
            this.penguin.playDeadAnimation(); // Spiele die Todesanimation des Pinguins
        }
    }

    playDeadAnimation() {
        let deadAnimationPenguinInterval = setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
            }
        }, 2500 / 60);
        setTimeout(() => { stopGame(); }, 200);
        gameIntervals.push(deadAnimationPenguinInterval);
        setTimeout(() => {
            showEndScreen(false); // Zeige den Verlustbildschirm
            gameSounds.playLoseSound();
        }, 600);
    }

    
    // drawFrame(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = "5";
    //     ctx.strokeStyle = "red";
    //     ctx.rect(this.x + 140, this.y + 105, this.width - 290, this.height - 150);
    //     ctx.stroke();
    // }
}