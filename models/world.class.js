
class World {
    penguin = new Penguin();
    enemies = level1.enemies;
    endboss = level1.endboss;
    backgroundObjects = level1.backgroundObjects;
    poisonBottles = level1.poison;
    coin = level1.coin
    heart = level1.heart
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = level1;
    statusBarHeart = new StatusBarHeart();
    statusBarCoin = new StatusBarCoin();
    statusBarPoison = new StatusBarPoison();
    throwableObjects = [];

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
            this.checkCollisionWithPoison();
            this.checkEndbossCollisionWithPoison();
        }, 200);
        // console.log('Energy:', this.penguin.energy);
        // console.log('Coin:', this.penguin.coin);
        // console.log('Poison:', this.penguin.poison);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.penguin.poison > 0) {
            this.throwBottle(); // Rufe die throwBottle-Methode auf
        }
    }

    throwBottle() {
        console.log('Flaschen zum Werfen:', this.penguin.poison);

        if (this.penguin.poison > 0) {
            let bottle = new ThrowableObject(this.penguin.x + 190, this.penguin.y + 130);
            this.throwableObjects.push(bottle);
            this.penguin.poison--;
            this.statusBarPoison.setPercentage(this.penguin.poison * 10);
        } else {
            console.log('Keine Flaschen mehr zum Werfen!');
        }
    }

    // bottleLanded(bottle) {
    //     const index = this.activeThrownBottles.indexOf(bottle);
    //     if (index > -1) {
    //         this.activeThrownBottles.splice(index, 1);
    //         console.log('Flasche ist gelandet und entfernt:', bottle);
    //     }
    // }

    // bottleLanded(bottle) {
    //     const index = this.activeThrownBottles.indexOf(bottle);
    //     if (index > -1) {
    //         this.activeThrownBottles.splice(index, 1); // Entferne sie aus dem aktiven Array
    //         console.log('Flasche ist gelandet und entfernt:', bottle);
    //     }
    // }

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
    }

    checkCollisionWithPoison() {
        if (this.throwableObjects.length === 0) return; // Keine Flaschen zum Überprüfen
        this.throwableObjects.forEach((poison) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isCollidingWithPoison(poison)) { // Prüfe auf Kollision mit dem Wurfobjekt
                    if (enemy instanceof Rabbit) { // Überprüfe, ob der Feind ein Rabbit ist
                        console.log("Rabbit wurde vom Gift getroffen!");
                        this.removeEnemy(enemy); // Entferne das Kaninchen
                        // this.removePoison(poison); // Entferne das Giftobjekt
                    } else if (enemy instanceof Endboss) { // Überprüfe, ob der Feind der Endboss ist
                        console.log("Endboss wurde vom Gift getroffen!");
                        this.enemy.endbossIsHurt(); // Reduziere Energie vom Endboss
                        // this.removePoison(poison); // Entferne das Giftobjekt
                    }
                }
            });
        });
    }

    checkEndbossCollisionWithPoison() {
        if (this.throwableObjects.length === 0) return;
        this.throwableObjects.forEach((poison) => {
            if (this.endboss.isCollidingWithPoison(poison)) {
                console.log('Endboss wurde vom Gift getroffen!');
                this.endboss.hit(); // Rufe die Hit-Methode auf
            }
        });
    }

    checkCollectingPoison() {
        this.poisonBottles.forEach((poison) => {
            if (this.penguin.isColliding(poison)) {
                this.collectPoison(poison);
            }
        });
        // console.log('Poison:', this.penguin.poison);
    }

    collectPoison(poison) {
        console.log('Aktuelle Flaschenanzahl:', this.penguin.poison);
        const index = this.level.poison.findIndex(p => p.id === poison.id);

        if (index !== -1) {
            this.level.poison.splice(index, 1);
            this.penguin.poison++;

            console.log('Giftflaschen gesammelt:', this.penguin.poison);
            this.statusBarPoison.setPercentage(this.penguin.poison * 10);
        } else {
            console.log('Flasche nicht gefunden zum Entfernen:', poison);
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
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHeart);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarPoison);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.poisonBottles);
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
