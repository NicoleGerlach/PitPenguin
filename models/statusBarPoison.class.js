/**
 * Displays the player's poison bottle count as a status bar.
 * Inherits from {@link DrawableObject}.
 */
class StatusBarPoison extends DrawableObject {
    x = 20;
    y = 80;
    height = 50;
    width = 190;
    percentage = 0;
  
    /**
     * Creates the poison status bar and initializes it with 0%.
     */
    constructor() {
      super();
      this.loadImage(LOADED_IMAGES.status_bar_poison[0]);
      this.addToImageCache('status_bar_poison', LOADED_IMAGES.status_bar_poison);
      this.setPercentage(this.percentage);
    }
  
    /**
     * Updates the poison percentage and changes the status bar image.
     * @param {number} percentage - A value between 0 and 100.
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      this.img = LOADED_IMAGES.status_bar_poison[this.resolveImageIndex()];
    }
  
    /**
     * Determines the image index based on the current poison percentage.
     * @returns {number} Index for the poison status image.
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