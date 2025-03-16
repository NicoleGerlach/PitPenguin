
class MovableObject extends DrawableObject {
    speed = 0.15
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    poison = 0;
    coin = 35;
    heart = 0;
    // gameIntervals = [];

    applyGravity() {
        let interval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
        console.log('Id von gravity ist:', interval);        
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    isColliding(mo) {
        return (this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    isJumpOnEnemy(enemy) {
        return (this.y + this.height - this.offset.bottom - 30 > enemy.y + enemy.offset.top)
    }

    isCollidingWithPoison(poison) {
        return (this.x + this.width - this.offset.right > poison.x + poison.offset.left &&
            this.x + this.offset.left < poison.x + poison.width - poison.offset.right &&
            this.y + this.height - this.offset.bottom > poison.y + poison.offset.top &&
            this.y + this.offset.top < poison.y + poison.height - poison.offset.bottom
        );
    }

    hit() {
        this.energy -= 8;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.3;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    // stopGame() {
    //     this.gameIntervals.forEach(id => clearInterval(id));
    //     console.log("Alle Intervalle gestoppt:", this.gameIntervals);
    //     this.gameIntervals = []; // Leere das Array nach dem Stoppen
    // }
}