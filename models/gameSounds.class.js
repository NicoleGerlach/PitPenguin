class GameSounds {
    constructor() {
        this.background_sound = new Audio('audio/background.mp3');
        this.background_sound.loop = true;
        this.walking_penguin_sound = new Audio('audio/walking.mp3');
        this.jumping_penguin_sound = new Audio('audio/jump.mp3');
        this.hurt_penguin_sound = new Audio ('audio/ouch.mp3');
        this.snoring_penguin_sound = new Audio ('audio/snoring.mp3');
        this.snoring_penguin_sound.loop = true;
        this.hurt_endboss_sound = new Audio('audio/orc-grunt.mp3');
        this.win_sound = new Audio('audio/win-sound.mp3');
        this.lose_sound = new Audio ('audio/lose-sound.mp3');
        this.isMute = false;
    }

    playBackgroundSound() {
        if (!this.isMute) {
            this.background_sound.play();
            this.background_sound.currentTime = 0;
        }
    }

    stopBackgroundSound() {
        this.background_sound.pause();
    }

    playWalkingPenguinSound() {
        if (!this.isMute) {
            this.walking_penguin_sound.play();
        }
    }

    stopWalkingPenguinSound() {
        this.walking_penguin_sound.pause();
    }

    playJumpingPenguinSound() {
        if (!this.isMute) {
            this.jumping_penguin_sound.play();
        }
    }

    stopJumpingPenguinSound() {
        this.walking_penguin_sound.pause();
    }

    playHurtPenguinSound() {
        if (!this.isMute) {
            this.hurt_penguin_sound.play();
        }
    }

    stopHurtPenguinSound() {
        this.walking_penguin_sound.pause();
    }

    playSnoringPenguinSound() {
        if (!this.isMute) {
            this.snoring_penguin_sound.play();
        }
    }

    stopSnoringPenguinSound() {
        this.snoring_penguin_sound.pause();
    }

    playHurtEndbossSound() {
        if (!this.isMute) {
            this.hurt_endboss_sound.play();
        }
    }

    stopHurtEndbossSound() {
        this.walking_penguin_sound.pause();
    }
    
    playWinSound() {
        if (!this.isMute) {
            this.win_sound.play();
        }
    }

    playLoseSound() {
        if (!this.isMute) {
            this.lose_sound.play();
        }
    }
    
    toggleMuteSound() {
        this.isMute = !this.isMute;
        if (this.isMute) {
            this.stopBackgroundSound();
            this.stopSnoringPenguinSound();
        } else {
            this.playBackgroundSound();
            this.playSnoringPenguinSound();
        }
    }

}