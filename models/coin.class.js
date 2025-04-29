/**
 * Represents a collectible coin in the game.
 * Inherits position and drawing logic from MovableObject.
 */
class Coin extends MovableObject {
    height = 50;
    width = 50;
  
    offset = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
    };
  
    /**
     * Creates a new coin at the specified position.
     *
     * @param {HTMLImageElement} imageObject - The image used to display the coin.
     * @param {number} x - The horizontal position of the coin.
     * @param {number} y - The vertical position of the coin.
     */
    constructor(imageObject, x, y) {
      super();
      this.loadImage(imageObject);
      this.x = x;
      this.y = y;
    }
  }