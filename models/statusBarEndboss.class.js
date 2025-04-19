/**
 * Displays the endboss's health using a row of heart icons.
 * Each hit removes one heart. Inherits from {@link DrawableObject}.
 */
class StatusBarEndboss extends DrawableObject {
  x = 300;
  y = 0;
  height = 50;
  width = 50;

  /**
   * Initializes the status bar with 4 full hearts.
   */
  constructor() {
    super();
    this.heartStatus = [true, true, true, true];
  }

  /**
   * Draws the hearts on the canvas. A full heart is shown if active,
   * otherwise a broken heart is displayed.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   */
  draw(ctx) {
    for (let i = 0; i < this.heartStatus.length; i++) {
      if (this.heartStatus[i]) {
        this.drawHeart(ctx, i);
      } else {
        this.drawBrokenHeart(ctx, i);
      }
    }
  }

  /**
   * Draws a full heart image at the specified position on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   * @param {number} i - The index of the heart image to display.
   */
  drawHeart(ctx, i) {
    ctx.drawImage(
      LOADED_IMAGES.endboss.status_bar_hearts[i],
      this.x + i * 40,
      this.y,
      this.width,
      this.height
    );
  }

  /**
   * Draws a broken heart image at the specified position on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   * @param {number} i - The index of the broken heart image to display.
   */
  drawBrokenHeart(ctx, i) {
    ctx.drawImage(
      LOADED_IMAGES.endboss.status_bar_broken_heart,
      this.x + i * 40,
      this.y,
      this.width,
      this.height
    );
  }

  /**
   * Updates the heart status by turning the next full heart into a broken one.
   * Called when the endboss is hit.
   */
  updateHearts() {
    for (let i = 0; i < this.heartStatus.length; i++) {
      if (this.heartStatus[i]) {
        this.heartStatus[i] = false;
        break;
      }
    }
  }
}