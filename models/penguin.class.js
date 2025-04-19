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
    inactivityTimer;
    isSleeping = false;
    world;
  
    offset = {
      top: 50,
      left: 160,
      right: 130,
      bottom: 20,
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
      let movementPenguin = setInterval(() => {
        this.movePenguin();
      }, 1000 / 60);
      gameIntervals.push(movementPenguin);
      let animationPenguinInterval = setInterval(() => {
        this.animatePenguin();
      }, 50);
      gameIntervals.push(animationPenguinInterval);
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
      this.resetInactivityTimer();
    }
  
    /**
     * Checks whether movement to the left is possible.
     * @returns {boolean}
     */
    canMoveLeft() {
      return this.world.keyboard.LEFT && this.x > this.world.level.level_start_x;
    }
  
    /**
     * Moves the penguin left and resets sleep timer.
     */
    penguinMoveLeft() {
      super.moveLeft();
      this.otherDirection = true;
      this.resetInactivityTimer();
    }
  
    /**
     * Checks whether jumping is allowed.
     * @returns {boolean}
     */
    canJump() {
      return this.world.keyboard.SPACE && !this.isAboveGround();
    }
  
    /**
     * Makes the penguin jump and plays jump sound.
     */
    penguinJump() {
      super.jump();
      gameSounds.playJumpingPenguinSound();
      this.resetInactivityTimer();
    }
  
    /**
     * Plays or stops the walking sound based on movement and air state.
     */
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
  
    /**
     * Manages penguin animations depending on state (hurt, sleep, walk, jump).
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
      if (this.canSleep()) this.penguinSleep();
      else {
        this.resetInactivityTimer();
        if (this.isDead()) this.playDeadAnimation(false);
        else if (this.isHurt()) {
          this.playAnimation(LOADED_IMAGES.penguin.hurt);
          this.penguinHurt();
        } else {
          this.movingAnimation();
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
     * Plays hurt sound once when penguin takes damage.
     */
    penguinHurt() {
      let hasCollidedWithEnemy = false;
      if (!hasCollidedWithEnemy) {
        gameSounds.playHurtPenguinSound();
        hasCollidedWithEnemy = true;
      }
    }
  
    /**
     * Chooses between walk and jump animations while moving.
     */
    movingAnimation() {
      if (this.isAboveGround()) {
        this.playAnimation(LOADED_IMAGES.penguin.jump);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(LOADED_IMAGES.penguin.walk);
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
      if (!isGameActive) return;
      clearTimeout(this.inactivityTimer);
      if (this.isSleeping) {
        this.isSleeping = false;
        gameSounds.stopSnoringPenguinSound();
      }
      this.startInactivityTimer();
    }
  
    /**
     * Triggers the death animation and ends the game.
     */
    playDeadAnimation() {
      let deadAnimationPenguinInterval = setInterval(() => {
        if (this.isDead) {
          this.playAnimation(LOADED_IMAGES.penguin.dead);
          this.speed = 0;
        }
      }, 2500 / 60);
      setTimeout(() => {
        stopGame();
      }, 200);
      gameIntervals.push(deadAnimationPenguinInterval);
      setTimeout(() => {
        showEndScreen(false);
        gameSounds.playLoseSound();
      }, 600);
    }
  }