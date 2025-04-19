/**
 * Displays the coin status bar at the top-left corner of the screen.
 * The bar updates based on the collected coin percentage.
 * Inherits from {@link DrawableObject}.
 */
class StatusBarCoin extends DrawableObject {
    x = 20;
    y = 40;
    height = 50;
    width = 190;
    percentage = 0;
    /**
     * Creates a new StatusBarCoin instance and initializes its image based on the current percentage.
     */
    constructor() {
      super();
      this.addToImageCache('status_bar_coin', LOADED_IMAGES.status_bar_coin);
      this.setPercentage(this.percentage);
    }
  
    /**
     * Updates the displayed image of the coin status bar based on the given percentage.
     * @param {number} percentage - A value between 0 and 100 indicating how many coins have been collected.
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      this.img = LOADED_IMAGES.status_bar_coin[this.resolveImageIndex()];
    }
  
    /**
     * Determines which image index to show based on the current percentage.
     * @returns {number} The index for the image that represents the current percentage.
     */
    resolveImageIndex() {
      if (this.percentage == 0) {
        return 0;
      } else if (this.percentage <= 20) {
        return 1;
      } else if (this.percentage <= 40) {
        return 2;
      } else if (this.percentage <= 60) {
        return 3;
      } else if (this.percentage <= 80) {
        return 4;
      } else {
        return 5;
      }
    }
  }