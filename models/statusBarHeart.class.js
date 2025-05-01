/**
 * Displays the player's health as a heart-based status bar.
 * Inherits from {@link DrawableObject}.
 */
class StatusBarHeart extends DrawableObject {
    x = 20;
    y = 0;
    height = 50;
    width = 190;
    
    /**
     * Creates the heart status bar and sets it to full health (100%).
     */
    constructor() {
      super();
      this.loadImage(LOADED_IMAGES.status_bar_hearts[5]);
      this.addToImageCache('status_bar_hearts', LOADED_IMAGES.status_bar_hearts);
      this.setPercentage(this.percentage);
    }
  
    /**
     * Sets the current health percentage and updates the corresponding image.
     * @param {number} percentage - A value between 0 and 100.
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      this.img = LOADED_IMAGES.status_bar_hearts[this.resolveImageIndex()];
    }
  
    /**
     * Resolves the correct image index based on the current health percentage.
     * @returns {number} The index for the appropriate heart image.
     */
    resolveImageIndex() {
      if (this.percentage == 0) { return 0;
      } else if (this.percentage <= 20) { return 1;
      } else if (this.percentage <= 40) { return 2;
      } else if (this.percentage <= 60) { return 3;
      } else if (this.percentage <= 80) { return 4;
      } else { return 5;
      }
    }
  }