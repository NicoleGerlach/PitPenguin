/**
 * Base class for drawable game objects.
 * Handles positioning, image loading, and drawing to canvas.
 */
class DrawableObject {
    x = 0;
    y = 200;
    width = 150;
    height = 150;
    currentImage = 0;
    img;
    imageCache = {};
  
    /**
     * Assigns an image to this object.
     *
     * @param {HTMLImageElement} imageObject - The image to display.
     */
    loadImage(imageObject) {
      if (imageObject instanceof HTMLImageElement) {
        this.img = imageObject;
      } else {
        console.error(
          'loadImage expects an HTMLImageElement but got:',
          imageObject
        );
      }
    }
  
    /**
     * Adds an array of images to the image cache with a specific prefix.
     *
     * @param {string} prefix - Key prefix for the cache entries.
     * @param {HTMLImageElement[]} imagesArray - The array of images to cache.
     */
    addToImageCache(prefix, imagesArray) {
      if (!Array.isArray(imagesArray)) return;
      imagesArray.forEach((img, index) => {
        if (img instanceof HTMLImageElement) {
          this.imageCache[`${prefix}_${index}`] = img;
        } else {
          console.warn(
            `Unloaded image in array ${prefix} at index ${index}:`,
            img
          );
        }
      });
    }
  
    /**
     * Draws the object to the canvas context, if the image is ready.
     *
     * @param {CanvasRenderingContext2D} ctx - The drawing context.
     */
    draw(ctx) {
      if (
        this.img instanceof HTMLImageElement &&
        this.img.complete &&
        this.img.naturalWidth > 0
      ) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } else {
        console.warn('drawImage skipped - Image not ready:', this.img);
        setTimeout(() => this.draw(ctx), 30);
      }
    }
  }