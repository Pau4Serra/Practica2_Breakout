/*
* APLICACIÓ
*/

var myCanvas;
var ctx;
var nivell;
var gameOverShown = false;

$(document).ready(function() {
    myCanvas = document.getElementById("joc");
    ctx = myCanvas.getContext("2d");
});

function beginGame() {
    let backgrounds = ["images/fons1.jpg", "images/fons2.jpg", "images/fons3.jpg"];
    let randomBackground = backgrounds[Math.floor(Math.random() * 3)];
    
    $("body").css({
        "background": "url('" + randomBackground + "') no-repeat center center fixed",
        "background-size": "cover",

    });
}

function drawGame() {
    joc.clearCanvas();  // Clear the canvas
    joc.pala.draw(ctx);  // Redraw the paddle
    joc.bola.draw(ctx);  // Redraw the ball
    joc.mur.draw(ctx);   // Redraw the bricks
}

var isPaused = false;

function countdown(callback) {
    isPaused = true;  // Pause the game during countdown
    let counter = 3;
    let countdownInterval = setInterval(() => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);  // Clear only the countdown area
        drawGame();
        ctx.font = "32px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 2;

        ctx.fillText(counter > 0 ? counter : "GO!", myCanvas.width / 2, myCanvas.height / 2);

        if (counter === 0) {
            clearInterval(countdownInterval);
            setTimeout(() => {
                isPaused = false;  // Resume the game
                if (callback) callback();
            }, 1000);  // Wait one second before resuming the game
        }
        counter--;
    }, 1000);  // Update every second
}


function restartCountdown() {
    countdown(() => {
        animacio();  // Resume animation after countdown
    });
}

function showHPDecrement() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.textAlign = "center";
    ctx.fillText("-1HP", myCanvas.width / 2, myCanvas.height / 2);

    setTimeout(() => {
        countdown(() => {
        });
    }, 1000);  // Mostrar "- 1HP" por 1 segundo antes de iniciar el countdown
}

function animacio() {
    if (!isPaused) {
        if (joc.vides > 0) {
            joc.update();
            drawGame();  // Move drawGame here
            requestAnimationFrame(animacio);
        } else {
            popupPerdre();
        }
    } else {
        requestAnimationFrame(animacio);
    }
}


function popupPerdre() {
    if (gameOverShown) return;  // Si el popup ya se mostró, no hacer nada
    gameOverShown = true;  // Marcar como mostrado

    $('.carta').off("click"); 
    var overlay = $('<div class="overlay"></div>');
    var popup = $('<div class="popup"></div>');
    popup.html(`
        <div class="popup-content">
            <h2>¡Game Over!</h2>
            <p>Introduce tu nombre:</p>
            <input type="text" id="playerName" />
            <p id="errorMessage" class="error-message">Debes introducir tu nombre</p>
            <button id="closePopup">Guardar y tornar</button>
        </div>
    `);

    $('body').append(overlay).append(popup);

    $('#closePopup').on('click', function() {
        let playerName = $('#playerName').val();
        if (playerName) {
            updateHighscores(playerName, joc.elapsedTime);
            displayHighscores();
            overlay.remove();
            popup.remove();
            setTimeout(() => {
                location.reload();
            }, 100);  // Asegurar que se elimine el overlay y el popup antes de recargar
        } else {
            $('#errorMessage').show();
        }
    });
}

function popupVictoria() {
    var popup = $('<div class="popup"></div>');
    popup.html(`
        <div class="popup-content">
            <h2>¡Victoria!</h2>
            <p>¡Has ganado!</p>
            <button id="closePopup">Cerrar</button>
        </div>
    `);

    $('body').append(popup);

    // Manejar el cierre del popup
    $('#closePopup').on('click', function() {
        location.reload(); // Recargar la página al cerrar el popup
    });
}

// Mueve esta línea para que se llame solo en `popupPerdre`
window.startGame = startGame;

joc.onBolaCaida = showHPDecrement;

window.startGame = startGame;


// Highscore functions
function updateHighscores(name, score) {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ name: name, score: score });
    highscores.sort((a, b) => a.score - b.score); // Ordenar por score
    if (highscores.length > 10) highscores.pop(); // Mantener solo los 10 mejores
    localStorage.setItem('highscores', JSON.stringify(highscores));
}

function displayHighscores() {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    let highscoreTable = '<h2>Highscores</h2><ul style="list-style-type: none; padding: 0; text-align: left;">';
    highscores.forEach(highscore => {
        highscoreTable += `<li>${highscore.name}: ${highscore.score} seconds</li>`;
    });
    highscoreTable += '</ul>';
    $('#highscore').html(highscoreTable);
}  

// Mostrar highscores al cargar la página
displayHighscores();

function startGame() {
    if (checkButtons()) {
        $('#menu').hide();
        $('#principal').show();
        beginGame();
        joc = new Joc(myCanvas, ctx, nivell);
        joc.inicialitza();
        animacio();
    }
}


function difficulty (difficulty, event) {
    var buttonDifficulty = document.querySelectorAll(".selected");    
    buttonDifficulty.forEach(btn => btn.classList.remove("selected"));
    event.target.classList.add("selected");
    //console.log(difficulty);
    nivell = difficulty;
}

function checkButtons() {
    var menu = document.getElementById("menu");

    var difficultySelected = document.querySelector(".selected");
    //console.log(difficultySelected)

    if (difficultySelected) {
        menu.style.display = "block";
        return true;
        
    } else {
        $('#error_difficulty').css('display', 'block');
        //console.log("No entra");
    } 
}

// Function to read high scores from local storage
function readHighScores() {
    const highScoresJSON = localStorage.getItem('highScores');
    return highScoresJSON ? JSON.parse(highScoresJSON) : [];
}

// Function to write high scores to local storage
function writeHighScores(scores) {
    localStorage.setItem('highScores', JSON.stringify(scores));
}

// Function to update high scores
function updateHighScores(newScore) {
    let scores = readHighScores();
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score); // Sort scores in descending order
    scores = scores.slice(0, 5); // Keep only the top 5 scores
    writeHighScores(scores);
}

// Example usage:
// Update high scores with a new score
updateHighScores({ name: 'Player1', score: 100 });

// Read high scores and display them
const highScores = readHighScores();
//console.log('High Scores:');
highScores.forEach((score, index) => {
    //console.log(`${index + 1}. ${score.name}: ${score.score}`);
});




var music;

function musicSelector () {
    music = new Audio('so/pokerMusic.mp3');
}

function playMusic() {
    music.play();
}