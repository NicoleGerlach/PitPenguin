
class Endboss extends MovableObject {
  height = 550;
  width = 550;
  x = 2600;
  y = -80;
  speed = 5;
  direction = -1;
  leftBoundary = 2200;
  rightBoundary = 2650;

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
    'img/Enemy/Walking/0_Elementals_Walking_023.png'
  ];
  IMAGES_HURT = [
    'img/Enemy/Hurt/0_Elementals_Hurt_000.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_001.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_002.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_003.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_004.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_005.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_006.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_007.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_008.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_009.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_010.png',
    'img/Enemy/Hurt/0_Elementals_Hurt_011.png'
  ];
  IMAGES_DEAD = [
    'img/Enemy/Dying/0_Elementals_Dying_000.png',
    'img/Enemy/Dying/0_Elementals_Dying_001.png',
    'img/Enemy/Dying/0_Elementals_Dying_002.png',
    'img/Enemy/Dying/0_Elementals_Dying_003.png',
    'img/Enemy/Dying/0_Elementals_Dying_004.png',
    'img/Enemy/Dying/0_Elementals_Dying_005.png',
    'img/Enemy/Dying/0_Elementals_Dying_006.png',
    'img/Enemy/Dying/0_Elementals_Dying_007.png',
    'img/Enemy/Dying/0_Elementals_Dying_008.png',
    'img/Enemy/Dying/0_Elementals_Dying_009.png',
    'img/Enemy/Dying/0_Elementals_Dying_010.png',
    'img/Enemy/Dying/0_Elementals_Dying_011.png',
    'img/Enemy/Dying/0_Elementals_Dying_012.png',
    'img/Enemy/Dying/0_Elementals_Dying_013.png',
    'img/Enemy/Dying/0_Elementals_Dying_014.png',
  ];
  // IMAGES_KICKING = [
  //   'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_014.png',
  //   'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_015.png',
  //   'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_016.png',
  //   'img/Enemy/Idle Blinking/0_Elementals_Idle Blinking_017.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_000.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_001.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_002.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_003.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_004.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_005.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_006.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_007.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_008.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_009.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_010.png',
  //   'img/Enemy/Kicking/0_Elementals_Kicking_011.png',
  // ]

  offset = {
    top: 45,
    left: 120,
    right: 300,
    bottom: 10
  }

  constructor() {
    super().loadImage('img/Enemy/Walking/0_Elementals_Walking_000.png');
    this.loadImages(this.IMAGES_Walking);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    // this.loadImages(this.IMAGES_KICKING);
    this.endbossIsHurt = false;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x += this.speed * this.direction;
      if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
        this.direction *= -1;
        this.otherDirection = this.direction === 1;
      }
      if (this.endbossIsDead) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.endbossIsHurt) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_Walking);
        // this.playAnimation(this.IMAGES_KICKING);
      }
    }, 2000 / 60);
  }

  hit() {
    if (!this.endbossIsHurt && !this.endbossIsDead) { // Nur verletzen, wenn nicht bereits verletzt oder tot
        console.log('Endboss wurde vom Gift getroffen!');
        this.endbossIsHurt = true; // Setze den Zustand auf verletzt
      this.speed = 0;
        setTimeout(() => { 
            this.endbossIsHurt = false; // Nach einer bestimmten Zeit zurücksetzen
            this.speed = 5;
        }, 800); // Dauer der Verletzungsanimation anpassen (z.B. 1000 ms)

        // Hier kannst du auch Lebenspunkte abziehen:
        // this.energy -= 25; 
    }
}

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x + 150, this.y + 115, this.width - 305, this.height - 200);
    ctx.stroke();
  }
}