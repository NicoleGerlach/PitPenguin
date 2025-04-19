/**
 * Represents a background object in the game, such as mountains, fog, or stars.
 * Inherits position and movement logic from MovableObject.
 */
class BackgroundObject extends MovableObject {
    height = 480;
    width = 720;
    y = 0;
  
    /**
     * Creates a new background object with a given image and x-position.
     *
     * @param {HTMLImageElement} imageObject - The image to display as background.
     * @param {number} x - The horizontal position of the background.
     */
    constructor(imageObject, x) {
      super();
      this.loadImage(imageObject);
      this.x = x;
    }
  }