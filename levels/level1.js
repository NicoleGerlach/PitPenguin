// let enemies = spawnRabbits(8);

enemies = [];

let level1;

function setLevel() {
  level1 = new Level(
    enemies,
    new Endboss(),
    [
      new BackgroundObject('img/Background/01/layers/l1-background.png', -719 * 2),
      new BackgroundObject('img/Background/01/layers/l3-fog.png', -719 * 2),
      new BackgroundObject('img/Background/01/layers/l4-stars01.png', -700 * 2),
      new BackgroundObject('img/Background/01/layers/l5-northern-lights02.png', -719 * 2),
      new BackgroundObject('img/Background/01/layers/l7-mountains01.png', -719 * 2),
      new BackgroundObject('img/Background/01/layers/l8-mountains01.png', -719 * 2),
      new BackgroundObject('img/Background/01/layers/l9-ground01.png', -719 * 2),
  
      new BackgroundObject('img/Background/01/layers/l1-background.png', -719),
      new BackgroundObject('img/Background/01/layers/l3-fog.png', -719),
      new BackgroundObject('img/Background/01/layers/l4-stars01.png', -700),
      new BackgroundObject('img/Background/01/layers/l2-northern-lights01.png', -719),
      new BackgroundObject('img/Background/01/layers/l7-mountains02.png', -719),
      new BackgroundObject('img/Background/01/layers/l8-mountains02.png', -719),
      new BackgroundObject('img/Background/01/layers/l9-ground02.png', -719),
  
      new BackgroundObject('img/Background/01/layers/l1-background.png', 0),
      new BackgroundObject('img/Background/01/layers/l3-fog.png', 0),
      new BackgroundObject('img/Background/01/layers/l4-stars01.png', 0),
      new BackgroundObject('img/Background/01/layers/l5-northern-lights02.png', 0),
      new BackgroundObject('img/Background/01/layers/l6-moon.png', 0),
      new BackgroundObject('img/Background/01/layers/l7-mountains01.png', 0),
      new BackgroundObject('img/Background/01/layers/l8-mountains01.png', 0),
      new BackgroundObject('img/Background/01/layers/l9-ground01.png', 0),
      new BackgroundObject('img/Background/01/layers/l1-background.png', 719),
      new BackgroundObject('img/Background/01/layers/l3-fog.png', 719),
      new BackgroundObject('img/Background/01/layers/l4-stars01.png', 700),
      new BackgroundObject('img/Background/01/layers/l2-northern-lights01.png', 719),
      new BackgroundObject('img/Background/01/layers/l7-mountains02.png', 719),
      new BackgroundObject('img/Background/01/layers/l8-mountains02.png', 719),
      new BackgroundObject('img/Background/01/layers/l9-ground02.png', 719),
  
      new BackgroundObject('img/Background/01/layers/l1-background.png', 719 * 2),
      new BackgroundObject('img/Background/01/layers/l3-fog.png', 719 * 2),
      new BackgroundObject('img/Background/01/layers/l4-stars01.png', 700 * 2),
      new BackgroundObject('img/Background/01/layers/l5-northern-lights02.png', 719 * 2),
      new BackgroundObject('img/Background/01/layers/l7-mountains01.png', 719 * 2),
      new BackgroundObject('img/Background/01/layers/l8-mountains01.png', 719 * 2),
      new BackgroundObject('img/Background/01/layers/l9-ground01.png', 719 * 2),
      new BackgroundObject('img/Background/01/layers/l1-background.png', 719 * 3),
      new BackgroundObject('img/Background/01/layers/l3-fog.png', 719 * 3),
      new BackgroundObject('img/Background/01/layers/l4-stars01.png', 700 * 3),
      new BackgroundObject('img/Background/01/layers/l2-northern-lights01.png', 719 * 3),
      new BackgroundObject('img/Background/01/layers/l7-mountains02.png', 719 * 3),
      new BackgroundObject('img/Background/01/layers/l8-mountains02.png', 719 * 3),
      new BackgroundObject('img/Background/01/layers/l9-ground02.png', 719 * 3),
      new BackgroundObject('img/Background/01/layers/l4-stars01.png', 700 * 4),
      new BackgroundObject('img/Background/01/layers/l1-background.png', 719 * 4),
      new BackgroundObject('img/Background/01/layers/l3-fog.png', 719 * 4),
      new BackgroundObject('img/Background/01/layers/l4-stars01.png', 700 * 4),
      new BackgroundObject('img/Background/01/layers/l5-northern-lights02.png', 719 * 4),
      new BackgroundObject('img/Background/01/layers/l7-mountains01.png', 719 * 4),
      new BackgroundObject('img/Background/01/layers/l8-mountains01.png', 719 * 4),
      new BackgroundObject('img/Background/01/layers/l9-ground01.png', 719 * 4),
    ],
    [
    new Poison('img/Poison/Dark-Left.png', -780, 310, 1),
    new Poison('img/Poison/Dark-Left.png', -400, 310, 2),
    new Poison('img/Poison/Dark-Left.png', 450, 310, 3),
    new Poison('img/Poison/Dark-Left.png', 700, 310, 4),
    new Poison('img/Poison/Dark-Right.png', 900, 310, 5),
    new Poison('img/Poison/Dark-Right.png', 1250, 310, 6),
    new Poison('img/Poison/Dark-Left.png', 1800, 310, 7),
    new Poison('img/Poison/Dark-Left.png', 1500, 310, 8),
    new Poison('img/Poison/Dark-Left.png', 2220, 310, 9),
  ],
    [
      new Coin('img/Coins/1.png', -810, 190),
      new Coin('img/Coins/1.png', -750, 140),
      new Coin('img/Coins/1.png', -690, 140),
      new Coin('img/Coins/1.png', -630, 190),
      new Coin('img/Coins/1.png', -395, 190),
      new Coin('img/Coins/1.png', 430, 170),
      new Coin('img/Coins/1.png', 490, 170),
      new Coin('img/Coins/1.png', 1185, 147),
      new Coin('img/Coins/1.png', 1253, 85),
      new Coin('img/Coins/1.png', 1322, 147),
      new Coin('img/Coins/1.png', 1500, 170),
      new Coin('img/Coins/1.png', 2200, 260),
      new Coin('img/Coins/1.png', 2260, 260),
    ],
    [
      new Heart('img/Heart/heart1.png', -725, 195),
      new Heart('img/Heart/heart1.png', 1250, 150),
    ]
  );
  
  function spawnRabbits(amount) {
    const rabbitEnemies = [];
    for (let i = 0; i < amount; i++) {
      let rabbit = new Rabbit();
      rabbitEnemies.push(rabbit);
    }
    return rabbitEnemies;
  }  
}
