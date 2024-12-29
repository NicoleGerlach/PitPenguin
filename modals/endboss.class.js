class Endboss extends MovableObject {
    height = 550;
    width = 550;
    x = 2500;
    y = -80;

    IMAGES_WALKING = [
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

    offset = {
        top: 45,
        left: 100,
        right: 40,
        bottom: 10
    }

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }

    // drawFrame(ctx) {
    //     ctx.beginPath();
    //     ctx.lineWidth = "5";
    //     ctx.strokeStyle = "blue";
    //     ctx.rect(this.x + 150, this.y + 115, this.width - 305, this.height -200);
    //     ctx.stroke();
    // }
}