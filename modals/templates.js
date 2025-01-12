function generateInfoBoxHtml() {
    return /*html*/`
        <div id="directionsContainer" class="directions-container">
            <div class="directions-box">
                <div onclick="startGame()" class="info-box">
                    <div>Start Game</div>
                    <img src="img/Penguin/Character09/Penguin.png" alt="">
                </div>
                <div onclick="showAboutGame()" class="info-box">
                    <div>How to play</div>
                    <img src="img/question-mark01.png" alt="">
                </div>
            </div>
            <div onclick="showImpressum()" id="impressum" class="impressum">
                Impressum
            </div>
        </div>
    `
}

function generateAboutGameHtml() {
    return /*html*/`
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
        <div>
            <h3>How to play</h3>
            <table>
                <th>How to use the keyboard</th>
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
    `
}

function generateImpressumHtml() {
    return /*html*/`
        <div id="impressumInformation" class="impressum-information">
            &copy; Nicole Gerlach 2024<br><br>
            Nicole Gerlach<br>
            Niederhäslicher Str. 15<br>
            01705 Freital<br><br>
            Images provided by CraftPix and Pixabay.
        </div>
    `
}