/**
 * Represents a collectible heart object in the game.
 * Inherits position, dimensions, image handling, and drawing logic from MovableObject.
 */
class Heart extends MovableObject {
    height = 45;
    width = 55;
  
    offset = {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
    };
  
    /**
     * Creates a new heart object at the given position using a preloaded image.
     * @param {HTMLImageElement} imageObject - The preloaded image object for the heart.
     * @param {number} x - The horizontal position on the canvas.
     * @param {number} y - The vertical position on the canvas.
     */
    constructor(imageObject, x, y) {
      super();
      this.loadImage(imageObject);
      this.x = x;
      this.y = y;
    }
  }