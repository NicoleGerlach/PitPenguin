
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
    StatusBarHeart = new StatusBarHeart();
    StatusBarCoin = new StatusBarCoin();
    StatusBarBottle = new StatusBarBottle();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.penguin.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.penguin.isColliding(enemy)) {
                    this.penguin.hit();
                    this.StatusBarHeart.setPercentage(this.penguin.energy);
                }
            });
        }, 200);
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.penguin);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.StatusBarHeart);
        this.addToMap(this.StatusBarCoin);
        this.addToMap(this.StatusBarBottle);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.heart);
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
}