class Level {
    enemies;
    backgroundObjects;
    poison;
    coin;
    heart;

    level_end_x = 2400;
    level_start_x = -1000;

    constructor(enemies, backgroundObjects, poison, coin, heart){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.poison = poison;
        this.coin = coin;
        this.heart = heart;
    }
}