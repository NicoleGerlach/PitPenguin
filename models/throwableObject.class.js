/**
 * Represents a throwable poison bottle that the penguin can use to attack enemies.
 * Inherits from {@link MovableObject}.
 */
class ThrowableObject extends MovableObject {
  offset = {
    top: 20,
    left: 50,
    right: 20,
    bottom: 0,
  };

  /**
   * Creates a new throwable object at the given position.
   * @param {number} x - The horizontal position.
   * @param {number} y - The vertical position.
   */
  constructor(x, y, otherDirection, speedX) {
    super();
    this.loadImage(LOADED_IMAGES.poison.poison_left);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 60;
    this.speedX = speedX;
    this.throw(otherDirection);
  }

  /**
   * Applies upward force and horizontal movement to simulate a throwing arc.
   */
  throw(otherDirection) {
    this.speedY = 25;
    this.applyGravity();
    let throwInterval = setInterval(() => {
      if (otherDirection == true) {
        this.x -= 12;
      } else {
        this.x += 12;
      }
    }, 25);
    gameIntervals.push(throwInterval);
  }
}