/**
 * Manages the game world, including character movement, collisions,
 * object rendering, and game state.
 */
class World {
  /**
   * Initializes the game world with canvas, keyboard input, and level data.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard input handler.
   * @param {Level} level - The current game level.
   */
  constructor(canvas, keyboard, level) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    this.level = level;
    this.initCharacters();
    this.initStatusBars();
    this.initGameObjects();
    this.setWorld();
    this.run();
    this.draw();
    this.animationFrameId = null;
  }

  /**
   * Initializes the main characters.
   */
  initCharacters() {
    this.penguin = new Penguin();
    this.enemies = this.level.enemies;
    this.endboss = this.level.endboss;
  }

  /**
   * Initializes the status bars for health, coins, poison, and endboss.
   */
  initStatusBars() {
    this.statusBarHeart = new StatusBarHeart();
    this.statusBarCoin = new StatusBarCoin();
    this.statusBarPoison = new StatusBarPoison();
    this.statusBarEndboss = new StatusBarEndboss();
  }

  /**
   * Initializes all other game objects and variables.
   */
  initGameObjects() {
    this.backgroundObjects = this.level.backgroundObjects;
    this.poisonBottles = this.level.poison;
    this.coin = this.level.coin;
    this.heart = this.level.heart;
    this.throwableObjects = [];
    this.activeThrownBottles = [];
    this.collectedCoins = 0;
    this.camera_x = 0;
  }

  /**
   * Connects Penguin and Endboss to the world and status bar.
   */
  setWorld() {
    this.penguin.world = this;
    this.endboss.statusBarEndboss = this.statusBarEndboss;
  }

  /**
   * Runs repeated checks for collisions and item collection.
   */
  run() {
    let runInterval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollectingPoison();
      this.checkCollectingCoin();
      this.checkCollectingHeart();
      this.checkCollisionWithPoison();
      this.checkEndbossCollisionWithPoison();
    }, 50);
    gameIntervals.push(runInterval);
  }

  /**
   * Checks and handles throwing poison bottles.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.keyboard.D_canThrow && this.penguin.poison > 0) {
      this.throwBottle();
      this.keyboard.D_canThrow = false;
    } else if (!this.keyboard.D && !this.keyboard.D_canThrow) {
      // Taste losgelassen -> wieder werfen erlauben
      this.keyboard.D_canThrow = true;
    }
  }

  /**
   * Creates and adds a thrown bottle to the game.
   */
  throwBottle() {
    if (this.penguin.poison > 0) {
      let bottle = new ThrowableObject(
        this.penguin.x + 190,
        this.penguin.y + 130
      );
      this.throwableObjects.push(bottle);
      this.penguin.poison--;
      this.statusBarPoison.setPercentage(this.penguin.poison * 10);
    }
  }

  /**
   * Checks for collisions between characters and enemies.
   */

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.penguin.isJumpOnEnemy(enemy)) {
        this.removeEnemy(enemy);
        this.penguin.speedY = 15;
      } else if (this.penguin.isColliding(enemy)) {
        this.penguin.hit();
        this.statusBarHeart.setPercentage(this.penguin.energy);
      }
    });
    if (this.penguin.isColliding(this.endboss)) {
      this.penguin.hit();
      this.statusBarHeart.setPercentage(this.penguin.energy);
    }
  }

  /**
   * Checks if poison bottles hit any enemies or the endboss.
   */
  checkCollisionWithPoison() {
    if (this.throwableObjects.length === 0) return;
    this.throwableObjects.forEach((poison) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isCollidingWithPoison(poison)) {
          if (enemy instanceof Rabbit) {
            this.removeEnemy(enemy);
          } else if (enemy instanceof Endboss) {
            this.enemy.endbossIsHurt();
          }
        }
      });
    });
  }

  /**
   * Checks if the endboss was hit by poison bottles.
   */
  checkEndbossCollisionWithPoison() {
    if (this.throwableObjects.length === 0) return;
    this.throwableObjects.forEach((poison) => {
      if (this.endboss.isCollidingWithPoison(poison)) {
        this.endboss.hit();
        if (this.endboss.energy <= 0 && !this.endboss.isDead) {
          this.endboss.isDead = true;
          this.endboss.playDeadAnimation();
        }
      }
    });
  }

  /**
   * Checks if the penguin collects a poison bottle.
   */
  checkCollectingPoison() {
    this.poisonBottles.forEach((poison) => {
      if (this.penguin.isColliding(poison)) {
        this.collectPoison(poison);
      }
    });
  }

  /**
   * Updates status and removes poison bottle after collection.
   * 
   * @param {Poison} poison - The collected poison object.
   */
  collectPoison(poison) {
    const index = this.level.poison.findIndex((p) => p.id === poison.id);
    if (index !== -1) {
      this.level.poison.splice(index, 1);
      this.penguin.poison++;
      this.statusBarPoison.setPercentage(this.penguin.poison * 10);
    }
  }

  /**
   * Returns true if penguin has full poison supply.
   * @returns {boolean}
   */
  enoughPoison() {
    if (this.penguin.poison == 100) {
      return this.penguin.poison == 100;
    }
  }

  /**
   * Checks if a coin was collected.
   */
  checkCollectingCoin() {
    this.level.coin.forEach((coin) => {
      if (this.penguin.isColliding(coin)) {
        this.collectingCoin(coin);
      }
    });
  }

  /**
   * Updates score and removes coin after collection.
   * @param {Coin} coin - The collected coin.
   */
  collectingCoin(coin) {
    if (this.penguin.coin < 100) {
      this.penguin.coin += 10;
      if (this.penguin.coin > 100) {
        this.penguin.coin = 100;
      }
    }
    this.collectedCoins += 1;
    this.statusBarCoin.setPercentage(this.penguin.coin);
    this.removeCoin(coin);
  }

  /**
   * Checks if a heart was collected.
   */
  checkCollectingHeart() {
    this.level.heart.forEach((heart) => {
      if (this.penguin.isColliding(heart)) {
        this.collectingHeart(heart);
      }
    });
  }

  /**
   * Restores health and removes heart after collection.
   * @param {Heart} heart - The collected heart.
   */
  collectingHeart(heart) {
    if (this.penguin.energy < 100) {
      this.penguin.energy += 5;
      if (this.penguin.energy > 100) {
        this.penguin.energy = 100;
      }
    }
    this.statusBarHeart.setPercentage(this.penguin.energy);
    this.removeHeart(heart);
  }

  /**
   * Draws all visible objects on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHeart);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarPoison);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.poisonBottles);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.heart);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.penguin);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds an array of game objects to the canvas.
   * @param {DrawableObject[]} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single game object to the canvas, applying mirroring if needed.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Mirrors the drawing context for objects facing left.
   * @param {DrawableObject} mo - The object to mirror.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the drawing context after mirroring.
   * @param {DrawableObject} mo - The mirrored object.
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }

  /**
   * Removes a collected coin from the game.
   * @param {Coin} coin - The coin to remove.
   */
  removeCoin(coin) {
    const indexOfCoin = this.level.coin.indexOf(coin);
    if (indexOfCoin > -1) {
      this.level.coin.splice(indexOfCoin, 1);
    }
  }

  /**
   * Removes a collected heart from the game.
   * @param {Heart} heart - The heart to remove.
   */
  removeHeart(heart) {
    const indexOfHeart = this.level.heart.indexOf(heart);
    if (indexOfHeart > -1 && this.penguin.energy < 100) {
      this.level.heart.splice(indexOfHeart, 1);
    }
  }

  /**
   * Removes an enemy from the game.
   * @param {Rabbit|Endboss} enemy - The enemy to remove.
   */
  removeEnemy(enemy) {
    const indexOfEnemy = this.level.enemies.indexOf(enemy);
    if (indexOfEnemy > -1) {
      this.level.enemies.splice(indexOfEnemy, 1);
    }
  }
}