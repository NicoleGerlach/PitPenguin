/**
 * Creates and returns a fully populated game level.
 *
 * Initializes all game objects including enemies, endboss,
 * background elements, poison, coins, and hearts.
 *
 * @returns {Level} A new Level instance with all game objects.
 */
function createLevel1() {
  const enemies = spawnRabbits(8);
  const endboss = new Endboss();
  const background = [
    new BackgroundObject(LOADED_IMAGES.landscape.backgrounds, -719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.fog, -719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.stars, -700 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.northern_lights_2, -719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_7, -719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_8, -719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.ground_1, -719 * 2),

    new BackgroundObject(LOADED_IMAGES.landscape.backgrounds, -719),
    new BackgroundObject(LOADED_IMAGES.landscape.fog, -719),
    new BackgroundObject(LOADED_IMAGES.landscape.stars, -700),
    new BackgroundObject(LOADED_IMAGES.landscape.northern_lights_1, -719),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_7, -719),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_8, -719),
    new BackgroundObject(LOADED_IMAGES.landscape.ground_2, -719),

    new BackgroundObject(LOADED_IMAGES.landscape.backgrounds, 0),
    new BackgroundObject(LOADED_IMAGES.landscape.fog, 0),
    new BackgroundObject(LOADED_IMAGES.landscape.stars, 0),
    new BackgroundObject(LOADED_IMAGES.landscape.northern_lights_2, 0),
    new BackgroundObject(LOADED_IMAGES.landscape.moon, 0),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_7, 0),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_8, 0),
    new BackgroundObject(LOADED_IMAGES.landscape.ground_1, 0),
    new BackgroundObject(LOADED_IMAGES.landscape.backgrounds, 719),
    new BackgroundObject(LOADED_IMAGES.landscape.fog, 719),
    new BackgroundObject(LOADED_IMAGES.landscape.stars, 700),
    new BackgroundObject(LOADED_IMAGES.landscape.northern_lights_1, 719),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_7, 719),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_8, 719),
    new BackgroundObject(LOADED_IMAGES.landscape.ground_2, 719),

    new BackgroundObject(LOADED_IMAGES.landscape.backgrounds, 719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.fog, 719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.stars, 700 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.northern_lights_2, 719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_7, 719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_8, 719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.ground_1, 719 * 2),
    new BackgroundObject(LOADED_IMAGES.landscape.backgrounds, 719 * 3),
    new BackgroundObject(LOADED_IMAGES.landscape.fog, 719 * 3),
    new BackgroundObject(LOADED_IMAGES.landscape.stars, 700 * 3),
    new BackgroundObject(LOADED_IMAGES.landscape.northern_lights_1, 719 * 3),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_7, 719 * 3),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_8, 719 * 3),
    new BackgroundObject(LOADED_IMAGES.landscape.ground_2, 719 * 3),
    new BackgroundObject(LOADED_IMAGES.landscape.stars, 700 * 4),
    new BackgroundObject(LOADED_IMAGES.landscape.backgrounds, 719 * 4),
    new BackgroundObject(LOADED_IMAGES.landscape.fog, 719 * 4),
    new BackgroundObject(LOADED_IMAGES.landscape.stars, 700 * 4),
    new BackgroundObject(LOADED_IMAGES.landscape.northern_lights_2, 719 * 4),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_7, 719 * 4),
    new BackgroundObject(LOADED_IMAGES.landscape.mountains_8, 719 * 4),
    new BackgroundObject(LOADED_IMAGES.landscape.ground_1, 719 * 4),
  ];
  const poison = [
    new Poison(LOADED_IMAGES.poison.poison_left, -780, 310, 1),
    new Poison(LOADED_IMAGES.poison.poison_left, -400, 310, 2),
    new Poison(LOADED_IMAGES.poison.poison_left, 450, 310, 3),
    new Poison(LOADED_IMAGES.poison.poison_left, 700, 310, 4),
    new Poison(LOADED_IMAGES.poison.poison_right, 900, 310, 5),
    new Poison(LOADED_IMAGES.poison.poison_right, 1250, 310, 6),
    new Poison(LOADED_IMAGES.poison.poison_left, 1800, 310, 7),
    new Poison(LOADED_IMAGES.poison.poison_left, 1500, 310, 8),
    new Poison(LOADED_IMAGES.poison.poison_left, 2220, 310, 9),
  ];
  const coins = [
    new Coin(LOADED_IMAGES.coin, -810, 190),
    new Coin(LOADED_IMAGES.coin, -750, 140),
    new Coin(LOADED_IMAGES.coin, -690, 140),
    new Coin(LOADED_IMAGES.coin, -630, 190),
    new Coin(LOADED_IMAGES.coin, 430, 170),
    new Coin(LOADED_IMAGES.coin, 490, 170),
    new Coin(LOADED_IMAGES.coin, 1185, 147),
    new Coin(LOADED_IMAGES.coin, 1322, 147),
    new Coin(LOADED_IMAGES.coin, 2200, 260),
    new Coin(LOADED_IMAGES.coin, 2260, 260),
  ];
  const hearts = [
    new Heart(LOADED_IMAGES.heart, -725, 195),
    new Heart(LOADED_IMAGES.heart, 455, 120),
    new Heart(LOADED_IMAGES.heart, 1250, 150),
    new Heart(LOADED_IMAGES.heart, 2225, 200),
  ];
  return new Level(enemies, endboss, background, poison, coins, hearts);
}

/**
 * Creates a specific number of rabbits an returns an array.
 * 
 * @param {number} amount - Amounts of enemies.
 * @returns {array} - Array of rabbits.
 */
function spawnRabbits(amount) {
  const rabbitEnemies = [];
  for (let i = 0; i < amount; i++) {
    let rabbit = new Rabbit();
    rabbitEnemies.push(rabbit);
  }
  return rabbitEnemies;
}
