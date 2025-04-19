/**
 * Represents a static poison bottle on the map that can be collected by the player.
 * Inherits from {@link MovableObject}.
 */
class Poison extends MovableObject {
    height = 80;
    width = 60;
  
    offset = {
      top: 20,
      left: 50,
      right: 20,
      bottom: 0,
    };
    
    /**
     * Creates a new Poison object.
     * @param {HTMLImageElement} imageObject - The image to display.
     * @param {number} x - The horizontal position.
     * @param {number} y - The vertical position.
     * @param {number} id - Unique identifier for this poison object.
     */
    constructor(imageObject, x, y, id) {
      super();
      this.loadImage(imageObject);
      this.x = x;
      this.y = y;
      this.id = id;
    }
  }