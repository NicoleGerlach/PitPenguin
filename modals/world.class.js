
class World {
    penguin = new Penguin();
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    poison = level1.poison;
    coin = level1.coin
    heart = level1.heart
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = level1;
    statusBarHeart = new StatusBarHeart();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.penguin.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectingPoison();
            this.checkCollectingCoin();
            this.checkCollectingHeart();
            this.checkJumpOnEnemy();
        }, 200);
        // console.log('Energy:', this.penguin.energy);
        // console.log('Coin:', this.penguin.coin);
        // console.log('Poison:', this.penguin.bottle);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.penguin.bottle > 0) {
            let bottle = new ThrowableObject(this.penguin.x + 190, this.penguin.y + 130);
            this.throwableObject.push(bottle);
            this.throwBottle();
        }
    }

    throwBottle() {
        this.penguin.bottle -= 5;
        this.statusBarBottle.setPercentage(this.penguin.bottle);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.penguin.isColliding(enemy)) {
                this.penguin.hit();
                this.statusBarHeart.setPercentage(this.penguin.energy);
            }
        });
    }

    checkJumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.penguin.isJumpOnEnemy(enemy) && this.penguin.isColliding(enemy)) {
                this.removeEnemy(enemy);
            }

        });
    }

    checkCollectingPoison() {
        this.level.poison.forEach((poison) => {
            if (this.penguin.isColliding(poison)) {
                this.collectPoison(poison);
            }
        });
        // console.log('Poison:', this.penguin.bottle);
    }

    collectPoison(poison) {
        if (this.penguin.bottle < 100) {
            this.penguin.bottle += 10;
            if (this.penguin.bottle > 100) {
                this.penguin.bottle = 100;
            }
            this.statusBarBottle.setPercentage(this.penguin.bottle);
            this.removeBottle(poison);
        }
    }

    enoughPoison() {
        if (this.penguin.bottle == 100) {
            return this.penguin.bottle == 100;
        }
    }

    checkCollectingCoin() {
        this.level.coin.forEach((coin) => {
            if (this.penguin.isColliding(coin)) {
                this.collectingCoin(coin);
            }
        });
        // console.log('Coin:', this.penguin.coin);
    }

    collectingCoin(coin) {
        if (this.penguin.coin < 100) {
            this.penguin.coin += 5;
            if (this.penguin.coin > 100) {
                this.penguin.coin = 100;
            }
        }
        this.statusBarCoin.setPercentage(this.penguin.coin);
        this.removeCoin(coin);
    }

    checkCollectingHeart() {
        this.level.heart.forEach((heart) => {
            if (this.penguin.isColliding(heart)) {
                this.collectingHeart(heart);
            }
        });
        // console.log('Energy:', this.penguin.energy);
    }

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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.penguin);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHeart);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.heart);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    removeBottle(poison) {
        const indexOfPoison = this.level.poison.indexOf(poison);
        if (indexOfPoison > -1 && this.penguin.bottle < 100) {
            this.level.poison.splice(indexOfPoison, 1);
        }
    }

    removeCoin(coin) {
        const indexOfCoin = this.level.coin.indexOf(coin);
        if (indexOfCoin > -1) {
            this.level.coin.splice(indexOfCoin, 1);
        }
    }

    removeHeart(heart) {
        const indexOfHeart = this.level.heart.indexOf(heart);
        if (indexOfHeart > -1 && this.penguin.energy < 100) {
            this.level.heart.splice(indexOfHeart, 1);
        }
    }

    removeEnemy(enemy) {
        const indexOfEnemy = this.level.enemies.indexOf(enemy);
        if (indexOfEnemy > -1) {
            this.level.enemies.splice(indexOfEnemy, 1);
        }
    }
}