class Level {
    enemies;
    backgroundObjects;
    poison;
    coin;

    level_end_x = 2200;
    level_start_x = -1000;

    constructor(enemies, backgroundObjects, poison, coin){
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.poison = poison;
        this.coin = coin;
    }
}