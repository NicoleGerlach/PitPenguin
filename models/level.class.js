
class Level {
    enemies;
    backgroundObjects;
    poison;
    coin;
    heart;

    level_end_x = 2400;
    level_start_x = -1000;

    constructor(enemies, endboss, backgroundObjects, poison, coin, heart){
        this.enemies = enemies;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
        this.poison = poison;
        this.coin = coin;
        this.heart = heart;
    }
}