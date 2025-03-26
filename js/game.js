
let canvas;
let world;
let keyboard = new Keyboard();
background_sound = new Audio('audio/background.mp3');
let gameIntervals = [];


function init() {
    canvas = document.getElementById('canvas');
    setLevel();
    world = new World(canvas, keyboard);
    mobileButtonsTouched();
    mobileButtonsNotTouched();
}

function stopGame() {
    gameIntervals.forEach(intervalId => clearInterval(intervalId)); // Stoppe alle Intervalle
}

function showWinScreen() {
    if (stopGame) {
        document.body.innerHTML += generateWinScreenHtml();
    }
}

function showLoseScreen() {
    if (stopGame) {
        document.body.innerHTML += generateLoseSrceenHtml();
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
  
  function startGame() {
    const startScreen = document.getElementById('startScreen');
    const canvas = document.getElementById('canvas');
    const headline = document.getElementById('headline');
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    headline.classList.remove('d-none');
    init();
  }

// function showInfoBox() {
//     const instructionsBox = document.getElementById('instructionsBox');
//     instructionsBox.innerHTML += generateInfoBoxHtml();
//     checkScreen();
// }

// window.addEventListener("resize", checkScreen);

// function startGame() {
//     const startScreen = document.getElementById('startScreen');
//     const canvas = document.getElementById('canvas');
//     const headline = document.getElementById('headline');
//     startScreen.classList.add('d-none');
//     canvas.classList.remove('d-none');
//     headline.classList.remove('d-none');
//     init();
//     showMobileButtons();
//     this.background_sound.play();
// }

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
  
  function backToMainScreen() {
    const arrowBack = document.getElementById('arrow_back');
    const instructionsBox = document.getElementById('instructionsBox');
    instructionsBox.innerHTML = '';
    showInfoBox();
    arrowBack.classList.add('d-none');
  }

function showMobileButtons() {
    buttonBoxLeft = document.getElementById('btnBoxLeft');
    buttonBoxRight = document.getElementById('btnBoxRight');
    if (window.innerWidth <= 915) {
        buttonBoxLeft.classList.remove('d-none');
        buttonBoxRight.classList.remove('d-none');
    }
}

function showFullscreen(element) {
    let fullscreen = document.getElementById('fullscreen');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }

 function stopSound() {
    this.background_sound.pause();
 }
}