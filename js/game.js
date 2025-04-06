
let canvas;
let world;
let keyboard = new Keyboard();
let gameSounds = new GameSounds();

let gameIntervals = [];
let isMute = false;
let isFullscreen = false;
let isGameover = false;


function init() {
    canvas = document.getElementById('canvas');
    setLevel();
    world = new World(canvas, keyboard);
    mobileButtonsTouched();
    mobileButtonsNotTouched();
    showMobileButtons();
}

function stopGame() {
    isGameover = true;
    gameIntervals.forEach(intervalId => clearInterval(intervalId)); // Stoppe alle Intervalle
    stopSound();
}

function showEndScreen(isWin) {
    const endScreenContainer = document.getElementById('endScreenContainer');
    if (isWin) {
        endScreenContainer.innerHTML = generateWinScreenHtml(); // Generiere den Gewinnbildschirm
    } else {
        endScreenContainer.innerHTML = generateLoseSrceenHtml(); // Generiere den Verlustbildschirm
    }
    endScreenContainer.classList.add('active'); // Zeige den Endscreen an
}

function showMobileButtons() {
    let btnsContainer = document.getElementById('btnsContainer');
    if (window.innerWidth < 915) {
        btnsContainer.classList.remove('d-none'); // Entferne die Klasse d-none
    } else {
        btnsContainer.classList.add('d-none'); // Füge die Klasse d-none hinzu
    }
}

// Event-Listener für Fenstergrößenänderungen
window.addEventListener('resize', showMobileButtons);

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

function checkScreen() {
    const screen = document.getElementById('rotateScreen')
    if (window.innerWidth < window.innerHeight && window.innerWidth < 1000) {
        screen.classList.remove('d-none');
    } else {
        screen.classList.add('d-none');
    }
}

function showInfoBox() {
    const instructionsBox = document.getElementById('instructionsBox');
    instructionsBox.innerHTML += generateInfoBoxHtml();
}

function showInfoBox() {
    const instructionsBox = document.getElementById('instructionsBox');
    instructionsBox.innerHTML += generateInfoBoxHtml();
    checkScreen();
}

window.addEventListener("resize", checkScreen);

function startGame() {
    const startScreen = document.getElementById('startScreen');
    const canvas = document.getElementById('canvas');
    const headline = document.getElementById('headline');
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    headline.classList.remove('d-none');
    init();
    showMobileButtons();
    showGameButtons();
    gameSounds.playBackgroundSound();
}

function playAgain() {
    const endScreenContainer = document.getElementById('endScreenContainer');
    endScreenContainer.classList.remove('active'); // Entferne die aktive Klasse
    endScreenContainer.innerHTML = ''; // Leere den Container
    startGame(); // Starte das Spiel erneut
}

function showContent(content) {
    const arrowBack = document.getElementById('arrow_back');
    const instructionsBox = document.getElementById('instructionsBox');
    instructionsBox.innerHTML = '';
    if (content === 'startGame') {
        startGame();
    } else if (content === 'howToPlay') {
        instructionsBox.innerHTML = generateAboutGameHtml();
        arrowBack.classList.remove('d-none');
    } else if (content === 'imprint') {
        instructionsBox.innerHTML = generateImprintHtml();
        arrowBack.classList.remove('d-none');
    }
}

function showGameButtons() {
    let gameButtons = document.getElementById('gameButtons');
    gameButtons.classList.remove('d-none');
    gameButtons.style.display = 'flex';
}

function backToMainScreen() {
    const arrowBack = document.getElementById('arrow_back');
    const instructionsBox = document.getElementById('instructionsBox');
    instructionsBox.innerHTML = '';
    showInfoBox();
    arrowBack.classList.add('d-none');
}

function showFullsrceen() {
    let elem = document.documentElement; // Das gesamte Dokument
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
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
        fullscreenImg.src = 'img/exit-fullscreen.png'; // Bild auf "Exit Fullscreen" ändern
        showFullsrceen(); // Vollbildmodus aktivieren
    } else { // Wenn wir im Vollbild sind
        exitFullscreen(); // Verlasse den Vollbildmodus
    }
}

// Event Listener für Änderungen des Vollbildmodus
document.addEventListener('fullscreenchange', () => {
    isFullscreen = !!document.fullscreenElement; // Aktualisiere den Status basierend auf dem aktuellen Zustand
    let fullscreenImg = document.getElementById('fullscreenImg');
    if (isFullscreen) {
        fullscreenImg.src = 'img/exit-fullscreen.png'; // Bild auf "Exit Fullscreen" ändern
    } else {
        fullscreenImg.src = 'img/fullscreen.png'; // Bild auf "Vollbild" ändern
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
        muteButton.src = 'img/mute.png'; // Bild auf "Mute" ändern
    } else {
        muteButton.src = 'img/unmute.png'; // Bild auf "Unmute" ändern
    }
}

