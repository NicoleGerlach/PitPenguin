function generateInfoBoxHtml() {
    return /*html*/ `
          <div id="directionsContainer" class="directions-container">
              <div class="directions-box">
                  <div onclick="showContent('startGame')" class="info-box">
                      <div>Start Game</div>
                      <img src="img/Penguin/Character09/Penguin.png" alt="" class="penguin">
                  </div>
                  <div onclick="showContent('howToPlay')" class="info-box">
                      <div>How to play</div>
                      <img src="img/question-mark01.png" alt="" class="question-mark">
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
  
  function generateAboutGameHtml() {
    return /*html*/ `
          <div id="aboutGame" class="about-game">
              <div>
              Pit Penguin is a friendly guy and he likes to walk with you through the winter landscape.<br>
              He likes to collect fish coins on the go.<br>
              But be warned, he is not alone and the rabbits want to hurt him.<br>
              You can prevent this by jumping on the rabbits or using the small poison bottles you can
              collect.<br>
              After the rabbits there will be a big troll.<br>
              You can defeat him if you throw enough poison bottles at him.<br><br>
              Good luck and have fun with Pit Penguin!
          </div>
          <div class="keyboard-instructions" >
              <h4>
                  How to use the keyboard
              </h4>
              <table>
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
      `;
  }
  
  function generateImprintHtml() {
    return /*html*/ `
          <div id="imprintInformation" class="imprint-information">
              &copy; Nicole Gerlach 2024<br><br>
              Nicole Gerlach<br>
              Niederhäslicher Str. 15<br>
              01705 Freital<br><br>
              Images provided by CraftPix and Pixabay.
          </div>
      `;
  }
  
  function generateWinScreenHtml() {
    return /*html*/ `
          <div id="winContainer" class="win-container">
              <div class="win">You win, great!</div>
              <div class="win-box">
                  <div class="coin-box">
                      <img src="img/Coins/1.png">
                      You collected <br> ${world.collectedCoins} of 13 coins
                  </div>
                  <div onclick="playAgain()" class="play-again">Play again
                      <img src="img/reload.png">
                  </div>
              </div>
          </div>
      `;
  }
  
  function generateLoseSrceenHtml() {
    return /*html*/ `
          <div id="loseContainer" class="lose-container">
              <div class="lose">Sorry, you lose</div>
              <div class="lose-box">
                  <div onclick="playAgain()" class="play-again">Try again
                      <img src="img/reload.png">
                  </div>
                  <div class="coin-box">
                      <img src="img/Coins/1.png">
                      You collected <br> ${world.collectedCoins} of 13 coins
                  </div>
              </div>
          </div>
      `;
  }