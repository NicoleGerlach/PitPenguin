
let canvas;
let world;
let keyboard = new Keyboard();
background_sound = new Audio('audio/background.mp3')
background_sound.loop = true; // Setze die Loop-Eigenschaft auf true

let gameIntervals = [];
let isMute = false;
let isFullscreen = false;


function init() {
    canvas = document.getElementById('canvas');
    setLevel();
    world = new World(canvas, keyboard);
    mobileButtonsTouched();
    mobileButtonsNotTouched();
    showMobileButtons();
}

function stopGame() {
    gameIntervals.forEach(intervalId => clearInterval(intervalId)); // Stoppe alle Intervalle
}

function showEndScreen(isWin) {
    const endScreenContainer = document.getElementById('endScreenContainer');
    // Setze den Inhalt basierend auf dem Ergebnis
    if (isWin) {
        endScreenContainer.innerHTML = generateWinScreenHtml(); // Generiere den Gewinnbildschirm
    } else {
        endScreenContainer.innerHTML = generateLoseSrceenHtml(); // Generiere den Verlustbildschirm
    }
    // Blende den Container ein oder aus
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
    if (window.innerWidth < window.innerHeight && window.innerWidth <= 915) {
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
    playSound();
}

// function playAgain() {
//     const winScreen = document.getElementById('winContainer');
//     const loseScreen = document.getElementById('loseContainer');
//     winScreen.classList.add('d-none');
//     loseScreen.classList.add('d-none');
//     startGame();
// }

function playAgain() {
    const endScreenContainer = document.getElementById('endScreenContainer');
    // Blende den Endscreen-Container aus
    endScreenContainer.classList.remove('active'); // Entferne die aktive Klasse
    // Optional: Setze den Inhalt des Containers zurück
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

// Funktion zum Aktivieren des Vollbildmodus
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

// Funktion zum Verlassen des Vollbildmodus
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
        this.background_sound.play();
        this.background_sound.currentTime = 0;
    }
}

function stopSound() {
    this.background_sound.pause();
}

function toggleMuteImg() {
    let mute = document.getElementById('mute');
    if (isMute === false) {
        // Wenn der Sound nicht stummgeschaltet ist
        mute.src = 'img/mute.png'; // Bild auf "Mute" ändern
        stopSound(); // Stoppe den Sound
        isMute = true; // Setze den Status auf stumm
    } else {
        // Wenn der Sound stummgeschaltet ist
        mute.src = 'img/unmute.png'; // Bild auf "Unmute" ändern
        isMute = false; // Setze den Status auf unmuted
        playSound(); // Spiele den Sound ab, wenn er nicht stummgeschaltet ist
    }
}
