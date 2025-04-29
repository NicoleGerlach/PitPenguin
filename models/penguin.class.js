/**
* Represents the main character "Pit Penguin" with movement, animation,
* sleep behavior and interaction logic.
* Inherits from {@link MovableObject}.
*/
class Penguin extends MovableObject {
  height = 300;
  width = 400;
  y = 130;
  x = 0;
  speed = 5;
  isDead = false;
  hurt = false;
  isSleeping = false;

  offset = {
    top: 110,
    left: 150,
    right: 150,
    bottom: 46,
  };

  /**
  * Initializes the penguin, loads images, applies gravity, and starts animations.
  */
  constructor() {
    super();
    this.loadImage(LOADED_IMAGES.penguin.walk[0]);
    this.addToImageCache('walk', LOADED_IMAGES.penguin.walk);
    this.addToImageCache('jump', LOADED_IMAGES.penguin.jump);
    this.addToImageCache('hurt', LOADED_IMAGES.penguin.hurt);
    this.addToImageCache('dead', LOADED_IMAGES.penguin.dead);
    this.addToImageCache('idle', LOADED_IMAGES.penguin.idle);
    this.imageCache['sleep'] = LOADED_IMAGES.penguin.sleep;
    this.applyGravity();
    this.animate();
  }

  /**
  * Starts movement and animation intervals for the penguin.
  */
  animate() {
    this.movementInterval = setInterval(() => {
      if (this.isDead) return;
      this.movePenguin();
    }, 1000 / 60);
    gameIntervals.push(this.movementInterval);
    this.animationInterval = setInterval(() => {
      if (this.isDead) return;
      this.animatePenguin();
    }, 50);
    gameIntervals.push(this.animationInterval);
  }

  /**
  * Handles movement logic and camera tracking.
  */
  movePenguin() {
    this.checkPlayWalkingSound();
    if (this.canMoveRight()) this.penguinMoveRight();
    if (this.canMoveLeft()) this.penguinMoveLeft();
    if (this.canJump()) this.penguinJump();
    this.world.camera_x = -this.x + 50;
  }

  /**
   * Checks whether movement to the right is possible.
   * 
   * @returns {boolean}
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
  * Moves the penguin right and resets sleep timer.
  */
  penguinMoveRight() {
    super.moveRight();
    this.otherDirection = false;
  }

  /**
   * Checks whether movement to the left is possible.
   * 
   * @returns {boolean}
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > this.world.level.level_start_x
  }

  /**
  * Moves the penguin left, reset the sleep timer and change the variable to make it rotate.
  */
  penguinMoveLeft() {
    super.moveLeft();
    this.otherDirection = true;
  }

  /**
   * Checks whether jumping is allowed.
   * @returns {boolean}
   */
  canJump() {
    return (
      this.world.keyboard.SPACE && !this.isAboveGround()
    );
  }

  /**
   * Makes the penguin jump and plays jump sound.
   */
  penguinJump() {
    super.jump();
    gameSounds.playJumpingPenguinSound();
  }

  /**
   * Plays or stops the walking sound based on movement and air state.
   */
  checkPlayWalkingSound() {
    if (this.isAboveGround()) {
      gameSounds.stopWalkingPenguinSound();
      return;
    }
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      gameSounds.playWalkingPenguinSound();
    } else {
      gameSounds.stopWalkingPenguinSound();
    }
  }

  /**
   * Controls the animations hurt, sleep or dead.
   * 
   * @returns {boolean}
   */
  animatePenguin() {
    if (this.isHurt()) {
      this.isSleeping = false;
      this.playAnimation(LOADED_IMAGES.penguin.hurt);
      gameSounds.stopSnoringPenguinSound();
      gameSounds.playHurtPenguinSound();
      if (this.energy <= 0) {
        this.playDeadAnimation();
        return;
      }
      return;
    }
    this.handleSleepAndMovement();
  }

  /**
   * Handles the animations sleeping, inactivity, death and movement.
   */
  handleSleepAndMovement() {
    if (this.canSleep()) {
      this.penguinSleep();
    } else {
      this.resetInactivityTimer();
      if (this.isDead) {
        this.playDeadAnimation();
      } else {
        if (this.isAboveGround()) {
          this.playAnimation(LOADED_IMAGES.penguin.jump);
        } else {
          if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(LOADED_IMAGES.penguin.walk);
          }
        }
      }
    }
  }

  /**
   * Returns true if no input is active (used to trigger idle/sleep).
   * @returns {boolean}
   */
  canSleep() {
    return (
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.SPACE &&
      !this.world.keyboard.D
    );
  }

  /**
   * Handles idle animation and sleep timer setup.
   */
  penguinSleep() {
    if (!this.isSleeping) {
      this.playAnimation(LOADED_IMAGES.penguin.idle);
      if (!this.inactivityTimer) {
        this.startInactivityTimer();
      }
    }
  }

  /**
   * Starts a timer that puts the penguin to sleep after inactivity.
   */
  startInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      if (!isGameActive) return;
      this.loadImage(LOADED_IMAGES.penguin.sleep);
      gameSounds.playSnoringPenguinSound();
      this.isSleeping = true;
    }, 8000);
  }

  /**
   * Resets inactivity timer and wakes the penguin if sleeping.
   */
  resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    if (this.isSleeping) {
      this.isSleeping = false;
      gameSounds.stopSnoringPenguinSound();
    }
    if (!isGameActive) return;
    this.startInactivityTimer();
  }

  /**
   * Plays the death animation, stop the game and show the endscreen.
   */
  playDeadAnimation() {
    if (!this.isDead) {
      let images = LOADED_IMAGES.penguin.dead;
      this.animateDeathFrames(images);
      setTimeout(() => {
        stopGame();
        showEndScreen(false);
        gameSounds.playLoseSound();
      }, images.length * 30 + 200);
      this.isDead = true;
    }
  }

  /**
   * Animates the death frames.
   * 
   * @param {array} images - Array of images.
   * @param {number} index - Current index in the array.
   */
  animateDeathFrames(images, index = 0) {
    if (index < images.length) {
      this.playAnimation([images[index]]);
      setTimeout(() => this.animateDeathFrames(images, index + 1), 30);
    } else {
      clearInterval(this.movementInterval);
    }
  }
}