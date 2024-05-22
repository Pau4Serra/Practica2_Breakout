/*
* APLICACIÓ
*/

var myCanvas;
var ctx;
var nivell;

$(document).ready(function() {
    myCanvas = document.getElementById("joc");
    ctx = myCanvas.getContext("2d");
});

function beginGame() {
    let backgrounds = ["../images/fons1.jpg", "../images/fons2.jpg", "../images/fons3.jpg"];
    let randomBackground = backgrounds[Math.floor(Math.random() * 3)];
    
    $("body").css({
        "background": "url('" + randomBackground + "') no-repeat center center fixed",
        "background-size": "cover",

    });
    
    //console.log("New background:", randomBackground);

    //countdown(); // Call countdown after changing the background
}

function countdown(callback) {
    let counter = 3;
    let countdownInterval = setInterval(() => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
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
                if (callback) callback();
            }, 1000);  // Esperar un segundo antes de iniciar el juego
        }
        counter--;
    }, 1000);  // Actualiza cada segundo
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

function restartCountdown() {
    countdown();  // Reiniciar la cuenta regresiva
}

 function animacio() {
    if (joc.vides > 0) {
        joc.update();
        requestAnimationFrame(animacio);
    } else {
        let playerName = prompt("Game Over! Enter your name:");
        if (playerName) {
            updateHighscores(playerName, joc.elapsedTime);
        }
        displayHighscores();
    }
} 

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
    let highscoreTable = '<h2>Highscores</h2><ul>';
    highscores.forEach(highscore => {
        highscoreTable += `<li>${highscore.name}: ${highscore.score} seconds</li>`;
    });
    highscoreTable += '</ul>';
    $('#highscore').html(highscoreTable);
}  

// Mostrar highscores al cargar la página
displayHighscores();



function startGame() {
    if(checkButtons()) {
        //("entra a startGame()");
        var level = nivell;
        $('#menu').hide();
        $('#principal').show();
        beginGame();
        countdown(() => {
            joc = new Joc(myCanvas, ctx, level);
            joc.inicialitza();
            animacio();
        });        
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



