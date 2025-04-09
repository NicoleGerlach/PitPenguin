
class World {
    penguin = new Penguin();
    enemies = level1.enemies;
    endboss = level1.endboss;
    backgroundObjects = level1.backgroundObjects;
    poisonBottles = level1.poison;
    coin = level1.coin;
    heart = level1.heart;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = level1;
    statusBarHeart = new StatusBarHeart();
    statusBarCoin = new StatusBarCoin();
    statusBarPoison = new StatusBarPoison();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    activeThrownBottles = [];
    collectedCoins = 0;

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
        this.endboss.statusBarEndboss = this.statusBarEndboss;
    }

    run() {
        let runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectingPoison();
            this.checkCollectingCoin();
            this.checkCollectingHeart();
            this.checkCollisionWithPoison();
            this.checkEndbossCollisionWithPoison();
        }, 200);
        gameIntervals.push(runInterval);
    }

    /**
     * This function check if the pangion can throw poison bottles. When the user push D and es sind poison bottles vorhanden, kann geworfen werden.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.penguin.poison > 0) {
            this.throwBottle();
        }
    }

    throwBottle() {
        if (this.penguin.poison > 0) {
            let bottle = new ThrowableObject(this.penguin.x + 190, this.penguin.y + 130);
            this.throwableObjects.push(bottle);
            this.penguin.poison--;
            this.statusBarPoison.setPercentage(this.penguin.poison * 10);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.penguin.isJumpOnEnemy(enemy) && this.penguin.isColliding(enemy) && this.penguin.isAboveGround()) {
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

    checkCollisionWithPoison() {
        if (this.throwableObjects.length === 0) return; // Keine Flaschen zum Überprüfen
        this.throwableObjects.forEach((poison) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isCollidingWithPoison(poison)) { // Prüfe auf Kollision mit dem Wurfobjekt
                    if (enemy instanceof Rabbit) { // Überprüfe, ob der Feind ein Rabbit ist
                        this.removeEnemy(enemy); // Entferne das Kaninchen
                    } else if (enemy instanceof Endboss) { // Überprüfe, ob der Feind der Endboss ist
                        this.enemy.endbossIsHurt(); // Reduziere Energie vom Endboss
                    }
                }
            });
        });
    }

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

    checkCollectingPoison() {
        this.poisonBottles.forEach((poison) => {
            if (this.penguin.isColliding(poison)) {
                this.collectPoison(poison);
            }
        });
    }

    collectPoison(poison) {
        const index = this.level.poison.findIndex(p => p.id === poison.id);
        if (index !== -1) {
            this.level.poison.splice(index, 1);
            this.penguin.poison++;
            this.statusBarPoison.setPercentage(this.penguin.poison * 10);
        }
    }

    enoughPoison() {
        if (this.penguin.poison == 100) {
            return this.penguin.poison == 100;
        }
    }

    checkCollectingCoin() {
        this.level.coin.forEach((coin) => {
            if (this.penguin.isColliding(coin)) {
                this.collectingCoin(coin);
            }
        });
    }

    collectingCoin(coin) {
        if (this.penguin.coin < 100) {
            this.penguin.coin += 5;
            if (this.penguin.coin > 100) {
                this.penguin.coin = 100;
            }
        }
        this.collectedCoins += 1;
        this.statusBarCoin.setPercentage(this.penguin.coin);
        this.removeCoin(coin);
    }

    checkCollectingHeart() {
        this.level.heart.forEach((heart) => {
            if (this.penguin.isColliding(heart)) {
                this.collectingHeart(heart);
            }
        });
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
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHeart);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarPoison);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.poisonBottles);
        this.addObjectsToMap(this.level.heart);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.level.endboss);
        this.addToMap(this.penguin);
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

    /**
     * This function remove the collected coin from the canvas and splice it out of the array.
     * 
     * @param {variable for a path} coin 
     */
    removeCoin(coin) {
        const indexOfCoin = this.level.coin.indexOf(coin);
        if (indexOfCoin > -1) {
            this.level.coin.splice(indexOfCoin, 1);
        }
    }

    /**
     * This function remove the collected heart from the canvas and splice it out of the array.
     * 
     * @param {variable for a path} heart 
     */
    removeHeart(heart) {
        const indexOfHeart = this.level.heart.indexOf(heart);
        if (indexOfHeart > -1 && this.penguin.energy < 100) {
            this.level.heart.splice(indexOfHeart, 1);
        }
    }

    /**
     * This function remove the killed enemy from the canvas and splice it out of the array.
     * 
     * @param {varable for a path} enemy 
     */
    removeEnemy(enemy) {
        const indexOfEnemy = this.level.enemies.indexOf(enemy);
        if (indexOfEnemy > -1) {
            this.level.enemies.splice(indexOfEnemy, 1);
        }
    }
}
