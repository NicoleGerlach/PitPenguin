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
  // animate() {
  //   let movementInterval = setInterval(() => {
  //     if (this.isDead) return;
  //     this.x += this.speed * this.direction;
  //     if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
  //       this.direction *= -1;
  //       this.otherDirection = this.direction === 1;
  //     }
  //     if (this.endbossIsHurt) {
  //       this.playAnimation(LOADED_IMAGES.endboss.hurt);
  //       gameSounds.playHurtEndbossSound();
  //     } else {
  //       this.playAnimation(LOADED_IMAGES.endboss.walk);
  //     }
  //   }, 2000 / 60);
  //   gameIntervals.push(movementInterval);
  // }

  animate() {
    let intervalId = setInterval(() => {
      if (this.isDead) return;

      // Wenn nahe am Ziel, neues Ziel setzen
      if (Math.abs(this.targetX - this.x) < this.speed) {
        this.setNewTarget();
      }

      // Bewegung in Richtung Ziel
      this.x += this.speed * this.direction;

      // Grenze prüfen und Richtungswechsel bei Bedarf
      if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
        // Begrenzung korrigieren
        if (this.x <= this.leftBoundary) {
          this.x = this.leftBoundary;
        }
        if (this.x >= this.rightBoundary) {
          this.x = this.rightBoundary;
        }
        // Neues Ziel setzen und Richtung anpassen
        this.setNewTarget();
      }

      // Animationen je nach Zustand
      if (this.endbossIsHurt) {
        this.playAnimation(LOADED_IMAGES.endboss.hurt);
        gameSounds.playHurtEndbossSound();
      } else {
        this.playAnimation(LOADED_IMAGES.endboss.walk);
      }

    }, 1800 / 60);

    gameIntervals.push(intervalId);
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

  setNewTarget() {
    // Zufälliges Ziel innerhalb der Grenzen
    this.targetX =
      Math.random() * (this.rightBoundary - this.leftBoundary) + this.leftBoundary;

    // Bestimme Richtung zum Ziel
    if (this.targetX > this.x) {
      this.direction = +1; // nach rechts
      this.otherDirection = true; // z.B. Sprite nicht spiegeln
    } else {
      this.direction = -1; // nach links
      this.otherDirection = false; // Sprite spiegeln
    }
  }
}