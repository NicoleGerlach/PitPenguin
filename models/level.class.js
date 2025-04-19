/**
 * Represents a game level with all its entities and assets.
 */
class Level {
    enemies;
    backgroundObjects;
    poison;
    coin;
    heart;
    level_end_x = 2400;
    level_start_x = -1000;
  
    /**
     * Creates a new level instance.
     * @param {MovableObject[]} enemies - Array of regular enemies.
     * @param {MovableObject} endboss - The final boss of the level.
     * @param {BackgroundObject[]} backgroundObjects - All layered background elements.
     * @param {Poison[]} poison - Poison bottles available in the level.
     * @param {Coin[]} coin - Coins that can be collected.
     * @param {Heart[]} heart - Hearts to restore health.
     */
    constructor(enemies, endboss, backgroundObjects, poison, coin, heart) {
      this.enemies = enemies;
      this.endboss = endboss;
      this.backgroundObjects = backgroundObjects;
      this.poison = poison;
      this.coin = coin;
      this.heart = heart;
    }
  }