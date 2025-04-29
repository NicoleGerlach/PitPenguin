/**
 * Generates the HTML markup for the game's main info box,
 * including the start game button, how-to-play instructions, and imprint link.
 *
 * @returns {string} HTML string representing the info box UI.
 */
function generateInfoBoxHtml() {
    return /*html*/ `
          <div id="directionsContainer" class="directions-container">
              <div class="directions-box">
                  <div onclick="showContent('startGame')" class="info-box">
                      <div>Start Game</div>
                      <img src="./assets/img/Penguin/Character09/Penguin.png" alt="" class="penguin">
                  </div>
                  <div onclick="showContent('howToPlay')" class="info-box">
                      <div>How to play</div>
                      <img src="./assets/img/question-mark.png" alt="" class="question-mark">
                  </div>
              </div>
              <div class="imprint-wrapper">
                  <p onclick="showContent('imprint')" id="imprint" class="imprint">
                      Imprint
                  </p>
              </div>
          </div>
      `;
}

/**
 * Returns the HTML string for the "About Game" section,
 * including a game description and keyboard controls.
 *
 * @returns {string} HTML markup for the about-game screen.
 */
function generateAboutGameHtml() {
    return /*html*/ `
              <div class="game-rules-wrapper">
                <div id="aboutGame" class="about-game">
                <div class="keyboard-instructions" >
                    <table>
                      <thead>
                          <tr>
                              <th colspan="2">How to use the keyboard</th>
                          </tr>
                      </thead>
                        <tr>
                            <td>Left</td>
                            <td>Move left</td>
                        </tr>
                        <tr>
                            <td>Right</td>
                            <td>Move right</td>
                        </tr>
                        <tr>
                            <td>Space</td>
                            <td>Jump</td>
                        </tr>
                        <tr>
                            <td>D</td>
                            <td>Throw</td>
                        </tr>
                    </table>
                </div>
                <p>
                          Pit Penguin is a friendly guy and he likes to walk with you through antarctic landscape.
                          He likes to collect fish coins on the go. 
                      </p>
                      <p>
                          But be warned, he is not alone and the rabbits want to hurt him. You can prevent this by jumping on the rabbits or throwing the small poison bottles you can
                          collect at them.
                      </p>
                      <p>
                          At the end of his journey Pit will face a cruel and aggressive troll.
                          You can defeat him if you throw at least four poison bottles at him.
                      </p>
                      <p>
                          Good luck and have fun with Pit Penguin!
                      </p>
              </div>
            `;
}

/**
 * Returns the HTML string for the imprint section,
 * including address and copyright.
 *
 * @returns {string} HTML markup for the imprint screen.
 */
function generateImprintHtml() {
    return /*html*/ `
              <div class="imprint-wrapper">
                <div id="imprintInformation" class="imprint-information">
                    <address>
                    Nicole Gerlach<br>
                    Niederhäslicher Str. 15<br>
                    01705 Freital
                    </address>
                    <p>
                        Images provided by CraftPix and Pixabay.
                    </p>
                    <p>
                      &copy; 2025 Nicole Gerlach
                    </p>
                </div>
              </div>
            `;
}

/**
 * Returns the HTML string for the win screen,
 * showing a message, coin count, and replay option.
 *
 * @returns {string} HTML markup for the win screen.
 */
function generateWinScreenHtml() {
    return /*html*/ `
            <div id="winContainer" class="win-container">
                <div class="win">You win, great!</div>
                <canvas id="confettiCanvas" class="confetti-canvas"></canvas>
                <div class="win-box">
                    <div class="coin-box">
                        <p>You collected</p>
                        <img src="./assets/img/Coins/1.png">
                        <div>${world.collectedCoins} of 10 coins</div>
                    </div>
                    <div onclick="playAgain()" class="play-again">Play again
                        <img src="./assets/img/reload.png">
                    </div>
                    <div onclick=" backToMenu()" class="back-to-menu">
                        <img src="assets/img/Penguin/Character09/Penguin.png">
                        Back To Menu
                    </div>
                </div>
            </div>
        `;
}

/**
 * Returns the HTML string for the lose screen,
 * showing a message, coin count, and retry option.
 *
 * @returns {string} HTML markup for the lose screen.
 */
function generateLoseSrceenHtml() {
    return /*html*/ `
            <div id="loseContainer" class="lose-container">
                <div class="lose">Sorry, you lose</div>
                <div class="lose-box">
                <div class="coin-box">
                        <p>You collected</p>
                        <img src="./assets/img/Coins/1.png">
                        <div>${world.collectedCoins} of 10 coins</div>
                    </div>
                    <div onclick="playAgain()" class="play-again">
                        <p>Try again</p>
                        <img src="./assets/img/reload.png">
                    </div>
                    <div onclick=" backToMenu()" class="back-to-menu">
                        <img src="assets/img/Penguin/Character09/Penguin.png">
                        Back To Menu
                    </div>
                </div>
            </div>
        `;
}