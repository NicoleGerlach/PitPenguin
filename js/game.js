let canvas;
let world;
let keyboard = new Keyboard();
let gameSounds = new GameSounds();
let gameIntervals = [];
let isMute = false;
let isGameActive = false;

/**
 * Initializes the game to start playing.
 */
function init() {
  canvas = document.getElementById('canvas');
  preloadImages();
}

/**
 * Recursively preloads all image paths into HTMLImageElements and returns them
 * as a structured object that mirrors the input `paths` structure.
 *
 * @param {Object} paths - Nested object of image paths (strings) grouped by category.
 * @returns {Promise<Object>} A promise that resolves with the same structure, but with loaded HTMLImageElements.
 */
function preloadImagesStructured(paths) {
  const result = {};
  collectPathsAsImages(paths, result);
  const allImages = extractAllImages(result);
  return waitForAllImagesToLoad(allImages, result);
}

/**
 * Recursively walks through the input object and replaces all image path strings
 * with new HTMLImageElement instances assigned to the same keys.
 *
 * @param {Object} src - The original image path object (e.g., IMAGE_PATHS).
 * @param {Object} target - The destination object to fill with HTMLImageElements.
 */
function collectPathsAsImages(src, target) {
  for (const key in src) {
    const val = src[key];
    if (typeof val === 'string') {
      const img = new Image();
      img.src = val;
      target[key] = img;
    } else {
      target[key] = Array.isArray(val) ? [] : {};
      collectPathsAsImages(val, target[key]);
    }
  }
}

/**
 * Collects all HTMLImageElement instances from a nested object structure.
 *
 * @param {Object} obj - The structured object containing nested image elements.
 * @returns {HTMLImageElement[]} A flat array of all HTMLImageElements found.
 */
function extractAllImages(obj) {
  const list = [];
  (function collect(o) {
    for (const key in o) {
      const val = o[key];
      if (val instanceof HTMLImageElement) {
        list.push(val);
      } else if (typeof val === 'object') {
        collect(val);
      }
    }
  })(obj);
  return list;
}

/**
 * Returns a promise that resolves once all given images have finished loading or failed.
 *
 * @param {HTMLImageElement[]} images - Array of images to wait for.
 * @param {Object} result - The final structured object to resolve with.
 * @returns {Promise<Object>} A promise resolving to the result object when all images are ready.
 */
function waitForAllImagesToLoad(images, result) {
  return new Promise((resolve) => {
    let loaded = 0;
    images.forEach((img) => {
      img.onload = img.onerror = () => {
        if (++loaded === images.length) {
          resolve(result);
        }
      };
    });
  });
}

/**
 * Preloads all image assets defined in the IMAGE_PATHS object using a structured loading method.
 *
 * This function also manages UI feedback for the user:
 * - Shows a loading message while images are being loaded.
 * - Hides the message once loading is complete.
 * - Stores the loaded image objects in the global `LOADED_IMAGES` variable.
 * - Calls `showInfoBox()` to display the game's info screen once everything is ready.
 *
 * If an error occurs during image loading, it is logged to the console.
 */
function preloadImages() {
  document.getElementById('loadingMessage').classList.remove('d-none');
  preloadImagesStructured(IMAGE_PATHS)
    .then((loadedImages) => {
      window.LOADED_IMAGES = loadedImages;
      document.getElementById('loadingMessage').classList.add('d-none');
      showInfoBox();
    })
    .catch((err) => {
      console.error('Error loading images:', err);
    });
}

/**
 * Starts the game by hiding the start screen, showing the canvas,
 * initializing the game world and enabling UI elements and sounds.
 */
function startGame() {
  const startScreen = document.getElementById('startScreen');
  const canvas = document.getElementById('canvas');
  startScreen.classList.add('d-none');
  canvas.classList.remove('d-none');
  const level1 = createLevel1();
  world = new World(canvas, keyboard, level1);
  showHeadlineInDesktopMode();
  showMobileButtons();
  showGameButtons();
  gameSounds.playBackgroundSound();
  isGameActive = true;
  mobileButtonsTouched();
  mobileButtonsNotTouched();
}

/**
 * Stops the game by clearing all intervals and stopping all sounds.
 */
function stopGame() {
  isGameActive = false;
  gameIntervals.forEach((intervalId) => clearInterval(intervalId)); // Stoppe alle Intervalle
  stopSound();
}

/**
 * Resets the end screen and restarts the game.
 */
function playAgain() {
  const endScreenContainer = document.getElementById('endScreen');
  endScreenContainer.classList.remove('active'); // Entferne die aktive Klasse
  endScreenContainer.innerHTML = ''; // Leere den Container
  world.penguin.resetInactivityTimer();
  startGame(); // Starte das Spiel erneut
}

/**
 * Resets the end screen, canvas and navigates to the main menu.
 */
function backToMenu() {
  stopGame();
  const endScreenContainer = document.getElementById('endScreen');
  const canvas = document.getElementById('canvas');
  const startScreen = document.getElementById('startScreen');
  endScreenContainer.classList.remove('active');
  endScreenContainer.innerHTML = '';
  canvas.classList.add('d-none');
  startScreen.classList.remove('d-none');
  hideMobileButtons();
  showInfoBox();
}

/**
 * Plays the background sound if the game is not muted.
 */
function playSound() {
  if (isMute == false) {
    gameSounds.playBackgroundSound();
    gameSounds.playBackgroundSound.currentTime = 0;
  }
}

/**
 * Stops all currently playing game sounds.
 */
function stopSound() {
  gameSounds.stopBackgroundSound();
  gameSounds.stopWalkingPenguinSound();
  gameSounds.stopJumpingPenguinSound();
  gameSounds.stopHurtPenguinSound();
  gameSounds.stopSnoringPenguinSound();
  gameSounds.stopHurtEndbossSound();
}

/**
 * Toggles the mute status and updates the mute button image accordingly.
 */
function toggleMuteImg() {
  let muteButton = document.getElementById('mute');
  gameSounds.toggleMuteSound();
  if (gameSounds.isMute) {
    muteButton.src = './assets/img/mute.png'; // Change to mute icon
  } else {
    muteButton.src = './assets/img/unmute.png'; // Change to unmute icon
  }
}

/**
 * Listens for keydown events and updates the keyboard input state accordingly.
 * Arrow keys, spacebar, and "D" are used to control the game character.
 */
window.addEventListener('keydown', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

/**
 * Listens for keyup events and resets the corresponding keyboard input state.
 * This stops character movement or actions when keys are released.
 */
window.addEventListener('keyup', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
    keyboard.D_canThrow = true;
  }
});

/**
 * Attaches touchstart event listeners to mobile control buttons.
 * Updates the keyboard state when virtual buttons are touched,
 * allowing mobile users to control the game character.
 */
function mobileButtonsTouched() {
  document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById('btnJump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById('btnPoison').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
}

/**
 * Attaches touchend event listeners to mobile control buttons.
 * Resets the keyboard state when virtual buttons are released,
 * ensuring that movement or actions stop correctly on mobile devices.
 */
function mobileButtonsNotTouched() {
  document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
  document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById('btnJump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
  document.getElementById('btnPoison').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}