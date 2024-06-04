/*
* APLICACIÓ
*/

var myCanvas;
var ctx;
var nivell;
var joc;
var gameOverShown = false;

$(document).ready(function() {
    myCanvas = document.getElementById("joc");
    ctx = myCanvas.getContext("2d");
    displayHighscores();
    menu_music.play();
});

function drawGame() {
    joc.clearCanvas();
    joc.pala.draw(ctx);
    joc.bola.draw(ctx);
    joc.mur.draw(ctx);
}

var isPaused = false;

function countdown(callback) {
    isPaused = true;
    let counter = 3;
    let countdownInterval = setInterval(() => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        drawGame();
        ctx.font = "32px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 2;
        countdown_sound.play();

        ctx.fillText(counter > 0 ? counter : "GO!", myCanvas.width / 2, myCanvas.height / 2);

        if (counter === 0) {
            clearInterval(countdownInterval);
            setTimeout(() => {
                isPaused = false;
                if (callback) callback();
            }, 1000);
        }
        counter--;
    }, 1000);
}


function restartCountdown() {
    countdown();
}

function animacio() {
    if (!isPaused) {
        if (joc.vides > 0) {
            joc.update();
            drawGame();
            requestAnimationFrame(animacio);
        } 
    } else {
        requestAnimationFrame(animacio);
    }
}

function popupPerdre() {
    /* if (gameOverShown) return;
    gameOverShown = true; */
    joc.stopTimer();
    gameOver.play();
    var overlay = $('<div class="overlay"></div>');
    var popup = $('<div class="popup"></div>');
    popup.html(`
        <div class="popup-content">
            <h2>Game Over!</h2>
            <p>Enter your name:</p>
            <input type="text" id="playerName" />
            <p id="errorMessage" class="error-message">You must introduce a name</p>
            <button id="closePopup">Return to menu</button>
        </div>
    `);
    clickPopup(overlay, popup);
}

function popupVictoria() {
    joc.stopTimer();
    victory.play();
    var overlay = $('<div class="overlay"></div>');
    var popup = $('<div class="popup"></div>');
    popup.html(`
        <div class="popup-content">
            <h2>Victory!</h2>
            <p>Enter your name:</p>
            <input type="text" id="playerName" />
            <p id="errorMessage" class="error-message">You must introduce a name</p>
            <button id="closePopup">Return to menu</button>
        </div>
    `);
    clickPopup(overlay, popup);
}

function clickPopup(overlay, popup) {

    $('body').append(overlay).append(popup);
    $('#closePopup').on('click', function() {
        let playerName = $('#playerName').val();
        if (playerName) {
            updateHighscores(playerName, Math.round(joc.puntuacio * joc.multi));
            displayHighscores();
            overlay.remove();
            popup.remove();
            setTimeout(() => {
                location.reload();
            }, 100);
        } else {
            $('#errorMessage').show();
        }
    });
}

function startGame() {
    if (checkButtons()) {
        menu_music.pause();
        $('#menu').hide();
        $('#principal').show();
        joc = new Joc(myCanvas, ctx, nivell);
        backgroundSelector(nivell);
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

function backgroundSelector(nivell) {
    switch(nivell) {
        case 0:
            $("body").css({
                "background": "url('images/fons1.jpg') no-repeat center center fixed",
                "background-size": "cover",
            });
            break;
        case 1:
            $("body").css({
                "background": "url('images/fons2.jpg') no-repeat center center fixed",
                "background-size": "cover",
            });
            break;
        case 2:
            $("body").css({
                "background": "url('images/fons3.jpg') no-repeat center center fixed",
                "background-size": "cover",
            });
            break;
        case 3:
            $("body").css({
                "background": "url('images/fons4.jpg') no-repeat center center fixed",
                "background-size": "cover",
            });
            break;
    }
}

    var music = new Audio('so/pokerMusic.mp3');
    var countdown_sound = new Audio('so/countdown.mp3');
    var gameOver = new Audio('so/gameover.wav');
    var victory = new Audio('so/victory.wav');
    var menu_music = new Audio('so/mainMenu.mp3');
    countdown_sound.volume = 0.2;
    gameOver.volume = 0.4;
    victory.volume = 0.4;
    menu_music.volume = 0.25;

    function muteMusic() {
        menu_music.muted = !menu_music.muted;    
        var muteButton = document.getElementById('muteButton');
        if (menu_music.muted) {
            muteButton.classList.add('muted');
        } else {
            muteButton.classList.remove('muted');
        }
    }