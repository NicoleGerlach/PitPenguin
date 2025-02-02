let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown" , (e) => {
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

window.addEventListener("keyup" , (e) => {
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

function howToPlay() {
    const instructionsBox = document.getElementById('instructionsBox');
    const directionsContainer = document.getElementById('directionsContainer');
    const impressum = document.getElementById('impressum');
    const backwardsAboutGame = document.getElementById('backwardsAboutGame');
    directionsContainer.classList.add('d-none');
    impressum.classList.add('d-none');
    instructionsBox.innerHTML = '';
    instructionsBox.innerHTML += generateAboutGameHtml();
    backwardsAboutGame.classList.remove('d-none');
}

function backFromHowToPlay() {
    const instructionsBox = document.getElementById('instructionsBox');
    const directionsContainer = document.getElementById('directionsContainer');
    const impressum = document.getElementById('impressum');
    const backwardsHowToPlay = document.getElementById('backwardsAboutGame');
    const aboutGame = document.getElementById('aboutGame');
    instructionsBox.innerHTML = '';
    instructionsBox.innerHTML += generateInfoBoxHtml();
    directionsContainer.classList.remove('d-none');
    impressum.classList.remove('d-none');
    backwardsHowToPlay.classList.add('d-none');
    aboutGame.classList.add('d-none');
}

function showImpressum() {
    const instructionsBox = document.getElementById('instructionsBox');
    const directionsContainer = document.getElementById('directionsContainer');
    const impressum = document.getElementById('impressum');
    const backwardsImpressum = document.getElementById('backwardsImpressum');
    directionsContainer.classList.add('d-none');
    impressum.classList.add('d-none');
    instructionsBox.innerHTML = '';
    instructionsBox.innerHTML += generateImpressumHtml();
    backwardsImpressum.classList.remove('d-none');
}

function backFromAbouImpressum() {
    const instructionsBox = document.getElementById('instructionsBox');
    const directionsContainer = document.getElementById('directionsContainer');
    const impressum = document.getElementById('impressum');
    const backwardsImpressum = document.getElementById('backwardsImpressum');
    instructionsBox.innerHTML = '';
    instructionsBox.innerHTML += generateInfoBoxHtml();
    directionsContainer.classList.remove('d-none');
    impressum.classList.remove('d-none');
    backwardsImpressum.classList.add('d-none');

}
