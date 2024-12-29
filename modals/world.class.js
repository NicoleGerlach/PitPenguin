

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
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.penguin.x + 190, this.penguin.y + 130);
            this.throwableObject.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.penguin.isColliding(enemy)) {
                this.penguin.hit();
                this.statusBarHeart.setPercentage(this.penguin.energy);
            }
        });
    }

    checkCollectingPoison() {
        this.level.poison.forEach((poison) => {
            if (this.penguin.isColliding(poison)) {
                this.penguin.bottle += 5;
                this.statusBarBottle.setPercentage(this.penguin.bottle);
                // this.removeBottle();
            }
        })
    }

    checkCollectingCoin() {
        this.level.coin.forEach((coin) => {
            if (this.penguin.isColliding(coin)) {
                this.penguin.coin += 2;
                this.statusBarCoin.setPercentage(this.penguin.coin);
            }
        })
    }

    checkCollectingHeart() {
        this.level.heart.forEach((heart) => {
            if (this.penguin.isColliding(heart)) {
                this.penguin.heart += 5;
                this.penguin.energy += 5;
                this.statusBarHeart.setPercentage(this.penguin.heart);
            }
        })
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

    // removeBottle(poison) {
    //     this.level.Poison.splice[poison[i]];
    // }
}