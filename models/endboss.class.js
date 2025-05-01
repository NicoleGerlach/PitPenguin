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
  leftBoundary = 1800;
  rightBoundary = 2650;
  energy = 4;
  isDead = false;
  endbossIsHurt = false;
  playedDeath = false;
  targetX = this.x //neu

  offset = {
    top: 110,
    left: 150,
    right: 190,
    bottom: 80,
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
    this.setNewTarget(); //neu
    this.animate();
  }

  /**
   * Controls movement and animation of the endboss.
   */
  animate() {
    let intervalId = setInterval(() => {
      if (this.isDead) return;
      if (Math.abs(this.targetX - this.x) < this.speed) {
        this.setNewTarget();
      }
      this.x += this.speed * this.direction;
      this.randomMovement();
      this.updateHurtWalkAnimation();
    }, 1800 / 60);
    gameIntervals.push(intervalId);
  }

  /**
   * Handles random movement within defined boundaries.
   */
  randomMovement() {
    if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
      if (this.x <= this.leftBoundary) {
        this.x = this.leftBoundary;
      }
      if (this.x >= this.rightBoundary) {
        this.x = this.rightBoundary;
      }
      this.setNewTarget();
    }
  }

  /**
   * Updates the endboss animation based on its current state.
   */
  updateHurtWalkAnimation() {
    if (this.endbossIsHurt) {
      this.playAnimation(LOADED_IMAGES.endboss.hurt);
      gameSounds.playHurtEndbossSound();
    } else {
      this.playAnimation(LOADED_IMAGES.endboss.walk);
    }
  }

  /**
   * Reduces energy and triggers hurt/death logic.
   */
  hit() {
    if (!this.isDead && !this.endbossIsHurt) {
      this.energy--;
      if (this.energy <= 0) {
        this.updateUponDeath();
      } else {
        this.updateUponHurt();
        setTimeout(() => {
          this.endbossIsHurt = false;
          this.speed = 5;
        }, 800);
      }
    }
  }

  /**
   * Updates the endboss state upon death.
   */
  updateUponDeath() {
    this.statusBarEndboss.updateHearts();
    this.isDead = true;
    this.playDeadAnimation();
  }

  /**
   * Updates the endboss when it gets hurt.
   */
  updateUponHurt() {
    this.endbossIsHurt = true;
    this.statusBarEndboss.updateHearts();
    this.speed = 0;
  }

  /**
   * Plays the death animation, stop the game and show the endscreen.
   */
  playDeadAnimation() {
    const images = LOADED_IMAGES.endboss.dead;
    this.animateEndbossDeath(images);
    setTimeout(() => {
      stopGame();
      showEndScreen(true);
      gameSounds.playWinSound();
    }, images.length * 100 + 100);
  }
  
  /**
   * Animates the death frames.
   * 
   * @param {array} images - Array of images.
   * @param {number} index - Current index in the array.
   */
  animateEndbossDeath(images, index = 0) {
    if (index < images.length) {
      this.playAnimation([images[index]]);
      setTimeout(() => this.animateEndbossDeath(images, index + 1), 30);
    } else {
      this.speed = 0;
      this.isDead = true;
    }
  }

  /**
   * Sets a new random target position within the defined boundaries.
   */
  setNewTarget() {
    this.targetX =
      Math.random() * (this.rightBoundary - this.leftBoundary) + this.leftBoundary;
    if (this.targetX > this.x) {
      this.direction = +1;
      this.otherDirection = true;
    } else {
      this.direction = -1;
      this.otherDirection = false;
    }
  }
}