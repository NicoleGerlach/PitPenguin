/**
 * Represents the final boss enemy in the game.
 * Handles movement, animations, damage logic and death behavior.
 */
class Endboss extends MovableObject {
  height = 500;
  width = 500;
  x = 2600;
  y = -40;
  speed = 5;
  direction = -1;
  leftBoundary = 2200;
  rightBoundary = 2650;
  energy = 4;
  isDead = false;
  endbossIsHurt = false;
  playedDeath = false;

  offset = {
    top: 45,
    left: 120,
    right: 120,
    bottom: 10,
  };

  /**
   * Initializes the endboss with images and starts animation.
   */
  constructor() {
    super();
    this.loadImage(LOADED_IMAGES.endboss.walk[0]);
    this.addToImageCache('walk', LOADED_IMAGES.endboss.walk);
    this.addToImageCache('hurt', LOADED_IMAGES.endboss.hurt);
    this.addToImageCache('dead', LOADED_IMAGES.endboss.dead);
    this.animate();
  }

  /**
   * Controls movement and animation of the endboss.
   */
  animate() {
    let movementInterval = setInterval(() => {
      if (this.isDead) return;
      this.x += this.speed * this.direction;
      if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
        this.direction *= -1;
        this.otherDirection = this.direction === 1;
      }
      if (this.endbossIsHurt) {
        this.playAnimation(LOADED_IMAGES.endboss.hurt);
        gameSounds.playHurtEndbossSound();
      } else {
        this.playAnimation(LOADED_IMAGES.endboss.walk);
      }
    }, 2000 / 60);
    gameIntervals.push(movementInterval);
  }

  /**
   * Reduces energy and triggers hurt/death logic.
   */
  hit() {
    if (!this.isDead && !this.endbossIsHurt) {
      this.energy--;
      if (this.energy <= 0) {
        this.statusBarEndboss.updateHearts();
        this.isDead = true;
        this.playDeadAnimation();
      } else {
        this.endbossIsHurt = true;
        this.statusBarEndboss.updateHearts();
        this.speed = 0;
        setTimeout(() => {
          this.endbossIsHurt = false;
          this.speed = 5;
        }, 800);
      }
    }
  }

  /**
   * Plays the death animation and shows the win screen.
   */
  playDeadAnimation() {
    let deadAnimationInterval = setInterval(() => {
      if (this.isDead) {
        this.playAnimation(LOADED_IMAGES.endboss.dead);
        this.speed = 0;
      }
    }, 2200 / 60);
    setTimeout(() => stopGame(), 200);
    gameIntervals.push(deadAnimationInterval);
    setTimeout(() => {
      showEndScreen(true);
      gameSounds.playWinSound();
    }, 600);
  }
}