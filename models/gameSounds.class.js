/**
 * Manages all game-related sounds and their mute states.
 */
class GameSounds {

  /**
   * Initializes audio elements.
   * Plays background sound and the snoring sound in a loop.
   * Variable to indicate whether the sounds ar muted or not.
   */
  constructor() {
    this.background_sound = new Audio('./assets/audio/background.mp3');
    this.background_sound.loop = true;
    this.walking_penguin_sound = new Audio('./assets/audio/walking.mp3');
    this.jumping_penguin_sound = new Audio('./assets/audio/jump.mp3');
    this.hurt_penguin_sound = new Audio('./assets/audio/ouch.mp3');
    this.snoring_penguin_sound = new Audio('./assets/audio/snoring.mp3');
    this.snoring_penguin_sound.loop = true;
    this.hurt_endboss_sound = new Audio('./assets/audio/orc-grunt.mp3');
    this.win_sound = new Audio('./assets/audio/win-sound.mp3');
    this.lose_sound = new Audio('./assets/audio/lose-sound.mp3');
    this.isMute = false;
  }

  /**
   * Plays the background sound if it's not mute.
   * Reset the current time to 0 to loop the sound.
   */
  playBackgroundSound() {
    if (!this.isMute) {
      this.background_sound.play();
      this.background_sound.currentTime = 0;
    }
  }

  /**
   * Stops the background sound.
   */
  stopBackgroundSound() {
    this.background_sound.pause();
  }

  /**
   * Plays the walking sound for penguin if it's not mute.
   */
  playWalkingPenguinSound() {
    if (!this.isMute) {
      this.walking_penguin_sound.play();
    }
  }

  /**
   * Stops the walking sound for penguin.
   */
  stopWalkingPenguinSound() {
    this.walking_penguin_sound.pause();
  }

  /**
   * Plays the jumping sound for penguin if it's not mute.
   */
  playJumpingPenguinSound() {
    if (!this.isMute) {
      this.jumping_penguin_sound.play();
    }
  }

  /**
   * Stops the jumping sound for penguin.
   */
  stopJumpingPenguinSound() {
    this.walking_penguin_sound.pause();
  }

  /**
   * Plays the hurt sound for penguin if it's not mute.
   */
  playHurtPenguinSound() {
    if (!this.isMute) {
      this.hurt_penguin_sound.play();
    }
  }

  /**
   * Stops the hurt sound for penguin.
   */
  stopHurtPenguinSound() {
    this.walking_penguin_sound.pause();
  }

  /**
  * Plays the snoring sound for penguin if it's not mute.
  * Reset the current time to 0 to loop the sound.
  */
  playSnoringPenguinSound() {
    if (!this.isMute) {
      this.snoring_penguin_sound.play();
      this.snoring_penguin_sound.currentTime = 0;
    }
  }

  /**
   * Stops the snoring sound for penguin.
   */
  stopSnoringPenguinSound() {
    this.snoring_penguin_sound.pause();
  }

  /**
   * Plays the hurt sound for endboss if it's not mute.
   */
  playHurtEndbossSound() {
    if (!this.isMute) {
      this.hurt_endboss_sound.play();
    }
  }

  /**
   * Stops the hurt sound for endboss.
   */
  stopHurtEndbossSound() {
    this.walking_penguin_sound.pause();
  }

  /**
   * Plays the winner sound if it's not mute.
   */
  playWinSound() {
    if (!this.isMute) {
      this.win_sound.play();
    }
  }

  /**
   * Plays the loser sound if it's not mute.
   */
  playLoseSound() {
    if (!this.isMute) {
      this.lose_sound.play();
    }
  }

  /**
   * Toggles the mute state of the sound.
   */
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