/**
 * Represents a rabbit enemy that walks from right to left.
 * Inherits from {@link MovableObject}.
 */

class Rabbit extends MovableObject {
  y = 240;

    offset = {
      top: 0,
      left: 60,
      right: 40,
      bottom: 10,
    };
  
    /**
     * Creates a new Rabbit instance with randomized position and speed.
     * Initializes its walk animation.
     */
    constructor() {
      super();
      this.loadImage(LOADED_IMAGES.rabbits.walk[0]);
      this.addToImageCache('walk', LOADED_IMAGES.rabbits.walk);
      this.animate();
      this.x = 400 + Math.random() * 1900;
      this.speed = 0.85 + Math.random() * 0.25;
      this.moveLeft();
    }
  
    /**
     * Animates the rabbit's walking movement and updates its image frames.
     */
    animate() {
      let interval = setInterval(() => {
        this.moveLeft();
        this.playAnimation(LOADED_IMAGES.rabbits.walk);
      }, 60);
    }
  }