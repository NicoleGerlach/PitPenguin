/**
 * Represents an object that can move and interact within the game world.
 * Inherits from {@link DrawableObject}.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    poison = 0;
    coin = 0;
    heart = 0;
  
    /**
     * Applies gravity to the object, affecting its vertical position over time.
     */
    applyGravity() {
      let gravityInterval = setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 25);
      gameIntervals.push(gravityInterval);
    }
  
    /**
     * Checks if the object is currently above the ground.
     * @returns {boolean} True if above ground.
     */
    isAboveGround() {
      if (this instanceof ThrowableObject) {
        return true;
      } else {
        return this.y < 130;
      }
    }
  
    /**
     * Checks if this object is colliding with another object.
     * @param {MovableObject} mo - The object to check collision with.
     * @returns {boolean} True if colliding.
     */
    isColliding(mo) {
      return (
        this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
      );
    }
  
    /**
     * Determines if the character jumped on an enemy.
     * @param {MovableObject} enemy - The enemy to check against.
     * @returns {boolean} True if jump-on collision.
     */
    isJumpOnEnemy(enemy) {
      return (
        this.y + this.height - this.offset.bottom - 30 >
        enemy.y + enemy.offset.top
      );
    }
  
    /**
     * Checks if this object is colliding with a poison object.
     * @param {MovableObject} poison - The poison to check.
     * @returns {boolean} True if colliding.
     */
    isCollidingWithPoison(poison) {
      return (
        this.x + this.width - this.offset.right > poison.x + poison.offset.left &&
        this.x + this.offset.left <
          poison.x + poison.width - poison.offset.right &&
        this.y + this.height - this.offset.bottom >
          poison.y + poison.offset.top &&
        this.y + this.offset.top < poison.y + poison.height - poison.offset.bottom
      );
    }
  
    /**
     * Reduces energy when hit and records the time of impact.
     */
    hit() {
      this.energy -= 8;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  
    /**
     * Determines if the object is currently in a "hurt" state.
     * @returns {boolean} True if recently hit.
     */
    isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000;
      return timepassed < 0.3;
    }
  
    /**
     * Determines if the object is dead.
     * @returns {boolean} True if energy is 0.
     */
    isDead() {
      return this.energy == 0;
    }
  
    /**
     * Plays an animation sequence by cycling through image frames.
     * @param {HTMLImageElement[]} images - The animation frames.
     */
    playAnimation(images) {
      let i = this.currentImage % images.length;
      this.img = images[i];
      this.currentImage++;
    }
  
    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
      this.x += this.speed;
    }
  
    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
      this.x -= this.speed;
    }
  
    /**
     * Initiates a jump by setting a positive vertical speed.
     */
    jump() {
      this.speedY = 30;
    }
  }