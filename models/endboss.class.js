
class Endboss extends MovableObject {
    height = 550;
    width = 550;
    x = 2600;
    y = -80;
    speed = 5;
    direction = -1;
    leftBoundary = 2200;
    rightBoundary = 2650;

    IMAGES_WAITING = [
        'img/Enemy/Kicking/0_Elementals_Kicking_000.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_001.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_002.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_003.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_004.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_005.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_006.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_007.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_008.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_009.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_010.png',
        'img/Enemy/Kicking/0_Elementals_Kicking_011.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_000.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_002.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_004.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_006.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_008.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_010.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_012.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_014.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_016.png',
        'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_017.png',
    ];
    IMAGES_Walking = [
        'img/Enemy/Walking/0_Elementals_Walking_000.png',
        'img/Enemy/Walking/0_Elementals_Walking_001.png',
        'img/Enemy/Walking/0_Elementals_Walking_002.png',
        'img/Enemy/Walking/0_Elementals_Walking_003.png',
        'img/Enemy/Walking/0_Elementals_Walking_004.png',
        'img/Enemy/Walking/0_Elementals_Walking_005.png',
        'img/Enemy/Walking/0_Elementals_Walking_006.png',
        'img/Enemy/Walking/0_Elementals_Walking_007.png',
        'img/Enemy/Walking/0_Elementals_Walking_008.png',
        'img/Enemy/Walking/0_Elementals_Walking_009.png',
        'img/Enemy/Walking/0_Elementals_Walking_010.png',
        'img/Enemy/Walking/0_Elementals_Walking_011.png',
        'img/Enemy/Walking/0_Elementals_Walking_012.png',
        'img/Enemy/Walking/0_Elementals_Walking_013.png',
        'img/Enemy/Walking/0_Elementals_Walking_014.png',
        'img/Enemy/Walking/0_Elementals_Walking_015.png',
        'img/Enemy/Walking/0_Elementals_Walking_016.png',
        'img/Enemy/Walking/0_Elementals_Walking_017.png',
        'img/Enemy/Walking/0_Elementals_Walking_018.png',
        'img/Enemy/Walking/0_Elementals_Walking_019.png',
        'img/Enemy/Walking/0_Elementals_Walking_020.png',
        'img/Enemy/Walking/0_Elementals_Walking_021.png',
        'img/Enemy/Walking/0_Elementals_Walking_022.png',
        'img/Enemy/Walking/0_Elementals_Walking_023.png',
    ]

    offset = {
        top: 45,
        left: 100,
        right: 40,
        bottom: 10
    }

    constructor() {
        super().loadImage(this.IMAGES_WAITING[0]);
        this.loadImages(this.IMAGES_WAITING);
        this.loadImages(this.IMAGES_Walking);
        this.animate();
        this.walkToAndFro();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WAITING);
        }, 100);
    }

    walkToAndFro() {

        setInterval(() => {
          this.x += this.speed * this.direction;
            this.playAnimation(this.IMAGES_Walking);
          if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
            this.direction *= -1;
            this.otherDirection = this.direction === 1;
          }
        }, 1000 / 60);
      }

    // drawFrame(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = "5";
    //     ctx.strokeStyle = "blue";
    //     ctx.rect(this.x + 150, this.y + 115, this.width - 305, this.height -200);
    //     ctx.stroke();
    // }
}