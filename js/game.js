let canvas;
let world;
let keyboard = new Keyboard();
let gameSounds = new GameSounds();
let gameIntervals = [];
let isMute = false;
let isFullscreen = false;
let isGameActive = false;

/**
 * Initializes the game to start playing.
 */
function init() {
    canvas = document.getElementById('canvas');
    setLevel();
    world = new World(canvas, keyboard);
    showInfoBox();
}

/**
 * Displays the info box by updating the html content.
 */
function showInfoBox() {
    const instructionsBox = document.getElementById('instructionsBox');
    instructionsBox.innerHTML += generateInfoBoxHtml();
}

/**
 * Toggles the fullscreen mode.
 */
function handleFullscreenToggle() {
    showFullscreen();
    toggleFullscreenImg();
}

/**
 * Opens fullscreen mode for the entire document.
 */
function showFullscreen() {
    const elem = document.documentElement;
    (elem.requestFullscreen || elem.webkitRequestFullscreen).call(elem);
}

function showHeadlineInDesktopMode() {
    document.querySelector('.fullscreen').classList.add('game-started');
}

function startGame() {
    const startScreen = document.getElementById('startScreen');
    const canvas = document.getElementById('canvas');
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    showHeadlineInDesktopMode();
    init();
    showMobileButtons();
    showGameButtons();
    gameSounds.playBackgroundSound();
    isGameActive = true;
}

function showContent(content) {
    const arrowBack = document.getElementById('arrow_back');
    const instructionsBox = document.getElementById('instructionsBox');
    const h2Headline = document.getElementById('h2_headline');
    instructionsBox.innerHTML = '';
    if (content === 'startGame') {
        startGame();
    } else if (content === 'howToPlay') {
        instructionsBox.innerHTML = generateAboutGameHtml();
        h2Headline.classList.add('active');
        arrowBack.classList.remove('d-none');
    } else if (content === 'imprint') {
        instructionsBox.innerHTML = generateImprintHtml();
        h2Headline.classList.add('active');
        arrowBack.classList.remove('d-none');
    }
}

function backToMainScreen() {
    const arrowBack = document.getElementById('arrow_back');
    const instructionsBox = document.getElementById('instructionsBox');
    const h2Headline = document.getElementById('h2_headline');
    instructionsBox.innerHTML = '';
    showInfoBox();
    h2Headline.classList.remove('active');
    arrowBack.classList.add('d-none');
}

function showGameButtons() {
    const gameButtons = document.getElementById('gameButtons');
    gameButtons.classList.remove('d-none');
    gameButtons.classList.add('game-buttons-active');
}

function hideGameButtons() {
    const gameButtons = document.getElementById('gameButtons');
    gameButtons.classList.add('d-none');
    gameButtons.classList.remove('game-buttons-active');
}

function showMobileButtons() {
    const container = document.getElementById('btnsContainer');
    container.classList.remove('d-none');
    container.classList.add('mobile-buttons-active');
}

function hideMobileButtons() {
    const container = document.getElementById('btnsContainer');
    container.classList.remove('mobile-buttons-active');
    container.classList.add('d-none');
}

function stopGame() {
    isGameActive = false;
    gameIntervals.forEach(intervalId => clearInterval(intervalId)); // Stoppe alle Intervalle
    stopSound();
}

function showEndScreen(isWin) {
    hideGameButtons();
    const endScreenContainer = document.getElementById('endScreen');
    if (isWin) {
        endScreenContainer.innerHTML = generateWinScreenHtml(); // Generiere den Gewinnbildschirm
    } else {
        endScreenContainer.innerHTML = generateLoseSrceenHtml(); // Generiere den Verlustbildschirm
    }
    endScreenContainer.classList.add('active'); // Zeige den Endscreen an
}

function playAgain() {
    const endScreenContainer = document.getElementById('endScreen');
    endScreenContainer.classList.remove('active'); // Entferne die aktive Klasse
    endScreenContainer.innerHTML = ''; // Leere den Container
    startGame(); // Starte das Spiel erneut
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleFullscreenImg() {
    let fullscreenImg = document.getElementById('fullscreenImg');
    if (isFullscreen === false) { // Wenn wir nicht im Vollbild sind
        fullscreenImg.src = './assets/img/exit-fullscreen.png'; // Bild auf "Exit Fullscreen" ändern
        showFullscreen(); // Vollbildmodus aktivieren
    } else { // Wenn wir im Vollbild sind
        exitFullscreen(); // Verlasse den Vollbildmodus
    }
}

// Event Listener für Änderungen des Vollbildmodus
document.addEventListener('fullscreenchange', () => {
    isFullscreen = !!document.fullscreenElement; // Aktualisiere den Status basierend auf dem aktuellen Zustand
    let fullscreenImg = document.getElementById('fullscreenImg');
    if (isFullscreen) {
        fullscreenImg.src = './assets/img/exit-fullscreen.png'; // Bild auf "Exit Fullscreen" ändern
    } else {
        fullscreenImg.src = './assets/img/fullscreen.png'; // Bild auf "Vollbild" ändern
    }
});

function playSound() {
    if (isMute == false) {
        gameSounds.playBackgroundSound();
        gameSounds.playBackgroundSound.currentTime = 0;
    }
}

function stopSound() {
    gameSounds.stopBackgroundSound();
    gameSounds.stopWalkingPenguinSound();
    gameSounds.stopJumpingPenguinSound();
    gameSounds.stopHurtPenguinSound();
    gameSounds.stopSnoringPenguinSound();
    gameSounds.stopHurtEndbossSound();
}

function toggleMuteImg() {
    let muteButton = document.getElementById('mute');
    gameSounds.toggleMuteSound();
    if (gameSounds.isMute) {
        muteButton.src = './assets/img/mute.png'; // Bild auf "Mute" ändern
    } else {
        muteButton.src = './assets/img/unmute.png'; // Bild auf "Unmute" ändern
    }
}

window.addEventListener("keydown", (e) => {
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
})

window.addEventListener("keyup", (e) => {
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
    }
})

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