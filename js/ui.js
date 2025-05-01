let isFullscreen = false;
let confettiInstance = null;

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

/**
 * Activates the headline for desktop view by adding a CSS class to the main container.
 * This class (`game-started`) is typically used to change styles such as visibility,
 * positioning, or transitions when the game has started on larger screens.
 */
function showHeadlineInDesktopMode() {
    document.querySelector('.fullscreen').classList.add('game-started');
}

/**
 * Displays the selected content (game, instructions or imprint)
 * and updates the UI elements accordingly.
 *
 * @param {string} content - The content type to display ('startGame', 'howToPlay' or 'imprint')
 */
function showContent(content) {
    const instructionsBox = document.getElementById('instructionsBox');
    instructionsBox.innerHTML = '';
    if (content === 'startGame') {
        startGame();
    } else if (content === 'howToPlay') {
        showContentHowToPlay();
    } else if (content === 'imprint') {
        showContentImprint();
    }
}

/**
 * Displays the content howToPlay.
 */
function showContentHowToPlay() {
    const arrowBack = document.getElementById('arrow_back');
    const h2Headline = document.getElementById('h2_headline');
    instructionsBox.innerHTML = generateAboutGameHtml();
    h2Headline.classList.add('active');
    arrowBack.classList.remove('d-none');
}

/**
 * Displays the content imprint.
 */
function showContentImprint() {
    const arrowBack = document.getElementById('arrow_back');
    const h2Headline = document.getElementById('h2_headline');
    instructionsBox.innerHTML = generateImprintHtml();
    h2Headline.classList.add('active');
    arrowBack.classList.remove('d-none');
}

/**
 * Returns to the main start screen and resets the UI elements.
 */
function backToMainScreen() {
    const arrowBack = document.getElementById('arrow_back');
    const instructionsBox = document.getElementById('instructionsBox');
    const h2Headline = document.getElementById('h2_headline');
    instructionsBox.innerHTML = '';
    showInfoBox();
    h2Headline.classList.remove('active');
    arrowBack.classList.add('d-none');
}

/**
 * Displays the game control buttons on screen.
 */
function showGameButtons() {
    const gameButtons = document.getElementById('gameButtons');
    gameButtons.classList.remove('d-none');
    gameButtons.classList.add('game-buttons-active');
}

/**
 * Hides the game control buttons from the screen.
 */
function hideGameButtons() {
    const gameButtons = document.getElementById('gameButtons');
    gameButtons.classList.add('d-none');
    gameButtons.classList.remove('game-buttons-active');
}

/**
 * Displays the mobile control buttons on the screen.
 */
function showMobileButtons() {
    const container = document.getElementById('btnsContainer');
    container.classList.remove('d-none');
    container.classList.add('mobile-buttons-active');
}

/**
 * Hides the mobile control buttons from the screen.
 */
function hideMobileButtons() {
    const container = document.getElementById('btnsContainer');
    container.classList.remove('mobile-buttons-active');
    container.classList.add('d-none');
}

/**
 * Displays the win or lose end screen based on the game result.
 * @param {boolean} isWin - True if the player won, false if lost.
 */
function showEndScreen(isWin) {
    hideGameButtons();
    const endScreenContainer = document.getElementById('endScreen');
    if (isWin) {
        endScreenContainer.innerHTML = generateWinScreenHtml();
        if (!confettiInstance) {
            confettiInstance = new Confetti('confettiCanvas', 150);
            confettiInstance.createParticles();
        }
    } else {
        endScreenContainer.innerHTML = generateLoseSrceenHtml();
    }
    endScreenContainer.classList.add('active');
}

/**
 * Exits fullscreen mode, using browser-specific methods if necessary.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Toggles fullscreen mode and updates the fullscreen icon accordingly.
 */
function toggleFullscreenImg() {
    let fullscreenImg = document.getElementById('fullscreenImg');
    if (isFullscreen === false) {
        fullscreenImg.src = './assets/img/exit-fullscreen.png';
        showFullscreen();
    } else {
        exitFullscreen();
    }
}

/**
 * Updates the fullscreen icon based on the current fullscreen state.
 * Triggered automatically when the fullscreen mode changes.
 */
document.addEventListener('fullscreenchange', () => {
    isFullscreen = !!document.fullscreenElement;
    let fullscreenImg = document.getElementById('fullscreenImg');
    if (isFullscreen) {
        fullscreenImg.src = './assets/img/exit-fullscreen.png';
    } else {
        fullscreenImg.src = './assets/img/fullscreen.png';
    }
});